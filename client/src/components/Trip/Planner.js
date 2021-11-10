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
import { handleConfigRequest, handleDistancesRequest,handleTourRequest } from './PlannerRequestHandler'

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
    let Curpackage = {
        origionalPlaces:origionalPlaces,setOrigionalPlaces:setOrigionalPlaces,
        previewTripFocus:previewTripFocus,togglePreviewTripFocus:togglePreviewTripFocus
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
    const [fileUploadOpen, toggleFileUploadOpen] = useToggle(false);
    const [filePlaces, setFilePlaces] = useState([]);
    let Curpackage = {
        fileUploadOpen:fileUploadOpen,toggleFileUploadOpen:toggleFileUploadOpen,
        filePlaces:filePlaces,setFilePlaces:setFilePlaces
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




const combineAllPackes = (props) =>{
    const packagedUtilPlaces = packageUtilPlaces();
    const packagedUtilSearch = packageUtilSearch();
    const packagedUtilDistances = packageUtilDistances();
    const packagedUtilTour = packageUtilTour(packagedUtilPlaces);
    const packagedUtilMap = packageUtilMap();
    const packagedUtilFiles = packageUtilFiles();
    const packagedUtilTripName = packageUtilTripName();

    const allPackages = {
        ...packagedUtilPlaces,
        ...packagedUtilSearch,
        ...packagedUtilDistances,
        ...packagedUtilTour,
        ...packagedUtilMap,
        ...packagedUtilFiles,
        ...packagedUtilTripName,
        ...props
    } 
    return allPackages;
}

export default function Planner(props) {
    const allPackages = combineAllPackes(props)

    handleConfigRequest(allPackages,props);
    handleDistancesRequest(allPackages,props);
    handleTourRequest(allPackages,props);
    return (
        <Container>
            <Section>
                <OptimizedTrip {...allPackages}/>
            </Section>
            <Section>
                <Map {...allPackages} />
            </Section>
            <br />
            <Section>
                <Search {...allPackages} />
                {allPackages.searchResults && <><br /><Results {...allPackages} /></>}
            </Section>
            <br />
            <Section>
                <Itinerary {...allPackages}/>
            </Section>
            <FileUploadModal {...allPackages}/>
        </Container>
    );
}

function Section(props) {
    return (
        <Row>
            <Col sm={12} md={{ size: 10, offset: 1 }}>
                {props.children}
            </Col>
        </Row>
    );
}