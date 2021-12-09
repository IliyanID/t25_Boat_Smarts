import React, {useEffect, useState} from "react";
import Switch from 'react-switch'
import { useToggle } from '../../../../hooks/useToggle.js';
import {PreviewModeToolTip} from '../../../../utils/PreviewModeToolTip'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Row, Col, Container, TabContent, TabPane, Nav, NavItem, NavLink, Dropdown,DropdownItem, Label, DropdownToggle, DropdownMenu, InputGroup, Input, InputGroupAddon, InputGroupText } from "reactstrap";
import '../../../../static/styles/DeleteTripSection.css'
import classnames from 'classnames'
import { BsTrash } from 'react-icons/bs'
import { MakeToolTip } from "../../../../utils/PreviewModeToolTip";




export function TripSettingsModal(props) {
    const [currentTab, setCurrentTab] = useState('1');

    const tabToggle = (tab) =>{
        if (currentTab !== tab) setCurrentTab(tab)
    }

    const [dropdownOpen,setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);

    const [unit,setUnit] = useState(localStorage.getItem("fileUnitsName") != null ? localStorage.getItem("fileUnitsName") : "Miles");
    const [unitValue, setUnitValue] = useState(localStorage.getItem("fileUnitsValue") != null ? localStorage.getItem("fileUnitsValue") : 3959.0);

    const [input, toggleInput] = useState(localStorage.getItem("fileUnitsName") != "Create Your Own");


    const handleAutoTour = ()=>{
        props.toggleAutomaticallyRunTour()
        if(!props.disablePreviewMode){
            props.toggleDisablePreviewMode();
        }
    }

    const allUnitsDefault = [
        {
            unitName:'Miles',
            earthRadius:3959.0
        },
        {
            unitName:'Kilometers',
            earthRadius:6371.4
        },
        {
            unitName:'Nautcal Miles',
            earthRadius:3440.3
        },
        {
            unitName:'Create Your Own'
        }
    ]
    const [allUnits,setAllUnits] = useState(localStorage.getItem("allUnitsSaved") != null ? JSON.parse(localStorage.getItem("allUnitsSaved")) : [...allUnitsDefault])
    const handleSave = () => {
        let index = allUnits.map(e=>{return e.unitName}).indexOf(unit)
        if(index === -1){
            let temp = [...allUnits]
            temp.unshift({
                unitName:unit,
                earthRadius:unitValue,
                userAdded:true
            })
            let saved = JSON.stringify(temp)
            localStorage.setItem('allUnitsSaved',saved)
            setAllUnits(temp)
        }
        else{
            localStorage.setItem('allUnitsSaved',JSON.stringify(allUnits))
        }

        localStorage.setItem("fileUnitsName", unit);
        localStorage.setItem("fileUnitsValue", unitValue);
        props.toggleTripSettingsOpen();
        toggleInput(true)
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
                            Optimization
                    </NavLink>
                </NavItem>
                <NavItem> 
                    <NavLink
                        className={classnames({
                            active: currentTab === '3'
                        })}
                        onClick={() => {tabToggle('3');}}>
                            Lines
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={currentTab}>
                <TabPane tabId="1">
                    <Container>
                        <br/>
                        <Row>
                            <Col>
                                <Dropdown direction="right" isOpen={dropdownOpen} toggle={toggle}>
                                    <Label>Unit Type:&ensp;</Label>
                                    <DropdownToggle caret>
                                        {unit}
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        {
                                            allUnits.map((unit,index)=>{
                                                return <DropdownItem data-testid={`select${unit.unitName}`} >
                                                    <div
                                                    style={{width:'70%',display:'inline-block'}}
                                                    onClick={()=>{
                                                        console.log(unit)
                                                        if(index === allUnits.length - 1){
                                                            setUnit(unit.unitName)
                                                            toggleInput(false)
                                                        }
                                                        else {   
                                                            toggleInput(true)
                                                            setUnit(unit.unitName)
                                                            setUnitValue(unit.earthRadius)
                                                        }
                                                    }}
                                                    >{unit.unitName}</div>
                                                    {(unit.userAdded)?<>
                                                    <BsTrash id={`Delete-unit-${index}`} style={{marginLeft:'20px',display:'inline-block'}} onClick={()=>{
                                                        let temp = [...allUnits]
                                                        temp.splice(index,1)
                                                        setAllUnits(temp)
                                                        setUnit(temp[0].unitName)
                                                        toggleInput(true)
                                                        setUnitValue(temp[0].earthRadius)
                                                    }}/>
                                                    <MakeToolTip target={`Delete-unit-${index}`} text={`Permanently Delete ${unit.unitName}`}/>
                                                    </>
                                                    :<></>}
                                                </DropdownItem>
                                            })
                                        }
                                    </DropdownMenu>
                                </Dropdown><br/>
                            </Col>
                        </Row>
                        <Row hidden = {input}>
                            <Col>
                                <InputGroup>
                                    <InputGroupAddon addonType ="prepend">
                                        <InputGroupText>Unit Name</InputGroupText>
                                    </InputGroupAddon>
                                    <Input onChange={(e) => {
                                        if(e.target.value.length < 15)
                                            setUnit(e.target.value)
                                        else
                                        e.target.value = e.target.value.substring(0,e.target.value.length - 1)
                                    }}/>
                                </InputGroup>
                            </Col>
                            <Col>
                                <InputGroup>
                                    <InputGroupAddon addonType ="prepend">
                                        <InputGroupText>Earth Radius</InputGroupText>
                                    </InputGroupAddon>
                                    <Input type='number' onChange={(e) => {
                                        if(e.target.value > 9999999999)
                                            return
                                        e.target.value = e.target.value.replaceAll(',','')
                                        setUnitValue(e.target.value)
                                        }}/>
                                </InputGroup>
                            </Col>
                        </Row><br/>
                    </Container>
                </TabPane>
                <TabPane tabId="2">
                    <Container>
                        <br/>
                        <Row>
                            <Col><Switch onChange={handleAutoTour} checked={props.automaticallyRunTour}/></Col>
                            <Col>Automatically Shorten Trip</Col>
                        </Row>
                        <Row>
                            <Col><Switch disabled={props.automaticallyRunTour}  onChange={props.toggleDisablePreviewMode} checked={props.disablePreviewMode}/></Col>
                            <Col>Disable Preview Mode <PreviewModeToolTip id='settings'/> </Col>
                        </Row>
                    </Container>
                </TabPane>
                <LineSettingsTab {...props}/>
            <DangerZone {...props}/>

            </TabContent>  

            <ModalFooter>
                <Button color="primary" onClick={handleSave} data-testid="SaveSettings">Save</Button>
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

const colors = ["Default", "Red", "Orange", "Yellow", "Green", "Blue", "Purple", "Black", "White", "Gray"];

const LineSettingsTab = (props) => {
    return (
        <TabPane tabId="3">
            <Container>
                <br/>
                <Row>
                    <InputGroup className="mx-2 my-2">
                    <InputGroupAddon addonType="prepend">Line color</InputGroupAddon>
                    <Input id="lineColor" name="lineColor" type="select" value={props.lineColor} onChange={e => {if (e.target.value === "Default") props.setLineColor("#3388ff"); else props.setLineColor(e.target.value)}}>
                        {colors.map(color => <option key={color}>{color}</option>)}
                    </Input>
                    </InputGroup>
                </Row>
                <Row>
                <InputGroup className="mx-2 my-2">
                    <InputGroupAddon addonType="prepend">Solid or Dashed</InputGroupAddon>
                    <Input id="dashArray" name="dashArray" type="select" value={props.dashArray === "" ? "Solid" : "Dashed"} onChange={e => {if (e.target.value === "Solid") props.setDashArray(""); else props.setDashArray("8")}}>
                        <option>Solid</option>
                        <option>Dashed</option>
                    </Input>
                    </InputGroup>
                </Row>
                <Row>
                <InputGroup className="mx-2 my-2">
                    <InputGroupAddon addonType="prepend">Line width</InputGroupAddon>
                    <Input id="lineWidth" name="lineWidth" type="range" step="1" min="1" max="6" value={props.lineWidth} onChange={e => props.setLineWidth(e.target.value)}/>
                    </InputGroup>
                </Row>
            </Container>
        </TabPane>
    )
}

export default TripSettingsModal
