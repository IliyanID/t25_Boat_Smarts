import React from "react";
import { Col, Label, Input } from 'reactstrap';

export default function DefaultCoordinateSearch(props) {

    function handleLatitudeChange(e) {
        props.setLatitude(e.target.value);
    }

    function handleLongitudeChange(e) {
        props.setLongitude(e.target.value);
    }

    return (
    <>
        <SearchBox searchFor="Latitude" value={props.latitude} handleValueChange={handleLatitudeChange} />
        <SearchBox searchFor="Longitude" value={props.longitude} handleValueChange={handleLongitudeChange} />
    </>)
}

function SearchBox(props) {
    return (
        <Col sm="12" md="6" className="mb-1 mt-2">
            <Label for={props.searchFor}>{props.searchFor}:</Label>
            <Input
                id={props.searchFor}
                name={props.searchFor}
                value={props.value}
                onChange={props.handleValueChange}
                placeholder={props.searchFor}
            />
        </Col>
    )
}