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
                <ListGroupItem key={place.name+place.id}>
                    <SinglePlace place={place} index={i} />
                </ListGroupItem>
            ))}
        </ListGroup>
    );
}

function SinglePlace(props) {
    const [isOpen, toggle] = useToggle(false);
    const place = props.place;

    return (
        <Card key={place.name} id={place.name}>
            <CardHeader>{place.name}</CardHeader>
            <CardBody>
                <UncontrolledCollapse toggler={place.name}>
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