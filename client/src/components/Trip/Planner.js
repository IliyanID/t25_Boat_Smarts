import React, {useState} from 'react';
import { Col, Container, Row } from 'reactstrap';
import Map from './Map/Map';
import Search from './Search/Search';
import Results from './Results/Results';
import Itinerary from './Itinerary/Itinerary';
import { usePlaces } from '../../hooks/usePlaces';

export default function Planner(props) {
    const {places, selectedIndex, placeActions} = usePlaces();
    const [searchResults, setSearchResults] = useState({});
    const [centerView,setCenterView] = useState(false)

    return (
        <Container>
            <Section>
                <Map centerView={centerView} places={places} selectedIndex={selectedIndex} placeActions={placeActions} />
            </Section>
            <br />
            <Section>
                <Search searchResults={searchResults} setSearchResults={setSearchResults} {...props} />
                {searchResults && <><br /><Results searchResults={searchResults} placeActions={placeActions} /></>}
            </Section>
            <br />
            <Section>
                <Itinerary centerView={centerView} setCenterView = {setCenterView} places={places} selectedIndex={selectedIndex} placeActions={placeActions} {...props} />
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