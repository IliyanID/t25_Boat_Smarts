import React, {useState} from 'react';
import {
    ListGroup, 
    ListGroupItem, 
    UncontrolledCollapse, 
    Card, 
    CardBody, 
    CardHeader
} from 'reactstrap';
import {useToggle} from '../../../hooks/useToggle';

export default function Results(props) {
    const results = props.searchResults;
    const places = results.places;
    const placesFound = results.found;

    return (
        <ListGroup>
            {places && places.map((place, i) => (
                <ListGroupItem>
                    <SinglePlace place={place} index={i} />
                </ListGroupItem>
            ))}
        </ListGroup>
    );
}

function SinglePlace(props) {
    const [isOpen, toggle] = useToggle(false);
    const place = props.place;
    const toggleSelector = "#" + place.id;

    return (
        <Card id={place.id}>
            <CardHeader>{place.name}</CardHeader>
            <CardBody>
                <UncontrolledCollapse toggler={toggleSelector}>
                    <p><strong>Municipality:</strong> {place.municipality}</p>
                    <p><strong>Country:</strong> {place.country}</p>
                    <p><strong>Region:</strong> {place.region}</p>
                    <br />
                    <p><strong>Coordinates:</strong> {place.latitude}, {place.longitude}</p>
                    <p><strong>Altitude:</strong> {place.altitude}</p>
                    <br />
                    <p><strong>URL:</strong> {place.url}</p>
                </UncontrolledCollapse>
            </CardBody>
        </Card>
    );
}