import React from 'react';
import { Table } from 'reactstrap';
import { useToggle } from '../../../hooks/useToggle.js';
import Body from './Body/Body'
import Header from './Header/Header'

export default function Itinerary(props) {
    const [fileDownloadOpen, toggleFileDownloadOpen] = useToggle(false);
    return (
        <Table responsive striped>
            <Header placeActions={props.placeActions} showMessage={props.showMessage} fileDownloadOpen={fileDownloadOpen} toggleFileDownloadOpen = {toggleFileDownloadOpen}{...props} />
            <Body places={props.places} placeActions={props.placeActions} {...props}/>
        </Table>
    );
}