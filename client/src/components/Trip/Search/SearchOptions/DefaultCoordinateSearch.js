import React, {useEffect} from "react";
import {Col, Label, Input} from 'reactstrap';

export default function DefaultCoordinateSearch(props) {

    function handleLatitudeChange(e) {
        props.setLatitude(e.target.value);
    }

    function handleLongitudeChange(e) {
        props.setLongitude(e.target.value);
    }

    return (<>
        <Col sm="12" md="6" className="mb-1 mt-2">
                        <Label for="latitude">Latitude:</Label>
                        <Input
                            id="latitude"
                            name="latitude"
                            value={props.latitude}
                            onChange={handleLatitudeChange}
                            placeholder="Latitude"
                            valid={props.validLatitude}
                            invalid={!props.validLatitude}
                        />
                    </Col>
                    <Col sm="12" md="6" className="mb-1 mt-2">
                        <Label for="longitude">Longitude:</Label>
                        <Input
                            id="longitude"
                            name="longitude"
                            value={props.longitude}
                            onChange={handleLongitudeChange}
                            placeholder="Longitude"
                            valid={props.validLongitude}
                            invalid={!props.validLongitude}
                        />
                    </Col>
    </>)
}