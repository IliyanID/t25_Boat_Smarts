import React from 'react';
import { Table } from 'reactstrap';
import { ItineraryActionsDropdown, PlaceActionsDropdown } from './actions.js';
import { latLngToText } from '../../../utils/transformers';
import { useToggle } from '../../../hooks/useToggle.js';
import FileUploadModal from './Modals/FileUploadModal.js';

export default function Itinerary(props) {
    const [fileUploadOpen, toggleFileUploadOpen] = useToggle(false);
    return (
        <Table responsive striped>
            <Header placeActions={props.placeActions} showMessage={props.showMessage} fileUploadOpen={fileUploadOpen} toggleFileUploadOpen={toggleFileUploadOpen} {...props} />
            <Body places={props.places} placeActions={props.placeActions} {...props}/>
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
                <th>My Trip
                <d style={{float:"right"}}>
                    {(totalDistance > 0)&&<>Round Trip : {totalDistance} {(totalDistance <= 1)?"mile":"miles"} </>}
                </d>
                </th>
                
                <th>
                    <ItineraryActionsDropdown placeActions={props.placeActions} showMessage={props.showMessage} {...props}/>
                    <FileUploadModal {...props}/>
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

    let cumalitiveDistances = [];
    let runningTotal = 0;
    distances.map((item)=>{runningTotal+=item;cumalitiveDistances.push({total: runningTotal,distance:item})});

    let individualItem = (props.index !=0)?cumalitiveDistances[props.index - 1]:-1;
    return (
        <tr>
            <th scope="row">{props.index + 1}</th>
            <td>
                {name}
                <br/>
                <small className="text-muted">{location}</small>
                <br/>
                {(distances.length > props.index && props.index != 0)&&
                <small>
                    <th>
                        Distance From Previous : {individualItem.distance} {(individualItem.distance <= 1)?"mile":"miles"} 
                    </th>
 
                    <th>
                        Cumulative Distance : {individualItem.total} {(individualItem.total <= 1)?"mile":"miles"}
                    </th>
                </small>}
            </td>
            <td>
                <PlaceActionsDropdown {...props} placeActions={props.placeActions} index={props.index} />
            </td>
        </tr>
    );
}