import React, { useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { useToggle } from '../../hooks/useToggle';
import Map from './Map/Map';
import Search from './Search/Search';
import Results from './Results/Results';
import Itinerary from './Itinerary/Itinerary';
import FileUploadModal from './Itinerary/Modals/FileUploadModal';
import { usePlaces } from '../../hooks/usePlaces';;
import OptimizedTrip from './OptimizedTrip/OptimizedTrip';
import { handleAutoTour, handleConfigRequest, handleDistancesRequest,handleTourRequest } from './PlannerRequestHandler'
import FileDownloadModal from './Itinerary/Modals/FileDownloadModal'
import TripSettingsModal from './Itinerary/Modals/TripSettingsModal'

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
    const [searchResults, setSearchResults] = useState({});

    const [filterSearchOpen,toggleFilterSearch] = useToggle(false);
    let defaultLimit = {request:[],response:[]}
    const [limitTypes,setLimitTypes] = useState(defaultLimit)
    const [limitWhere,setLimitWhere] = useState(defaultLimit)
    let Curpackage = {
        filterSearchOpen:filterSearchOpen,toggleFilterSearch,toggleFilterSearch,
        limitTypes:limitTypes,setLimitTypes:setLimitTypes,
        limitWhere:limitWhere,setLimitWhere:setLimitWhere,
        searchResults:searchResults,setSearchResults:setSearchResults
    }

    return Curpackage;
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
    let Curpackage = {
        centerView:centerView,setCenterView:setCenterView,
        locationPreview:locationPreview,setLocationPreview:setLocationPreview
    }
    return Curpackage;
}

const packageUtilFiles = () =>{
    const [fileDownloadOpen, toggleFileDownloadOpen] = useToggle(false);
    const [fileUploadOpen, toggleFileUploadOpen] = useToggle(false);
    const [filePlaces, setFilePlaces] = useState([]);
    let Curpackage = {
        fileUploadOpen:fileUploadOpen,toggleFileUploadOpen:toggleFileUploadOpen,
        filePlaces:filePlaces,setFilePlaces:setFilePlaces,
        fileDownloadOpen,toggleFileDownloadOpen
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
    return (
        <Container>
            <Section className='mapContainer'>
                <OptimizedTrip {...allPackages}/>
                <Map {...allPackages}/>
            </Section>
            <br />
            <Section>
                <Search {...allPackages} />
                {allPackages.searchResults && <><br /><Results {...allPackages} /></>}
            </Section>
            <Section>
                <Itinerary {...allPackages}/><FileDownloadModal {...allPackages}/><TripSettingsModal {...allPackages}/>
            </Section>
            <FileUploadModal {...allPackages}/>
        </Container>
    );
}

function Section(props) {
    console.log(props.className)
    return (
        <Row className={props.className}>
            <Col sm={12} md={{ size: 10, offset: 1 }}>
                {props.children}
            </Col>
        </Row>
    );
}