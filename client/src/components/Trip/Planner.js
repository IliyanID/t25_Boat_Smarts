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
import { handleAutoTour, handleConfigRequest, handleDistancesRequest,handleTourRequest } from './PlannerRequestHandler'
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
    const [distances, setDistances] = useState({distances: []});
    let Curpackage = {
        distances:distances,setDistances:setDistances
    }
    return Curpackage;
}

const packageUtilTour = (packagedUtilPlaces) =>{
    const [origionalPlaces,setOrigionalPlaces] = useState(...[packagedUtilPlaces.places])
    const [previewTripFocus,togglePreviewTripFocus] = useToggle(false);
    const [disablePreviewMode,toggleDisablePreviewMode] = useToggle(false)
    const [automaticallyRunTour,toggleAutomaticallyRunTour] = useToggle(false)
    let Curpackage = {
        origionalPlaces:origionalPlaces,setOrigionalPlaces:setOrigionalPlaces,
        previewTripFocus:previewTripFocus,togglePreviewTripFocus:togglePreviewTripFocus,
        disablePreviewMode,toggleDisablePreviewMode,
    automaticallyRunTour:automaticallyRunTour,toggleAutomaticallyRunTour:toggleAutomaticallyRunTour
    }
    return Curpackage;
}

const packageUtilMap = () =>{
    const [centerView,setCenterView] = useState(false);
    const [locationPreview, setLocationPreview] = useState();
    const [layersOpen,toggleLayers] = useToggle(false)
    const [hideMap,toggleHideMap] = useToggle(true)
    let Curpackage = {
        centerView:centerView,setCenterView:setCenterView,
        locationPreview:locationPreview,setLocationPreview:setLocationPreview,
        layersOpen,toggleLayers,
        hideMap,toggleHideMap
    }
    return Curpackage;
}

const packageUtilFiles = () =>{
    const [fileActionsOpen, toggleFileActions] = useToggle(false);
    const [filePlaces, setFilePlaces] = useState([]);
    let Curpackage = {
        filePlaces:filePlaces,setFilePlaces:setFilePlaces,
        fileActionsOpen,toggleFileActions
    }
    return Curpackage;
}

const packageUtilTripName = () =>{
    const [tripName, setTripName] = useState("My Trip")
    let Curpackage = {
        tripName:tripName,setTripName:setTripName
    }
    return Curpackage;
}

const packageTripSettings = (allPackages) =>{
    const [tripSettingsOpen,toggleTripSettingsOpen] = useToggle(false)
    let Curpackage = {
        tripSettingsOpen,toggleTripSettingsOpen
    }
    return Curpackage;
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
    handleTourRequest(allPackages,props);
    handleAutoTour(allPackages,props)
    let mapStyle = {display:'inherit'}
    if(!allPackages.hideMap)
        mapStyle.height = '80px'
    return (
        <Container>
                <Section className='mapCollapse mapContainer'>
                {(allPackages.hideMap || allPackages.previewTripFocus)?<div className='optimizeTripBackground'/>:<></>}

                        <OptimizedTrip {...allPackages}/>
                        <Map style={mapStyle} {...allPackages}/>
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