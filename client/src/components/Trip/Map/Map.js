import React, { useEffect, useState, useRef } from 'react';
import { Map as LeafletMap, Polyline, TileLayer } from 'react-leaflet';
import Marker from './Marker';
import { latLngToPlace, placeToLatLng } from '../../../utils/transformers';
import { DEFAULT_STARTING_PLACE } from '../../../utils/constants';
import 'leaflet/dist/leaflet.css';

const MAP_BOUNDS = [[-90, -180], [90, 180]];
const MAP_LAYER_ATTRIBUTION = "&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors";
const MAP_LAYER_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const MAP_MIN_ZOOM = 1;
const MAP_MAX_ZOOM = 19;

export default function Map(props) {
    const [coordinates,setCoordinates] = useState(placeToLatLng(DEFAULT_STARTING_PLACE))
    const [previewMarker,setPreviewMarker] = useState(false)
    const mapRef = useRef()
    const [zoom,setZoom] = useState(15)

    const centerView = (currentCords) =>{
        setCoordinates(currentCords)
        let currentZoom = mapRef.current.leafletElement.getZoom();
        setZoom(currentZoom)
    }


    
    useEffect(()=>{
       getCenter().then((result)=>{setCoordinates(result)});
    },[])

    useEffect(()=>{
        if( props.selectedIndex >=0 )
            centerView(props.places[props.selectedIndex])
    },[props.centerView])

    useEffect(()=>{
        const valid = (latlng)=>{
            return latlng !== undefined
        }
        if(props.locationPreview && valid(props.locationPreview.lat) && valid(props.locationPreview.lng)){
            setCoordinates({... props.locationPreview})
            setPreviewMarker(true);
        }
    },[props.locationPreview])

    useEffect(()=>{
        setPreviewMarker(false)
    },[props.places])

    function handleMapClick(mapClickInfo) {
        let latlng = mapClickInfo.latlng
        if(latlng.lat < -90 || latlng.lat > 90 || latlng.lng < -180 || latlng.lng > 180){
            props.showMessage(`Out of Bounds. Bounds are -90 < Latitude < 90 and -180 < Longitude < 180. Received ${Math.round(latlng.lat)} , ${Math.round(latlng.lng)}`,'error')
            return;
        }
        if(!props.previewTripFocus){
            props.placeActions.append(latLngToPlace(latlng));
        }
    }

    return (
        <LeafletMap
            ref={mapRef}
            className="mapStyle"
            boxZoom={false}
            useFlyTo={true}
            zoom={zoom}
            minZoom={MAP_MIN_ZOOM}
            maxZoom={MAP_MAX_ZOOM}
            maxBounds={MAP_BOUNDS}
            center={coordinates}
            onClick={handleMapClick}
            data-testid="Map"
        >
            <TileLayer url={MAP_LAYER_URL} attribution={MAP_LAYER_ATTRIBUTION} />
            <TripLines places={props.places} />
            {(previewMarker)?
                <Marker place={props.locationPreview} />
                :
                <PlaceMarker places={props.places} selectedIndex={props.selectedIndex} />
            }
        </LeafletMap>
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