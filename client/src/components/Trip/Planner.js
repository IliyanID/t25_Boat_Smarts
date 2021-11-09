import React, {useState, useEffect} from 'react';
import { Col, Container, Row } from 'reactstrap';
import { sendAPIRequest, getOriginalServerUrl } from "../../utils/restfulAPI"
import { EARTH_RADIUS_UNITS_DEFAULT } from "../../utils/constants"
import { latLngToPlace } from "../../utils/transformers"
import { useToggle } from '../../hooks/useToggle';
import Map from './Map/Map';
import Search from './Search/Search';
import Results from './Results/Results';
import Itinerary from './Itinerary/Itinerary';
import FileUploadModal from './Itinerary/Modals/FileUploadModal';
import { usePlaces } from '../../hooks/usePlaces';;
import { convertPlace } from './Itinerary/Modals/FileUploadModal'
import OptimizedTrip from './OptimizedTrip/OptimizedTrip';


export default function Planner(props) {
    const {setAllPlaces, previousPlaces, places, setPlaces, selectedIndex, setSelectedIndex, placeActions} = usePlaces();
    const [searchResults, setSearchResults] = useState({});
    const [centerView,setCenterView] = useState(false);
    const [locationPreview, setLocationPreview] = useState();
    const [fileUploadOpen, toggleFileUploadOpen] = useToggle(false);
    const [distances, setDistances] = useState({distances: []});
    const [filePlaces, setFilePlaces] = useState([]);
    const [tripName, setTripName] = useState("My Trip")
	const [origionalPlaces,setOrigionalPlaces] = useState(...[places])
    const [previewTripFocus,togglePreviewTripFocus] = useToggle(false);
    
    const [filterSearchOpen,toggleFilterSearch] = useToggle(false);
    const [limitTypes,setLimitTypes] = useState({request:[],response:[]})
    const [limitWhere,setLimitWhere] = useState({request:[],response:[]})

    const prepForAPIRequest = () =>{
        let serverURLSet = props.serverSettings && props.serverSettings.serverUrl;
        let currentURL = serverURLSet ? props.serverSettings.serverUrl : getOriginalServerUrl();
        let convertedPlaces = [];
        
        let convertPlacesFunc = (place) =>{
            let temp = latLngToPlace(place);
            temp['name'] = place.name;
            convertedPlaces.push(temp);
         }
        places.map(convertPlacesFunc);

        return {currentURL,convertedPlaces}
    }

    useEffect(()=>{
        const {currentURL} = prepForAPIRequest()

        if(filterSearchOpen)
            sendAPIRequest({
                requestType:'config',
            },currentURL).then((response)=>{
                    if(!response)
                        return
                    
                    if(response.type){
                        let temp = {...limitTypes}
                        temp.response = response.type;
                        setLimitTypes(temp)
                    }

                    if(response.where){
                        let temp = {...limitWhere}
                        temp.response = response.type;
                        setLimitWhere(temp)
                    }
                })
    },[filterSearchOpen]);

    useEffect(()=>{
        const {currentURL,convertedPlaces} = prepForAPIRequest()
        sendAPIRequest({
            requestType:'distances',
            places:convertedPlaces,
            earthRadius:EARTH_RADIUS_UNITS_DEFAULT.miles
        },currentURL).then((response)=>{
                if(response)
                    setDistances(response)
            })
        if(selectedIndex != -1 && places.length > previousPlaces.length ){
            props.showMessage("Added to Trip " + places[selectedIndex].name,"info")            
        }
    },[places]);

    useEffect(()=>{
        const {currentURL,convertedPlaces} = prepForAPIRequest()
        if(previewTripFocus){
            setOrigionalPlaces([...places])            
            sendAPIRequest({
                requestType:'tour',
                places:convertedPlaces,
                earthRadius:EARTH_RADIUS_UNITS_DEFAULT.miles,
                response: 1
            },currentURL).then((response)=>{
                    if(response){
                        let convertedPlaces = response.places.map(place => convertPlace(place))
                        setAllPlaces(convertedPlaces);
                    }
                })

            window.scrollTo({
                top: 0,
                behavior: 'smooth'
              })
        }
    },[previewTripFocus])

    return (
        <Container>
            <Section>
                <OptimizedTrip previewTripFocus={previewTripFocus} togglePreviewTripFocus={togglePreviewTripFocus} setPlaces={setAllPlaces} origionalPlaces={origionalPlaces}/>
            </Section>
            <Section>
                <Map previewTripFocus={previewTripFocus} locationPreview={locationPreview} centerView={centerView} places={places} selectedIndex={selectedIndex} placeActions={placeActions} />
            </Section>
            <br />
            <Section>
                <Search setLimitWhere={setLimitWhere} limitWhere={limitWhere} setLimitTypes={setLimitTypes} limitTypes={limitTypes} filterSearchOpen={filterSearchOpen} toggleFilterSearch={toggleFilterSearch} locationPreview={locationPreview} setLocationPreview={setLocationPreview} searchResults={searchResults} placeActions={placeActions} setSearchResults={setSearchResults} {...props} />
                {searchResults && <><br /><Results searchResults={searchResults} placeActions={placeActions} /></>}
            </Section>
            <br />
            <Section>
                <Itinerary togglePreviewTripFocus={togglePreviewTripFocus} tripName={tripName} setTripName={setTripName} distances={distances} fileUploadOpen={fileUploadOpen} toggleFileUploadOpen={toggleFileUploadOpen} centerView={centerView} setCenterView = {setCenterView} places={places} selectedIndex={selectedIndex} placeActions={placeActions} {...props}/>
            </Section>
            <FileUploadModal setTripName={setTripName} fileUploadOpen={fileUploadOpen} toggleFileUploadOpen={toggleFileUploadOpen} places={places} setPlaces={setPlaces} setSelectedIndex={setSelectedIndex} placeActions={placeActions} filePlaces={filePlaces} setFilePlaces={setFilePlaces} {...props}/>
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