import React from 'react';
import { Button, Col, Container, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import { useServerInputValidation } from '../../hooks/useServerInputValidation';
import { SCHEMAS } from '../../utils/restfulAPI';
import { LOG } from '../../utils/constants';

export let missingFeatures = []
export function missingFeaturesExists(config,serverSettings){
    missingFeatures= [];
    let existingClientFeatures = {...SCHEMAS}

    //Uncomment Below to cause missing feature error
    //existingClientFeatures['where'] = 'S'

    if(config && config.features)
        for(let feature in existingClientFeatures){
            if(!config.features.includes(feature))
                missingFeatures.push(feature)
        }
    
    else if(serverSettings && serverSettings.features)
        for(let feature in existingClientFeatures){
            if(!serverSettings.features.includes(feature))
                missingFeatures.push(feature)
        }

    return missingFeatures.length > 0;
}

export default function ServerSettings(props) {
    const [serverInput, setServerInput, config, validServer, resetModal]
        = useServerInputValidation(props.serverSettings.serverUrl, props.toggleOpen);

    return (
        <Modal isOpen={props.isOpen} toggle={props.toggleOpen}>
            <Header toggleOpen={props.toggleOpen} />
            <Body
                serverInput={serverInput}
                setServerInput={setServerInput}
                serverSettings={props.serverSettings}
                serverName={getCurrentServerName(config, props.serverSettings)}
                validServer={validServer}
                features={getCurrentFeatures(config,props.serverSettings)}
                missingFeatures={missingFeaturesExists(config,props.serverSettings)}
                showMessage={props.showMessage}
            />
            <Footer
                config={config}
                serverInput={serverInput}
                validServer={validServer}
                resetModal={resetModal}
                processServerConfigSuccess={props.processServerConfigSuccess}
            />
        </Modal>
    );
}

function getCurrentServerName(config, serverSettings) {
    if (config) {
        return config.serverName;
    }
    else if (serverSettings.serverConfig) {
        return serverSettings.serverConfig.serverName;
    }
    return "";
}

function getCurrentFeatures(config, serverSettings){
    if(config && config.features)
        return "[" + config.features.map((item)=>{return item}) + "]";
    
    else if(serverSettings && serverSettings.features)
        return "[" + serverSettings.features.map((item)=>{return item}) + "]";
    
    else
        return "None"
}

function Header(props) {
    return (
        <ModalHeader className="ml-2" toggle={props.toggleOpen}>
            Server Connection
        </ModalHeader>
    );
}

function Body(props) {
    const urlInput =
        <Input
            value={props.serverInput}
            placeholder={props.serverSettings.serverUrl}
            onChange={(e) => { props.setServerInput(e.target.value) }}
            valid={props.validServer}
            invalid={!props.validServer}
        />;
    if(props.missingFeatures){
        const existMissingFeatures = missingFeatures.length > 0;
        if(existMissingFeatures){
            let message = 'Server is missing features [' + missingFeatures.map((feature)=>{return feature}) + ']. Check the log for more details.';
            try{
                props.showMessage(message,"warning")
            }
            catch{
                LOG.error("Failed to show warning message")
            }
        }
    }

    return (
        <ModalBody>
            <Container>
                <SettingsRow label="Name" value={props.serverName} />
                <SettingsRow label="URL" value={urlInput} />
                <SettingsRow label="Features" value={props.features} />
                {(props.missingFeatures) && <SettingsRow label="Missing Features" value={'[' + missingFeatures.map((feature)=>{return feature}) + ']'}/>}
            </Container>
        </ModalBody>
    );
}

function SettingsRow({label, value}) {
    return (
        <Row className="my-2 vertical-center">
            <Col xs={4}>
                {label}:
            </Col>
            <Col xs={8}>
                {value}
            </Col>
        </Row>
    );
}

function Footer(props) {
    return (
        <ModalFooter>
            <Button color="secondary" onClick={props.resetModal}>Cancel</Button>
            <Button color="primary" onClick={() => {
                props.processServerConfigSuccess(props.config, props.serverInput);
                props.resetModal(props.serverInput);
            }}
                disabled={!props.validServer}
            >
                Save
            </Button>
        </ModalFooter>
    );
}
