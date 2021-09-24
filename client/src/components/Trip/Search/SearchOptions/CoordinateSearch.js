import React, {useState} from "react";

import {Input, Button, Label, Row, Col} from 'reactstrap';
import {placeToLatLng} from "../../../../utils/transformers";
import { reverseGeocode } from "../../../../utils/reverseGeocode";

export default function CoordinateSearch(props) {
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [location, setLocation] = useState({});

    function handleLatitudeChange(e) {
        setLatitude(e.target.value);
    }

    function handleLongitudeChange(e) {
        setLongitude(e.target.value);
    }

    function handleClick() {
        getResults();
    }

    async function getResults() {
        setLocation(placeToLatLng({latitude:latitude, longitude:longitude}));
        const coordsAndName = reverseGeocode(location);
        // use this for centering map and info in popup
    }

    return (
        <Row>
            <Col sm="12" md="6">
                <Label for="latitude">Latitude:</Label>
                <Input id="latitude" name="latitude" value={latitude} onChange={handleLatitudeChange} placeholder="Latitude"/>
            </Col>
            <Col sm="12" md="6">
                <Label for="latitude">Longitude:</Label>
                <Input id="longitude" name="longitude" value={longitude} onChange={handleLongitudeChange} placeholder="Longitude"/>
            </Col>
            <Button onClick={handleClick}>Find</Button>
        </Row>
    );
}