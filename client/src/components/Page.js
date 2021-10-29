import React, { useEffect, useState } from 'react';
import { Collapse } from 'reactstrap';
import Header from './Margins/Header';
import Footer from './Margins/Footer';
import About from './About/About';
import Planner from './Trip/Planner';
import { useToggle } from '../hooks/useToggle';
import { LOG } from '../utils/constants';
import { getOriginalServerUrl, sendAPIRequest } from '../utils/restfulAPI';
import OptizedTrip from './Trip/OptimizedTrip/OptimizedTrip';


export default function Page(props) {
	const [showAbout, toggleAbout] = useToggle(false);
	const [previewTripFocus,togglePreviewTripFocus] = useToggle(false);
	const [serverSettings, processServerConfigSuccess] = useServerSettings(props.showMessage);

	return (
		<>
			<Header showMessage={props.showMessage} toggleAbout={toggleAbout} />
			<div className="body">
				<Collapse isOpen={showAbout}>
					<About closePage={toggleAbout} />
				</Collapse>
				<Collapse isOpen={!showAbout} data-testid="planner-collapse">
					<OptizedTrip previewTripFocus={previewTripFocus} togglePreviewTripFocus={togglePreviewTripFocus}/>
					<Planner showMessage={props.showMessage} serverSettings={serverSettings} previewTripFocus={previewTripFocus} togglePreviewTripFocus={togglePreviewTripFocus}/>
				</Collapse>
			</div>
			<Footer
				showMessage={props.showMessage}
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

	async function sendConfigRequest() {
		const configResponse = await sendAPIRequest({ requestType: "config" }, serverUrl);
		if (configResponse) {
			processServerConfigSuccess(configResponse, serverUrl);
		} else {
			setServerConfig(null);
			showMessage(`Config request to ${serverUrl} failed. Check the log for more details.`, "error");
		}
	}

	return [{ serverUrl: serverUrl, serverConfig: serverConfig }, processServerConfigSuccess];
}
