import React from 'react';
import { Table } from 'reactstrap';
import { useToggle } from '../../../hooks/useToggle.js';
import Body from './Body/Body'
import Header from './Header/Header'

export default function Itinerary(props) {
    const [fileDownloadOpen, toggleFileDownloadOpen] = useToggle(false);


    
    let cumalitiveDistances = [];

    
    
    let runningTotal = 0;
    try{
        props.distances.distances.map((item)=>{runningTotal+=item;cumalitiveDistances.push({total: runningTotal,distance:item})});
    }catch{cumalitiveDistances = [{total:50,distance:0}]}
    return (
        <Table responsive striped>
            <Header totalDistance={runningTotal} placeActions={props.placeActions} showMessage={props.showMessage} fileDownloadOpen={fileDownloadOpen} toggleFileDownloadOpen = {toggleFileDownloadOpen}{...props} />
            <Body cumalitiveDistances={cumalitiveDistances}  places={props.places} placeActions={props.placeActions} {...props}/>
        </Table>
    );
}