import React, { useEffect, useState } from 'react';
import { Collapse } from 'reactstrap';
import Header from './Margins/Header';
import Footer from './Margins/Footer';
import About from './About/About';
import Planner from './Trip/Planner';
import { useToggle } from '../hooks/useToggle';
import { LOG } from '../utils/constants';
import { getOriginalServerUrl, sendAPIRequest, SCHEMAS } from '../utils/restfulAPI';

export let missingFeatures = []
export default function Page(props) {
	const [showAbout, toggleAbout] = useToggle(false);
	const [serverSettings, processServerConfigSuccess] = useServerSettings(props.showMessage);

	return (
		<>
			<Header toggleAbout={toggleAbout} />
			<div className="body">
				<Collapse isOpen={showAbout}>
					<About closePage={toggleAbout} />
				</Collapse>
				<Collapse isOpen={!showAbout} data-testid="planner-collapse">
					<Planner showMessage={props.showMessage} />
				</Collapse>
			</div>
			<Footer
				serverSettings={serverSettings}
				processServerConfigSuccess={processServerConfigSuccess}
			/>
		</>
	)
}

function useServerSettings(showMessage) {
	const [serverUrl, setServerUrl] = useState(getOriginalServerUrl());
	const [serverConfig, setServerConfig] = useState(null);

	useEffect(() => {
		sendConfigRequest();
	}, []);

	function processServerConfigSuccess(config, url) {
		LOG.info("Switching to Server:", url);
		setServerConfig(config);
		setServerUrl(url);
	}

	function missingFeaturesExists(configResponse){
		let existingClientFeatures = {...SCHEMAS}

		//Uncomment Below to cause missing feature error
		existingClientFeatures['where'] = 'S'

		for(let feature in existingClientFeatures){
			if(!configResponse.features.includes(feature))
				missingFeatures.push(feature)
		}

		return missingFeatures.length > 0
	}

	async function sendConfigRequest() {
		const configResponse = await sendAPIRequest({ requestType: "config" }, serverUrl);
		if (configResponse) {

			if(missingFeaturesExists(configResponse)){
				showMessage('Server is missing features [' + missingFeatures.map((feature)=>{return feature}) + ']. Check the log for more details.','warning')
			}
			processServerConfigSuccess(configResponse, serverUrl);
		} else {
			setServerConfig(null);
			showMessage(`Config request to ${serverUrl} failed. Check the log for more details.`, "error");
		}
	}

	return [{ serverUrl: serverUrl, serverConfig: serverConfig }, processServerConfigSuccess];
}
