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

export default function Results () {
    const results = props.searchResults;
    const places = results.places;
    const placesFound = results.found;

    return (
        <ListGroup>
            {places.map((place, i) => (
                <ListGroupItem>
                    <SinglePlace place={place} index={i} />
                </ListGroupItem>
            ))}
        </ListGroup>
    );
}

function SinglePlace(props) {
    const [isOpen, toggle] = useToggle(false);
    const toggleId = "toggle" + props.index;
    const toggleSelector = "#" + toggleId;

    return (
        <Card id={toggleId}>
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