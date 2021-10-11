import React, { useEffect, useState, useRef, Fragment } from 'react';
import { Table } from 'reactstrap';
import { ItineraryActionsDropdown, PlaceActionsDropdown } from './actions.js';
import { latLngToText } from '../../../utils/transformers';
import { useToggle } from '../../../hooks/useToggle.js';
import FileUploadModal from './Modals/FileUploadModal.js';

import PencilIcon from '../../../static/images/pencil.svg'
import CheckMark from '../../../static/images/checkmark.svg'
import Cancel from '../../../static/images/cancel.svg'


export default function Itinerary(props) {
    const [fileUploadOpen, toggleFileUploadOpen] = useToggle(false);
    const [tripName, setTripName] = useState("My Trip")
    return (
        <Table responsive striped>
            <Header tripName={tripName} setTripName={setTripName} placeActions={props.placeActions} showMessage={props.showMessage} fileUploadOpen={fileUploadOpen} toggleFileUploadOpen={toggleFileUploadOpen} {...props} />
            <Body places={props.places} placeActions={props.placeActions} {...props}/>
        </Table>
    );

}

function Header(props) {
    const inputRef = useRef();
    const [tempName,setTempName] = useState(props.tripName)
    const [inFocus,setInFocus] = useState(false)

    let totalDistance = 0;
    let distances = (props.distances)? props.distances.distances:[-1];
    distances.map((distItem)=>{totalDistance += distItem})

    let handleFocusOut = (e)=>{
        //If the parent of the clicked item isn't the inputRef div
        if(e && e.path && e.path[1] !== inputRef.current)
            handleSubmit()  
    }
    document.addEventListener('click', handleFocusOut)


    const setFocus = () =>{
        setInFocus(true)
        inputRef.current.focus()
    }
    const handleCancel = () =>{
        setInFocus(false)
        setTempName(props.tripName)
    }
    const handleSubmit = () =>{
        setInFocus(false)
        props.setTripName(tempName)
    }

    let iconStyle = {width:"20px",cursor:"pointer",marginRight:"10px"}

    let buttonLayout;
    if(!inFocus){
        //Shift to the right to make room for the cancel button when rendered so the input doesn't move around
        iconStyle["marginLeft"] = "30px"
        buttonLayout = <img onClick={setFocus} style={iconStyle} src={PencilIcon}/>
    }
    else{
        buttonLayout = (<>
            <img id="submit" style={iconStyle} onClick={handleSubmit} src={CheckMark} />
            <img id="cancel" style={iconStyle} onClick={handleCancel} src={Cancel} />
        </>)
    }

    return (
        <thead>
            <tr>
                <th/>
                <th>
                    <div ref={inputRef}>
                        {buttonLayout}
                        <input onFocus={setFocus} style={{border:"none"}} type="text" onChange={(e)=>setTempName(e.target.value)} value={tempName}/>
                    </div>
                    <dd style={{float:"right"}}>
                        {(totalDistance > 0)&&<>Round Trip : {totalDistance} {(totalDistance = 1)?"mile":"miles"} </>}
                    </dd>
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
                        Distance From Previous : {individualItem.distance} {(individualItem.distance = 1)?"mile":"miles"} 
                    </th>
 
                    <th>
                        Cumulative Distance : {individualItem.total} {(individualItem.total = 1)?"mile":"miles"}
                    </th>
                </small>}
            </td>
            <td>
                <PlaceActionsDropdown {...props} placeActions={props.placeActions} index={props.index} />
            </td>
        </tr>
    );
}