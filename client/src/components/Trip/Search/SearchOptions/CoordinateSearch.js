import React, { useState, useEffect } from "react";

import { Input, Button, Label, Row, Col } from "reactstrap";
import { placeToLatLng } from "../../../../utils/transformers";
import { reverseGeocode } from "../../../../utils/reverseGeocode";
import DefaultCoordinateSearch from "./DefaultCoordinateSearch";
import DegreesMinutesSeconds from "./DegreesMinutesSeconds";

export default function CoordinateSearch(props) {
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [location, setLocation] = useState({});
    const [searchType, setSearchType] = useState("decimal");



    function handleSelectChange(e) {
        setSearchType(e.target.value);
    }

    async function handleClick(e) {
        e.preventDefault();
        getResults();
    }

    async function getResults() {
        if (location) {
            const coordDetails = await reverseGeocode(location);
        }
        // use this for centering map and info in popup
    }

    useEffect(() => {
        setLocation(placeToLatLng({ latitude: latitude, longitude: longitude }));
    }, [latitude, longitude]);

    return (
        <>
            <Row>
                {(searchType === "decimal" && <DefaultCoordinateSearch setLatitude={setLatitude} setLongitude={setLongitude} />) ||
                    <>
                        <DegreesMinutesSeconds latitude={latitude} setLatitude={setLatitude} coordType="Latitude" longitude={longitude} setLongitude={setLongitude} />
                        <DegreesMinutesSeconds longitude={longitude} setLongitude={setLongitude} coordType="Longitude" latitude={latitude} setLatitude={setLatitude} />
                    </>}
            </Row>
            <Row>
                <Col className="mt-3 col-auto mr-auto">
                    <select
                        className=""
                        name="coordinateSearchType"
                        id="coordinateSearchType"
                        onChange={handleSelectChange}
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
