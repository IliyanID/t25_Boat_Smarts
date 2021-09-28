import React, { useState, useEffect } from "react";

import { Button, Label, Row, Col } from "reactstrap";
import { placeToLatLng } from "../../../../../utils/transformers";
import { reverseGeocode } from "../../../../../utils/reverseGeocode";
import DefaultCoordinateSearch from "./DefaultCoordinateSearch";
import DegreesMinutesSeconds from "./DegreesMinutesSeconds";
import validateCoordinates from "../../../../../utils/coordinateValidator";

export default function CoordinateSearch(props) {
    const [latitude, setLatitude] = useState("");
    const [validLatitude, setValidLatitude] = useState(false);
    const [longitude, setLongitude] = useState("");
    const [validLongitude, setValidLongitude] = useState(false);
    const [searchType, setSearchType] = useState("decimal");



    function handleSelectChange(e) {
        setSearchType(e.target.value);
    }

    function handleFind() {
        getResults();
    }

    function handleAdd(){
        if (validLatitude && validLongitude) {
            props.placeActions.append({ latitude: latitude, longitude: longitude })
        }
    }

    function getResults() {
        if (validLatitude && validLongitude) {
            props.setLocationPreview(placeToLatLng({ latitude: latitude, longitude: longitude }));
            //const coordDetails = await reverseGeocode(props.locationPreview);
        } else {
            if (!validLatitude) {
                props.showMessage("Invalid latitude.", "warning");
            }
            if (!validLongitude) {
                props.showMessage("Invalid longitude.", "warning");
            }
        }
        // use this for centering map and info in popup
    }

    useEffect(() => {
        validateCoordinates(latitude, longitude, setValidLatitude, setValidLongitude);
    }, [latitude, longitude]);

    return (
        <>

            {searchType === "decimal" ? <Row><DefaultCoordinateSearch validLatitude={validLatitude} validLongitude={validLongitude} setLatitude={setLatitude} setLongitude={setLongitude} /></Row> :
                <>
                <Label className="mt-2 mb-0">Latitude:</Label>
                <Row>
                    <DegreesMinutesSeconds latitude={latitude} setLatitude={setLatitude} coordType="Latitude" longitude={longitude} setLongitude={setLongitude} />
                </Row>
                <Label className="mt-2 mb-0">Longitude:</Label>
                <Row>
                    <DegreesMinutesSeconds longitude={longitude} setLongitude={setLongitude} coordType="Longitude" latitude={latitude} setLatitude={setLatitude} />
                </Row>
                </>}

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
                    <Button onClick={handleFind}>Find</Button>
                    <Button style={{marginLeft:"5px"}} onClick={handleAdd}>Add</Button>
                </Col>
            </Row>
        </>
    );
}
