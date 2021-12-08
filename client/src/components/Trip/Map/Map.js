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
import { LayerSelection } from './LayerSelection'
import { deeplyCompareArray } from '../../../utils/deeplyCompare';

const MAP_BOUNDS = [[-90, -180], [90, 180]];
const MAP_MIN_ZOOM = 1;
const MAP_MAX_ZOOM = 19;
const layers ={
        Elevation:'https://a.tile.opentopomap.org/{z}/{x}/{y}.png',
        Street:'https://mt0.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
        Hybrid:'https://mt0.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',
        Satellite:'https://mt0.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
        Terrain:'https://mt0.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',
        Traffic:'https://mt0.google.com/vt/lyrs=m@221097413,traffic&x={x}&y={y}&z={z}',
        Default:'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    }

const packageStates = () =>{
    const [coordinates,setCoordinates] = useState(placeToLatLng(DEFAULT_STARTING_PLACE))
    const [previewMarker,setPreviewMarker] = useState(false)
    const mapRef = useRef()
    const [zoom,setZoom] = useState(15)
    const [isOpen, toggleOpen] = useToggle(true);
    const [selectedLayer,setSelectedLayer] = useState('Default')

    return {
        coordinates,setCoordinates,
        previewMarker,setPreviewMarker,
        mapRef,
        zoom,setZoom,
        isOpen,toggleOpen,
        selectedLayer,setSelectedLayer,
    }
}
const centerView = (allPackages,currentCords) =>{
    allPackages.setCoordinates(currentCords)
    let currentZoom = allPackages.mapRef.current.leafletElement.getZoom();
    allPackages.setZoom(currentZoom)
}

function handleMapClick(allPackagees,mapClickInfo) {
    let maxWidth = allPackagees.mapRef.current.leafletElement._size.x - mapClickInfo.containerPoint.x
    let maxHeight =  mapClickInfo.containerPoint.y
    let latlng = mapClickInfo.latlng

    const actionsRef = document.getElementById('iteneraryActionsDropDown')
    if(maxWidth < actionsRef.offsetWidth && maxHeight < actionsRef.offsetHeight)
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
            const storedLayer = localStorage.getItem('t25-map-layer');
            if(storedLayer)
                allPackages.setSelectedLayer(storedLayer)
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



export const Map = (props) => {
    const states = packageStates()
    const allPackages = {...states,...props,...MAP_BOUNDS,layers:layers}
    componentDidMount(allPackages);handleCenterView(allPackages);handleLocationPreview(allPackages);handlePlaces(allPackages)    

    return (
        <>
        <LeafletMap
            ref={allPackages.mapRef} className="mapStyle"
            boxZoom={false} useFlyTo={true}
            zoom={allPackages.zoom} minZoom={MAP_MIN_ZOOM} maxZoom={MAP_MAX_ZOOM} maxBounds={MAP_BOUNDS}
            center={allPackages.coordinates}
            onClick={(e)=>handleMapClick(allPackages,e)}
            data-testid="Map"
            style={allPackages.style}
        >
            <TileLayer url={layers[allPackages.selectedLayer]} />
            <TripLines places={allPackages.places} lineColor={props.lineColor} dashArray={props.dashArray} lineWidth={props.lineWidth}/>
            {(allPackages.previewMarker)?<Marker place={allPackages.locationPreview} />:<PlaceMarker places={allPackages.places} selectedIndex={allPackages.selectedIndex} />}

            <ItineraryActionsDropdown {...allPackages}/>
            {(allPackages.automaticallyRunTour)?<div className='glowingDot'/>:<></>} 
        </LeafletMap>

        </>
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
            color={props.lineColor}
            dashArray={props.dashArray}
            weight={props.lineWidth}
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

export default Map
