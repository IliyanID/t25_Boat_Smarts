import React, {useState} from 'react';
import {ListGroup, ListGroupItem, UncontrolledCollapse} from 'reactstrap';

export default function Results () {
    const results = props.searchResults;
    const places = results.places;
    const placesFound = results.found;

    return (
        <ListGroup>
            {places.map((place, i) => (
                <ListGroupItem>
                    <SinglePlace place={place} data-index={i} />
                </ListGroupItem>
            ))}
        </ListGroup>
    );
}

function SinglePlace() {
    return (
        <>
        </>
    );
}