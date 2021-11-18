import React, { useEffect, useState, useRef } from 'react';
import { Collapse } from 'reactstrap';
import Header from './Margins/Header';
import Footer from './Margins/Footer';
import About from './About/About';
import Planner from './Trip/Planner';
import { useToggle } from '../hooks/useToggle';
import { LOG } from '../utils/constants';
import { getOriginalServerUrl, sendAPIRequest } from '../utils/restfulAPI';

	const moveHeadersFunc = (header,footer)=>{
			if(window.scrollY < 90){
				header.current.style.transform = `translateY(-${window.scrollY}%)`

				let footerDis = window.scrollY - 10;
				if(footerDis < 0)
					footerDis = 0
				footer.current.style.transform = `translateY(${footerDis}%)`

	
			}
			else{
				header.current.style.transform = `translateY(-${90}%)`
				footer.current.style.transform = `translateY(${80}%)`
			}
		}
export default function Page(props) {
	const [showAbout, toggleAbout] = useToggle(false);
	const [serverSettings, processServerConfigSuccess] = useServerSettings(props.showMessage);

	const header = useRef(); const footer = useRef()

	useEffect(()=>{
		document.addEventListener('scroll',()=>moveHeadersFunc(header,footer))
	},[])

	return (
		<>
			<Header header={header} showMessage={props.showMessage} toggleAbout={toggleAbout} />
			<div className="body">
				<Collapse isOpen={showAbout}>
					<About closePage={toggleAbout} />
				</Collapse>
				<Collapse isOpen={!showAbout} data-testid="planner-collapse">
					<Planner showMessage={props.showMessage} serverSettings={serverSettings} {...props}/>
				</Collapse>
			</div>
			<Footer
				footer={footer}
				
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
