import React from 'react';
import { Table } from 'reactstrap';
import { useToggle } from '../../../hooks/useToggle.js';
import Body from './Body/Body'
import Header from './Header/Header'

export default function Itinerary(props) {
    const [fileDownloadOpen, toggleFileDownloadOpen] = useToggle(false);

    let distances = [-1]
    if(props.distances && props.distances.distances)
        distances = props.distances.distances
    let cumalitiveDistances = [];
    let runningTotal = 0;
    distances.map((item)=>{runningTotal+=item;cumalitiveDistances.push({total: runningTotal,distance:item})});

    return (
        <Table responsive striped>
            <Header totalDistance={runningTotal} placeActions={props.placeActions} showMessage={props.showMessage} fileDownloadOpen={fileDownloadOpen} toggleFileDownloadOpen = {toggleFileDownloadOpen}{...props} />
            <Body cumalitiveDistances={cumalitiveDistances}  places={props.places} placeActions={props.placeActions} {...props}/>
        </Table>
    );
}