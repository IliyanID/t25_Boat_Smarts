import React, {useState} from "react";

import {Input, Button, Label, Row, Col} from 'reactstrap';

export default function CoordinateSearch(props) {
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");

    function handleLatitudeChange(e) {
        setLatitude(e.target.value);
    }

    function handleLongitudeChange(e) {
        setLongitude(e.target.value);
    }

    function handleClick() {
        // reverse geocode
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
    )
}