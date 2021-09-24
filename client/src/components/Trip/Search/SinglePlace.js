import React from "react";
import {Button, ListGroupItem, UncontrolledCollapse} from "reactstrap";

export default function SinglePlace(props) {
    const place = props.place;
    const latitudeDirection = parseFloat(place.latitude) < 0 ? "S" : "N";
    const longitudeDirection = parseFloat(place.longitude) < 0 ? "W" : "E";
    const latitude = Math.abs(place.latitude);
    const longitude = Math.abs(place.longitude);

    function addResultToTrip(e) {
        e.preventDefault();
        props.placeActions.append(place)
    }

    return (
        <ListGroupItem>
            <div className="d-flex">
                <h5 id={place.iso_country + place.id} className="mr-auto">{place.name}</h5>
                <Button onClick={addResultToTrip} color="primary" className="align-self-center float-right">&#43;</Button>
            </div>
            <UncontrolledCollapse toggler={place.iso_country + place.id} data-testid="place-collapse">
                <br />
                <p><strong>Municipality:</strong> {place.municipality}</p>
                <p><strong>Country:</strong> {place.iso_country}</p>
                <p><strong>Region:</strong> {place.region}</p>
                <br />
                <p><strong>Coordinates:</strong> {latitude}&#176;{latitudeDirection} {longitude}&#176;{longitudeDirection}</p>
                <p><strong>Altitude:</strong> {place.altitude}</p>
                <br />
                <p><strong>URL:</strong> {place.url}</p>
            </UncontrolledCollapse>
        </ListGroupItem>
    );
}