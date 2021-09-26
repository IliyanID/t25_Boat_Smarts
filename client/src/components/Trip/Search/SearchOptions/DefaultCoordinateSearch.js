import React, {useEffect} from "react";
import {Col, Label, Input} from 'reactstrap';
import validateCoordinates from "../../../../utils/coordinateValidator";

export default function DefaultCoordinateSearch(props) {

    function handleLatitudeChange(e) {
        props.setLatitude(e.target.value);
    }

    function handleLongitudeChange(e) {
        props.setLongitude(e.target.value);
    }

    useEffect(() => {
        validateCoordinates(props.latitude, props.longitude)
    }, [props.latitude, props.longitude]);

    return (<>
        <Col sm="12" md="6" className="mb-1 mt-2">
                        <Label for="latitude">Latitude:</Label>
                        <Input
                            id="latitude"
                            name="latitude"
                            value={props.latitude}
                            onChange={handleLatitudeChange}
                            placeholder="Latitude"
                            className="form-control"
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
                            className="form-control"
                        />
                    </Col>
    </>)
}