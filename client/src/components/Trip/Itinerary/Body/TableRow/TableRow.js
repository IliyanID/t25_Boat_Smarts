import React, { useState } from 'react'
import {Tooltip } from 'reactstrap';
import { latLngToText } from '../../../../../utils/transformers';
import { PlaceActionsDropdown } from '../../actions.js';
import reorderIcon from '../../../../../static/images/reorder.png'
import DistanceInfo from './DistanceInfo/DistanceInfo'

const TableRow = (props) => {
    const name = props.place.name ? props.place.name : "-";
    const location = latLngToText(props.place);
   
    
    let index = props.index
    if(props.index === undefined)
        props.places.map((item,idx)=>{if(item.name == props.place.name)index = idx})

    const [toolTip,setToolTip] = useState(false)
    return (
    <tr style={{minWidth:'900px'}} {...props.itemProps}>
        <th  scope="row">{index + 1}</th>
        <td>
            {name}
            <br/>
            <small className="text-muted">{location}</small>
            <br/>
            <DistanceInfo index={index} {...props}/>
        </td>
        <td style={{display:'flex',float:'right'}}>
            <img  src={reorderIcon} id={`dragger-${index}`} alt={`dragger-${index}`}/>
                <Tooltip placement="left" isOpen={toolTip} target={`dragger-${index}`} toggle={()=>setToolTip(!toolTip)}>
                            Drag to re-order trip
                </Tooltip>
            <button style={{border:'none',background:'none'}}><PlaceActionsDropdown {...props} placeActions={props.placeActions} index={index} /> </button>
        </td>
    </tr>
    );
}

export default TableRow;  