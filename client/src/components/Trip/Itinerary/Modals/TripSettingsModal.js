import React, {useEffect, useState} from "react";
import Switch from 'react-switch'
import { useToggle } from '../../../../hooks/useToggle.js';
import {PreviewModeToolTip} from '../../../../utils/PreviewModeToolTip'
import { Button, 
     Modal, ModalBody, ModalFooter, ModalHeader, Row, Col, Container, TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import '../../../../static/styles/DeleteTripSection.css'
import classnames from 'classnames'




export function TripSettingsModal(props) {
    const [currentTab, setCurrentTab] = usestate('1');

    const tabToggle = (tab) =>{
        if (currentTab !== tab) setCurrentTab(tab)
    }

    const handleAutoTour = ()=>{
        props.toggleAutomaticallyRunTour()
        if(!props.disablePreviewMode){
            props.toggleDisablePreviewMode();
        }
    }
    return (
        <Modal isOpen={props.tripSettingsOpen} toggle={props.toggleTripSettingsOpen}>
            <ModalHeader toggle={props.toggleTripSettingsOpen}>Trip Settings</ModalHeader>
            <Nav tabs>
                <NavItem> 
                    <NavLink
                        className={classnames({
                            active: currentTab === '1'
                        })}
                        onClick={() => {tabToggle('1');}}>
                            Units
                    </NavLink>
                </NavItem>
                <NavItem> 
                    <NavLink
                        className={classnames({
                            active: currentTab === '2'
                        })}
                        onClick={() => {tabToggle('2');}}>
                            Optization
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={currentTab}>
                <TabPane tabId="1">
                    
                </TabPane>
                <TabPane tabId="2">
                    <Container>
                        <Row>
                            <Col><Switch onChange={handleAutoTour} checked={props.automaticallyRunTour}/></Col>
                            <Col>Automatically Shorten Trip</Col>
                        </Row>
                        <Row>
                            <Col><Switch disabled={props.automaticallyRunTour}  onChange={props.toggleDisablePreviewMode} checked={props.disablePreviewMode}/></Col>
                            <Col>Disable Preview Mode <PreviewModeToolTip id='settings'/> </Col>
                        </Row>
                        <DangerZone {...props}/>
                    </Container>
                </TabPane>
            </TabContent>    
            <ModalFooter>
                <Button color="primary" onClick={props.toggleTripSettingsOpen} data-testid="SaveSettings">Save</Button>
            </ModalFooter>
        </Modal>
    )
}

const DangerZone = (props) =>{
    return <>
        <Row className='dangerZone'>Danger Zone</Row>
        <Row>
            <div className='deleteTripContainer'>
                <Row>
                    <Col>{`Will Delete Trip : "${props.tripName}"`}</Col>
                    <Col><Button onClick={()=>{props.placeActions.removeAll();props.toggleTripSettingsOpen()}} style={{color:'red',fontWeight:'500'}}>Delete Trip</Button></Col>
                </Row>
            </div>
        </Row>
        </>
}

export default TripSettingsModal