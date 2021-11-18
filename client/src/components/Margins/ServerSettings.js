import React, {useEffect} from 'react';
import { Button, Col, Container, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row, ListGroup, ListGroupItem, Tooltip } from 'reactstrap';
import {useMultiToggle} from '../../hooks/useToggle'
import { useServerInputValidation } from '../../hooks/useServerInputValidation';
import { SCHEMAS } from '../../utils/restfulAPI';
import { LOG } from '../../utils/constants';
import featureDescriptions from '../../static/descriptions/serverFeatures.json'
import { AiFillInfoCircle } from 'react-icons/ai';

export function missingFeatures(config,serverSettings){
    let missingFeatures= [];

    //Uncomment Below to cause missing feature error
    //existingClientFeatures['where'] = 'S'

    if(config && config.features){
        missingFeatures = [];
        Object.keys(SCHEMAS).forEach(feature => {
            if(!config.features.includes(feature))
                missingFeatures.push(feature)
        });
    }

    else if(serverSettings && serverSettings.serverConfig && serverSettings.serverConfig.features){
        missingFeatures = []
        Object.keys(SCHEMAS).forEach(feature => {
            if(!serverSettings.serverConfig.features.includes(feature))
               missingFeatures.push(feature)
        });
    }

    return missingFeatures;
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
                missingFeatures={missingFeatures(config,props.serverSettings)}
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
    return [];
}

function getCurrentFeatures(config, serverSettings){
    if(config && config.features)
        return config.features;

    else if(serverSettings.serverConfig && serverSettings.serverConfig.features)
        return serverSettings.serverConfig.features;
    
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

function generateCurrentFeaturesCard(features,type,tooltips,toggleToolTips){
    if(features && Array.isArray(features)){
    return  <ListGroup>
                {features.map((feature,index)=>{
                    let id = `feature-int-serversettings-${index}-${type}`
                    return  <ListGroupItem color={type}>
                                <AiFillInfoCircle style={{marginRight:'15px'}} id={id}/>
                                <Tooltip placement='right' target={id} isOpen={tooltips[index]} toggle={()=>toggleToolTips(index)}>
                                    {featureDescriptions[feature.trim()]}
                                </Tooltip >
                                {feature.charAt(0).toUpperCase() + feature.slice(1)}
                                
                            </ListGroupItem>
                })}
            </ListGroup>
    }
    else
                return <div></div>
}

function Body(props) {
    const[tooltipsCurFeature,toggleToolTipsCurFeature] = useMultiToggle(false,props.features.length)
    const[tooltipsMissingFeature,toggleToolTipsMissingFeature] = useMultiToggle(false,props.missingFeatures.length)
    const urlInput =
        <Input
            value={props.serverInput}
            placeholder={props.serverSettings.serverUrl}
            onChange={(e) => { props.setServerInput(e.target.value); }}
            valid={props.validServer}
            invalid={!props.validServer}
        />;

    useEffect(() => {
        warnMissingFeatures(props.missingFeatures, props.showMessage, props.validServer);
    }, [props.missingFeatures]);



    return (
        <ModalBody>
            <Container>
                <SettingsRow label="Name" value={props.serverName} />
                <SettingsRow label="URL" value={urlInput} />
                <SettingsRow label="Features" value={generateCurrentFeaturesCard(props.features,'info',tooltipsCurFeature,toggleToolTipsCurFeature)} />
                {(props.missingFeatures.length>0) && <SettingsRow label="Missing Features" value={generateCurrentFeaturesCard(props.missingFeatures,'warning',tooltipsMissingFeature,toggleToolTipsMissingFeature)}/>}
            </Container>
        </ModalBody>
    );
}

function warnMissingFeatures(missingFeatures, showMessage, validServer) {
    if(missingFeatures.length > 0 && validServer){
        let message = 'Server is missing features' + missingFeatures.map((feature)=>{return ' ' + feature}) + '. Check the log for more details.';
        showMessage(message,"warning");
    }
}

function SettingsRow({label, value}) {
    return (
        <Row className="my-2 vertical-center">
            <Col xs={2}>
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