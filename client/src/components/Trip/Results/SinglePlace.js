import React from "react";
import {Button, ListGroupItem, UncontrolledCollapse} from "reactstrap";

export default function SinglePlace(props) {
    const place = props.place;

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
                <PlaceInfo {...props}/>
            </UncontrolledCollapse>
        </ListGroupItem>
    );
};

export function PlaceInfo(props) {
    const place = props.place;
    const latitudeDirection = parseFloat(place.latitude) < 0 ? "S" : "N";
    const longitudeDirection = parseFloat(place.longitude) < 0 ? "W" : "E";
    const latitude = Math.abs(place.latitude).toFixed(3);
    const longitude = Math.abs(place.longitude).toFixed(3);

    return(
        <>
        <br />
                <p>
                    <strong>Municipality:</strong> {place.municipality}<br />
                    <strong>Country:</strong> {place.country}<br />
                    <strong>Region:</strong> {place.region}
                </p>
                <p>
                    <strong>Type:</strong> {place.type}<br />
                    <strong>ID:</strong> {place.id}
                </p>
                <p>
                    <strong>Coordinates:</strong> {latitude}&#176;{latitudeDirection} {longitude}&#176;{longitudeDirection}<br />
                    <strong>Altitude:</strong> {place.altitude}
                </p>
        </>
    );
};