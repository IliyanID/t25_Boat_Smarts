import React, { useState, useEffect } from "react";

import { Input, Button, Label, Row, Col } from "reactstrap";
import { placeToLatLng } from "../../../../utils/transformers";
import { reverseGeocode } from "../../../../utils/reverseGeocode";

export default function CoordinateSearch(props) {
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [location, setLocation] = useState({});

    async function handleLatitudeChange(e) {
        setLatitude(e.target.value);
    }

    async function handleLongitudeChange(e) {
        setLongitude(e.target.value);
    }

    async function handleClick(e) {
        e.preventDefault();
        getResults();
    }

    async function getResults() {   
        if (location) {
            const coordsAndName = await reverseGeocode(location);
        }
        // use this for centering map and info in popup
    }

    useEffect(() => {
        setLocation(placeToLatLng({ latitude: latitude, longitude: longitude }));
    }, [latitude, longitude]);

    return (
        <>
            <Row>
                <Col sm="12" md="6" className="mb-1 mt-2">
                    <Label for="latitude">Latitude:</Label>
                    <Input
                        id="latitude"
                        name="latitude"
                        value={latitude}
                        onChange={handleLatitudeChange}
                        placeholder="Latitude"
                    />
                </Col>
                <Col sm="12" md="6" className="mb-1 mt-2">
                    <Label for="latitude">Longitude:</Label>
                    <Input
                        id="longitude"
                        name="longitude"
                        value={longitude}
                        onChange={handleLongitudeChange}
                        placeholder="Longitude"
                    />
                </Col>
            </Row>
            <Row>
                <Col className="mt-3 col-auto mr-auto">
                    <select
                        className=""
                        name="coordinateSearchType"
                        id="coordinateSearchType"
                    >
                        <option value="decimal">Decimal Degrees</option>
                        <option value="dms">Degrees, Minutes, Seconds</option>
                    </select>
                </Col>
                <Col className="mt-3 col-auto">
                    <Button onClick={handleClick}>Find</Button>
                </Col>
            </Row>
        </>
    );
}
