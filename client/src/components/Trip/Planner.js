import React, { useState } from 'react';
import { Col, Container, Row, Collapse, Button } from 'reactstrap';
import { useToggle } from '../../hooks/useToggle';
import Map from './Map/Map';
import Search from './Search/Search';
import Results from './Results/Results';
import Itinerary from './Itinerary/Itinerary';
import {FileModal} from './Itinerary/Modals/FileModal';
import { usePlaces } from '../../hooks/usePlaces';;
import OptimizedTrip from './OptimizedTrip/OptimizedTrip';
import { handleAutoTour, handleConfigRequest, handleDistancesRequest,handleTourRequest,placeUpdateMessage } from './PlannerRequestHandler'
import TripSettingsModal from './Itinerary/Modals/TripSettingsModal'
import  zipObject  from 'lodash.zipobject'

const packageStatesIntoObject = (originalPackage,states,stateFunction) =>{
    //originalPackage is the object so far holding the packages
    //states is an array [stateName, setStateFunction]

    //zipObject creates an object where if you pass zipObject([1,2],['one','two']) it will return
    // {1:'one',2:'two'}
    const combinedStates = zipObject(states,stateFunction)

    //Combine the the exisiting package with the combinedStates object
    originalPackage = {...originalPackage,...combinedStates}
    return originalPackage
}

const packageUtilPlaces = () =>{
    const {setAllPlaces, previousPlaces, places, setPlaces, selectedIndex, setSelectedIndex, placeActions} = usePlaces();
    let Curpackage = {
        setAllPlaces:setAllPlaces,places:places,setPlaces:setPlaces,
        previousPlaces:previousPlaces,
        selectedIndex:selectedIndex,setSelectedIndex:setSelectedIndex,
        placeActions:placeActions
    }
    return Curpackage;
}

const packageUtilSearch = () =>{
    let p ={}

    p = packageStatesIntoObject(p,['searchResults','setSearchResults'],useState({}))
    p = packageStatesIntoObject(p,['filterSearchOpen','toggleFilterSearch'],useToggle(false))
  
    
    let defaultLimit = {request:[],response:[]}
    p = packageStatesIntoObject(p,['limitTypes','setLimitTypes'],useState({...defaultLimit}))
    p = packageStatesIntoObject(p,['limitWhere','setLimitWhere'],useState({...defaultLimit}))
    return p;
}

const packageUtilDistances = () =>{
    let p ={}

    p = packageStatesIntoObject(p,['distances','setDistances'],useState({distances: []}))
    return p;
}

const packageUtilTour = (packagedUtilPlaces) =>{
    let p = {}
    p = packageStatesIntoObject(p,['origionalPlaces','setOrigionalPlaces'],useState(...[packagedUtilPlaces.places]))
    p = packageStatesIntoObject(p,['previewTripFocus','togglePreviewTripFocus'],useToggle(false))
    p = packageStatesIntoObject(p,['disablePreviewMode','toggleDisablePreviewMode'],useToggle(false))
    p = packageStatesIntoObject(p,['automaticallyRunTour','toggleAutomaticallyRunTour'],useToggle(false))
    return p;
}

const packageUtilMap = () =>{
    let p = {}
    p = packageStatesIntoObject(p,['centerView','setCenterView'],useState(false))
    p = packageStatesIntoObject(p,['locationPreview','setLocationPreview'],useState())
    p = packageStatesIntoObject(p,['layersOpen','toggleLayers'],useToggle(false))
    p = packageStatesIntoObject(p,['hideMap','toggleHideMap'],useToggle(true))
    return p;
}

const packageUtilFiles = () =>{
    let p = {}
    p = packageStatesIntoObject(p,['fileActionsOpen','toggleFileActions'], useToggle(false))
    p = packageStatesIntoObject(p,['filePlaces','setFilePlaces'],useState([]))
    return p;
}

const packageUtilTripName = () =>{
    let p = {}
    p = packageStatesIntoObject(p,['tripName','setTripName'], useState("My Trip"))
    return p;
}

const packageTripSettings = () =>{
    let p = {}
    p = packageStatesIntoObject(p,['tripSettingsOpen','toggleTripSettingsOpen'], useToggle(false))
    p = packageStatesIntoObject(p,['fileUnitsName', 'setFileUnitsName'], useState(localStorage.getItem("fileUnitsName") != null ? localStorage.getItem("fileUnitsName") : "miles"))
    p = packageStatesIntoObject(p,['fileUnitsValue', 'setFileUnitsValue'], useState(localStorage.getItem("fileUnitsValue") != null ? localStorage.getItem("fileUnitsValue") : 3959.0))
    p = packageStatesIntoObject(p,['lineColor', 'setLineColor'], useState('#3388ff'))
    p = packageStatesIntoObject(p,['dashArray', 'setDashArray'], useState(""))
    p = packageStatesIntoObject(p,['lineWidth', 'setLineWidth'], useState(3))
    return p;
}


const combineAllPackages = (props) =>{
    const packagedUtilPlaces = packageUtilPlaces();
    const packagedUtilSearch = packageUtilSearch();
    const packagedUtilDistances = packageUtilDistances();
    const packagedUtilTour = packageUtilTour(packagedUtilPlaces);
    const packagedUtilMap = packageUtilMap();
    const packagedUtilFiles = packageUtilFiles();
    const packagedUtilTripName = packageUtilTripName();
    const packagedTripSettings = packageTripSettings();

    const allPackages = {
        ...packagedUtilPlaces,
        ...packagedUtilSearch,
        ...packagedUtilDistances,
        ...packagedUtilTour,
        ...packagedUtilMap,
        ...packagedUtilFiles,
        ...packagedUtilTripName,
        ...packagedTripSettings,
        ...props
    } 
    return allPackages;
}

export default function Planner(props) {
    const allPackages = combineAllPackages(props)

    handleConfigRequest(allPackages,props);
    handleDistancesRequest(allPackages,props);
    placeUpdateMessage(allPackages, props);
    handleTourRequest(allPackages,props);
    handleAutoTour(allPackages,props)
    let mapStyle = {display:'inherit'}
    if(!allPackages.hideMap)
        mapStyle.height = '80px'
    return (
        <Container>
                <Section className='mapCollapse mapContainer'>
                {(allPackages.hideMap || allPackages.previewTripFocus)?<div className='optimizeTripBackground'/>:<></>}

                        <OptimizedTrip {...allPackages}/><Map style={mapStyle} {...allPackages}/>
                </Section>
                

            <br />
            <Section>
                <Search {...allPackages} />
                {allPackages.searchResults && <><br /><Results {...allPackages} /></>}
            </Section>
            <Section>
                <Itinerary {...allPackages}/><FileModal {...allPackages}/><TripSettingsModal {...allPackages}/>
            </Section>
        </Container>
    );
}

function Section(props) {
    return (
        <Row className={props.className}>
            <Col sm={12} md={{ size: 10, offset: 1 }}>
                {props.children}
            </Col>
        </Row>
    );
}