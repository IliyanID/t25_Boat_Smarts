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
            <Header placeActions={props.placeActions} showMessage={props.showMessage} fileUploadOpen={fileUploadOpen} toggleFileUploadOpen={toggleFileUploadOpen} />
            <Body places={props.places} placeActions={props.placeActions} {...props}/>
        </Table>
    );
}

function Header(props) {
    return (
        <thead>
            <tr>
                <th/>
                <th>My Trip</th>
                <th>
                    <ItineraryActionsDropdown {...props}/>
                    <FileUploadModal fileUploadOpen={props.fileUploadOpen} toggleFileUploadOpen={props.toggleFileUploadOpen} />
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

    return (
        <tr>
            <th scope="row">{props.index + 1}</th>
            <td>
                {name}
                <br/>
                <small className="text-muted">{location}</small>
            </td>
            <td>
                <PlaceActionsDropdown {...props} placeActions={props.placeActions} index={props.index} />
            </td>
        </tr>
    );
}