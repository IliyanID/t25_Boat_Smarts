import React, { useEffect, useState, useRef } from 'react';
import { Button, Collapse } from 'reactstrap';
import { Map as LeafletMap, Polyline, TileLayer, Panel } from 'react-leaflet';
import Marker from './Marker';
import { latLngToPlace, placeToLatLng } from '../../../utils/transformers';
import { checkBounds } from '../../../utils/currentLocation';
import { DEFAULT_STARTING_PLACE } from '../../../utils/constants';
import 'leaflet/dist/leaflet.css';
import { ItineraryActionsDropdown } from '../Itinerary/actions';
import { map } from 'leaflet';
import { useToggle } from '../../../hooks/useToggle';

const MAP_BOUNDS = [[-90, -180], [90, 180]];
const MAP_LAYER_ATTRIBUTION = "&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors";
const MAP_LAYER_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const MAP_MIN_ZOOM = 1;
const MAP_MAX_ZOOM = 19;

const packageStates = () =>{
    const [coordinates,setCoordinates] = useState(placeToLatLng(DEFAULT_STARTING_PLACE))
    const [previewMarker,setPreviewMarker] = useState(false)
    const mapRef = useRef()
    const [zoom,setZoom] = useState(15)
    const [isOpen, toggleOpen] = useToggle(true);
    return {
        coordinates,setCoordinates,
        previewMarker,setPreviewMarker,
        mapRef,
        zoom,setZoom,
        isOpen,toggleOpen
    }
}
const centerView = (allPackages,currentCords) =>{
    allPackages.setCoordinates(currentCords)
    let currentZoom = allPackages.mapRef.current.leafletElement.getZoom();
    allPackages.setZoom(currentZoom)
}

function handleMapClick(allPackagees,mapClickInfo) {
    let maxWidth = allPackagees.mapRef.current.leafletElement._size.x - mapClickInfo.containerPoint.x
    let maxHeight =  allPackagees.mapRef.current.leafletElement._size.y - mapClickInfo.containerPoint.y
    let latlng = mapClickInfo.latlng

    if(maxWidth < 45 && maxHeight > 170)
        return
    if(checkBounds(latlng,allPackagees.showMessage))
        return
    if(allPackagees.previewTripFocus)
        return
    
    allPackagees.placeActions.append(latLngToPlace(latlng));
    
}

const componentDidMount = (allPackages) =>{
    return   useEffect(()=>{
            getCenter().then((result)=>{allPackages.setCoordinates(result)});
        },[])
}

const handleCenterView = (allPackages) =>{
    return useEffect(()=>{
        if( allPackages.selectedIndex >=0 )
            centerView(allPackages,allPackages.places[allPackages.selectedIndex])
    },[allPackages.centerView])

}

const handleLocationPreview = (allPackages)=>{
    return   useEffect(()=>{
        const valid = (latlng)=>{
            return latlng !== undefined
        }
        if(allPackages.locationPreview && valid(allPackages.locationPreview.lat) && valid(allPackages.locationPreview.lng)){
            allPackages.setCoordinates({... allPackages.locationPreview})
            allPackages.setPreviewMarker(true);
        }
    },[allPackages.locationPreview])

}

const handlePlaces = (allPackages)=>{
    return    useEffect(()=>{
        allPackages.setPreviewMarker(false)
    },[allPackages.places])

}



export default function Map(props) {
    const states = packageStates()
    const allPackages = {...states,...props}
    componentDidMount(allPackages);handleCenterView(allPackages);handleLocationPreview(allPackages);handlePlaces(allPackages)    
   
    return (
        <div>
        <Collapse isOpen={allPackages.isOpen}>
            <LeafletMap
                ref={allPackages.mapRef} className="mapStyle"
                boxZoom={false} useFlyTo={true}
                zoom={allPackages.zoom} minZoom={MAP_MIN_ZOOM} maxZoom={MAP_MAX_ZOOM} maxBounds={MAP_BOUNDS}
                center={allPackages.coordinates}
                onClick={(e)=>handleMapClick(allPackages,e)}
                data-testid="Map"
            >
                <TileLayer url={MAP_LAYER_URL} attribution={MAP_LAYER_ATTRIBUTION} />
                <TripLines places={allPackages.places} />
                {(allPackages.previewMarker)?<Marker place={allPackages.locationPreview} />:<PlaceMarker places={allPackages.places} selectedIndex={allPackages.selectedIndex} />}

                <ItineraryActionsDropdown {...props}/>

            </LeafletMap>
        </Collapse>
        <Button className="mt-1" size="sm" color="secondary" onClick={allPackages.toggleOpen}>{allPackages.isOpen ? "Hide Map" : "Show Map"}</Button>
        </div>
    );
}

const getCenter = async () => {
    let centerCoordinates = {...DEFAULT_STARTING_PLACE}
    if (navigator.geolocation){
        const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        centerCoordinates = {
            latitude : position.coords.latitude,
            longitude : position.coords.longitude
        }
    }
    return placeToLatLng(centerCoordinates);
}

function TripLines(props) {
    const pathData = computePaths(props.places);
    return pathData.map((path, index) =>
        <Polyline
            key={`${JSON.stringify(path)}-${index}`}
            positions={path}
        />
    );
}

function computePaths(places) {
    if (places.length < 2) {
        return [];
    }

    const pathPointPairs = [];
    for (let i = 0; i < places.length; i++) {
        const fromPlace = places[i];
        const toPlace = places[(i+1) % places.length];
        pathPointPairs.push([fromPlace, toPlace]);
    }
    return pathPointPairs;
}

function PlaceMarker({places, selectedIndex}) {
    if (selectedIndex === -1) {
        return null;
    }
    return <Marker place={places[selectedIndex]} />;
}