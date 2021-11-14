import React, { useState } from 'react'
import {Tooltip } from 'reactstrap';
import { latLngToText } from '../../../../../utils/transformers';
import { PlaceActionsDropdown, toggle } from '../../actions.js';
import reorderIcon from '../../../../../static/images/reorder.png'
import DistanceInfo from './DistanceInfo/DistanceInfo'

const handleSelect = (props,containerPackage)=>{
    if(props.selectedIndex === containerPackage.index){
        props.placeActions.selectIndex(-1)
        return;
    }
    props.placeActions.selectIndex(containerPackage.index);
    /*window.scrollTo({
                top: 0,
                behavior: 'smooth'
              })*/
    containerPackage.setToolTip(containerPackage.defaultArr)
    props.setCenterView(!props.centerView)

}

const TableRow = (props) => {
    const name = props.place.name ? props.place.name : "-";
    const location = latLngToText(props.place);
   
    let componentIsDragged = props.index === undefined; 
    let index = props.index
    if(componentIsDragged)
        props.places.map((item,idx)=>{if(item.lat == props.place.lat && item.lng == item.lng)index = idx})

    let defaultArr = new Array(2).fill(false)
    const [toolTip,setToolTip] = useState(defaultArr)
    let containerPackage = {toolTip,setToolTip,defaultArr,index,defaultArr}
  

    let noStyleButton = {border:'none',background:'none'}
    return (
    <tr className={(props.selectedIndex == index) ? 'selectedPlace':'notSelected' + ' selectedRow'} {...props.itemProps}>
        <th className='tripNumber' scope="row">{index + 1} 
        </th>
        <td className='tripDetails'>
            <button id={`trip-focus-${index}`} onClick={()=>handleSelect(props,containerPackage)} style={noStyleButton}>{name}</button>
            <br/>
            <small className="text-muted">{location}</small>
            <br/>
            <DistanceInfo componentIsDragged={componentIsDragged} index={index} {...props}/>
        </td>
        <td className='tripIcons'>
            <img  src={reorderIcon} id={`dragger-${index}`} alt={`dragger-${index}`}/>
                <Tooltip placement="left" isOpen={toolTip[1]} target={`dragger-${index}`} toggle={()=>toggle(1,toolTip,setToolTip)}>
                            Drag to re-order trip
                </Tooltip>
            <button style={noStyleButton}><PlaceActionsDropdown {...props} placeActions={props.placeActions} index={index} /> </button>
        </td>
    </tr>
    );
}

export default TableRow;  