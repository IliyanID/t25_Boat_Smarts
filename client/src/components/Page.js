import React, { useEffect, useState } from 'react';
import { Collapse } from 'reactstrap';
import Header from './Margins/Header';
import Footer from './Margins/Footer';
import About from './About/About';
import Planner from './Trip/Planner';
import { useToggle } from '../hooks/useToggle';
import { LOG } from '../utils/constants';
import { getOriginalServerUrl, sendAPIRequest } from '../utils/restfulAPI';


export default function Page(props) {
	const [showAbout, toggleAbout] = useToggle(false);
	const [serverSettings, processServerConfigSuccess] = useServerSettings(props.showMessage);
	const [hideMargins,setMargins] = useState(true)

	useEffect(()=>{
		let lastY = -1
		document.addEventListener('scroll',(e)=>{
			if(window.scrollY < 100 || window.scrollY < lastY){
				setMargins(true)
			}
			else
				setMargins(false)
			lastY = window.scrollY;
		})
	},[])

	return (
		<>
			{(hideMargins)?<Header showMessage={props.showMessage} toggleAbout={toggleAbout} />:<></>}
			<div className="body">
				<Collapse isOpen={showAbout}>
					<About closePage={toggleAbout} />
				</Collapse>
				<Collapse isOpen={!showAbout} data-testid="planner-collapse">
					<Planner showMessage={props.showMessage} serverSettings={serverSettings} {...props}/>
				</Collapse>
			</div>
			{(hideMargins)?<Footer
				showMessage={props.showMessage}
				serverSettings={serverSettings}
				processServerConfigSuccess={processServerConfigSuccess}
			/>:<></>}
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
