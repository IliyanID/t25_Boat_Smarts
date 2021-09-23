import React, {useEffect, useState, useRef} from 'react';
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
    useEffect(()=>{
       getCenter().then((result)=>{setCoordinates(result)});
    },[])

    useEffect(()=>{
        if( props.selectedIndex >=0 )
            setCoordinates(props.places[props.selectedIndex])
    },[props.centerView])
    

    function handleMapClick(mapClickInfo) {
        props.placeActions.append(latLngToPlace(mapClickInfo.latlng));
    }

    return (
        <LeafletMap
            className="mapStyle"
            boxZoom={false}
            useFlyTo={true}
            zoom={15}
            minZoom={MAP_MIN_ZOOM}
            maxZoom={MAP_MAX_ZOOM}
            maxBounds={MAP_BOUNDS}
            center={coordinates}
            onClick={handleMapClick}
            data-testid="Map"
        >
            <TileLayer url={MAP_LAYER_URL} attribution={MAP_LAYER_ATTRIBUTION} />
            <TripLines places={props.places} />
            <PlaceMarker places={props.places} selectedIndex={props.selectedIndex} />
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