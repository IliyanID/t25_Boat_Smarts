import React, {useState} from 'react';
import {ListGroup, ListGroupItem} from 'reactstrap';

export default function Results () {
    const results = props.searchResults;
    const places = results.places;
    const placesFound = results.found;

    return (
        <ListGroup>
            <ListGroupItem>Cras justo odio</ListGroupItem>
        </ListGroup>
    );
}