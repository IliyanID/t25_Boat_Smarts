import React from 'react'
import {Tooltip } from 'reactstrap';
import { useToggle } from '../../../../../hooks/useToggle'
import { latLngToText } from '../../../../../utils/transformers';
import { PlaceActionsDropdown } from '../../actions.js';
import reorderIcon from '../../../../../static/images/reorder.png'
import DistanceInfo from './DistanceInfo/DistanceInfo'

const handleSelect = (props,containerPackage)=>{
    if(props.selectedIndex === containerPackage.index){
        props.placeActions.selectIndex(-1)
        return;
    }
    props.placeActions.selectIndex(containerPackage.index);
    props.setCenterView(!props.centerView)

}

const TableRow = (props) => {
    const name = props.place.name ? props.place.name : "-";
    const location = latLngToText(props.place);
   
    let componentIsDragged = props.index === undefined; 
    let index = props.index
    if(componentIsDragged)
        props.places.map((item,idx)=>{if(item.lat == props.place.lat && item.lng == item.lng)index = idx})

    const [toolTip,toggleToolTip] = useToggle(false)
    let containerPackage = {toolTip,toggleToolTip, index}


    let noStyleButton = {border:'none',background:'none'}
    return (
    <tr className={(props.selectedIndex == index) ? 'selectedPlace':'notSelected' + ' selectedRow'} {...props.itemProps}>
        <th className='tripNumber' scope="row">{index + 1} </th>
        <td className='tripDetails'>
            <button id={`trip-focus-${index}`} onClick={()=>handleSelect(props,containerPackage)} style={noStyleButton}>{name}</button>
            <br/><small className="text-muted">{location}</small><br/>
            <DistanceInfo componentIsDragged={componentIsDragged} index={index} {...props}/>
        </td>
        <td className='tripIcons'>
            <img  src={reorderIcon} id={`dragger-${index}`} alt={`dragger-${index}`}/>
                <Tooltip placement="bottom" isOpen={toolTip} target={`dragger-${index}`} toggle={toggleToolTip}>Drag to Re-Order Trip</Tooltip>
            <button style={noStyleButton}><PlaceActionsDropdown {...props} placeActions={props.placeActions} index={index} /> </button>
        </td>
    </tr>
    );
}

export default TableRow;  