import React from 'react';
import { Table } from 'reactstrap';
import { ItineraryActionsDropdown, PlaceActionsDropdown } from './actions.js';
import { latLngToText } from '../../../utils/transformers';

export default function Itinerary(props) {
    return (
        <Table responsive striped>
            <Header placeActions={props.placeActions} showMessage={props.showMessage} {...props}/>
            <Body  places={props.places} placeActions={props.placeActions} {...props}/>
        </Table>
    );

}

function Header(props) {
    let totalDistance = 0;
    let distances = (props.distances)? props.distances.distances:[-1];
    distances.map((distItem)=>{totalDistance += distItem})

    return (
        <thead>
            <tr>
                <th/>
                <th>My Trip</th>
                {(totalDistance > 0)&&<th style={{textAlign:"right",minWidth:"180px"}}>Total Distance : {totalDistance}</th>}
                <th>
                    <ItineraryActionsDropdown placeActions={props.placeActions} showMessage={props.showMessage} {...props}/>
                </th>
            </tr>
        </thead>
    );
}

function Body(props) {
    return (
        <tbody>
            {props.places.map((place, index) => 
                <TableRow 
                    key={`table-${JSON.stringify(place)}-${index}`}
                    place={place}
                    placeActions={props.placeActions}
                    index={index}
                    {...props}
                />
            )}
        </tbody>
    );
}

function TableRow(props) {
    const name = props.place.name ? props.place.name : "-";
    const location = latLngToText(props.place);
    let distances = (props.distances)? props.distances.distances:[-1];


    return (
        <tr>
            <th scope="row">{props.index + 1}</th>
            <td>
                {name}
                <br/>
                <small className="text-muted">{location}</small>
            </td>
            {(distances.length > props.index)&&<td style={{textAlign:"right",minWidth:"180px"}}>Distance : {distances[props.index]}</td>}
            <td>
                <PlaceActionsDropdown {...props} placeActions={props.placeActions} index={props.index} />
            </td>
        </tr>
    );
}