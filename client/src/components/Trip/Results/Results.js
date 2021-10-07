import React, { useEffect } from 'react';
import {ListGroup} from 'reactstrap';
import SinglePlace from './SinglePlace';

export default function Results(props) {
    const results = props.searchResults;
    const places = results.places;
    const placesFound = results.found;

    return (
        <ListGroup data-testid="results-list">
            {places && places.map((place, i) => <SinglePlace key={place.country+place.id} place={place} index={i} {...props} />)}
            {placesFound && <p>Total results: {placesFound}</p>}
        </ListGroup>
    );
}