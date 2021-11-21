import React, {useEffect, useState} from "react";
import Switch from 'react-switch'
import { useToggle } from '../../../../hooks/useToggle.js';
import {PreviewModeToolTip} from '../../../../utils/PreviewModeToolTip'
import { Button, 
     Modal, ModalBody, ModalFooter, ModalHeader, Row, Col, Container } from "reactstrap";
import '../../../../static/styles/DeleteTripSection.css'

export function TripSettingsModal(props) {
    const handleAutoTour = ()=>{
        props.toggleAutomaticallyRunTour()
        if(!props.disablePreviewMode){
            props.toggleDisablePreviewMode();
        }
    }
    return (
        <Modal isOpen={props.tripSettingsOpen} toggle={props.toggleTripSettingsOpen}>
            <ModalHeader toggle={props.toggleTripSettingsOpen}>Trip Settings</ModalHeader>
            <Container>
                <Row>
                     <Col><Switch onChange={handleAutoTour} checked={props.automaticallyRunTour}/></Col>
                     <Col>Automatically Shorten Trip</Col>
                </Row>
                <Row>
                    <Col><Switch disabled={props.automaticallyRunTour}  onChange={props.toggleDisablePreviewMode} checked={props.disablePreviewMode}/></Col>
                    <Col>Disable Preview Mode <PreviewModeToolTip id='settings'/> </Col>
                </Row>
                <Row className='dangerZone'>Danger Zone</Row>
                <Row>
                    <div className='deleteTripContainer'>
                    <Row>
                        <Col>{`Will Delete Trip : "${props.tripName}"`}</Col>
                        <Col><Button onClick={()=>{props.placeActions.removeAll();props.toggleTripSettingsOpen()}} style={{color:'red',fontWeight:'500'}}>Delete Trip</Button></Col>
                    </Row>
                    </div>
                </Row>
            </Container>
            <ModalFooter>
                <Button color="primary" onClick={props.toggleTripSettingsOpen} data-testid="SaveSettings">Save</Button>
            </ModalFooter>
        </Modal>
    )
}

export default TripSettingsModal