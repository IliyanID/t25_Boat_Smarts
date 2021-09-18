import React from 'react';
import {
    Button,
    ListGroup, 
    ListGroupItem, 
    UncontrolledCollapse,
} from 'reactstrap';

export default function Results(props) {
    const results = props.searchResults;
    const places = results.places;
    const placesFound = results.found;

    return (
        <ListGroup>
            {places && places.map((place, i) => (
                <ListGroupItem key={place.iso_country+place.id}>
                    <SinglePlace place={place} index={i} {...props} />
                </ListGroupItem>
            ))}
            {placesFound && <p>Total results: {placesFound}</p>}
        </ListGroup>
    );
}

function SinglePlace(props) {
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
        <>
            <h5 id={place.iso_country + place.id} className="d-inline float-left">{place.name}</h5>
            <Button onClick={addResultToTrip} className="d-inline float-right">&#43;</Button>
            <UncontrolledCollapse toggler={place.iso_country + place.id}>
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
        </>
    );
}