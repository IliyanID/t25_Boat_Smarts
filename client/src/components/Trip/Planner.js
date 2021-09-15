import React, {useState} from 'react';
import { Col, Container, Row } from 'reactstrap';
import Map from './Map/Map';
import Search from './Search/Search';
import Results from './Search/Results';
import Itinerary from './Itinerary/Itinerary';
import { usePlaces } from '../../hooks/usePlaces';

export default function Planner() {
    const [places, selectedIndex, placeActions] = usePlaces();
    const [searchResults, setSearchResults] = useState({});

    return (
        <Container>
            <Section>
                <Map places={places} selectedIndex={selectedIndex} placeActions={placeActions} />
            </Section>
            <br />
            <Section>
                <Search searchResults={searchResults} setSearchResults={setSearchResults} />
                {searchResults && <Results searchResults={searchResults} />}
            </Section>
            <br />
            <Section>
                <Itinerary places={places} selectedIndex={selectedIndex} placeActions={placeActions} />
            </Section>
        </Container>
    );
}

function Section(props) {
    return (
        <Row>
            <Col sm={12} md={{ size: 10, offset: 1 }}>
                {props.children}
            </Col>
        </Row>
    );
}