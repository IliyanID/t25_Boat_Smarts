import React from 'react'
import { latLngToText } from '../../../../../utils/transformers';
import { PlaceActionsDropdown } from '../../actions.js';
import reorderIcon from '../../../../../static/images/reorder.png'

const TableRow = (props) => {
    const name = props.place.name ? props.place.name : "-";
    const location = latLngToText(props.place);
    let distances = (props.distances)? props.distances.distances:[-1];
    
    let index = props.index
    if(props.index === undefined)
        props.places.map((item,idx)=>{if(item.name == props.place.name)index = idx})


    let cumalitiveDistances = [];
    let runningTotal = 0;
    distances.map((item)=>{runningTotal+=item;cumalitiveDistances.push({total: runningTotal,distance:item})});


    let individualItem = (cumalitiveDistances.length>0)?cumalitiveDistances[index]:[-1]


    return (
    <tr style={{minWidth:'900px'}} {...props.itemProps}>
        <th  scope="row">{index + 1}</th>
        <td>
            {name}
            <br/>
            <small className="text-muted">{location}</small>
            <br/>
            {(distances.length > index && distances.length !== 1)&&
            <small>
                <th>
                    {(index === distances.length-1)?
                        <>Distance to Start </>
                        :
                        <>Distance to Place #{index+2} </>
                    }
                    : {individualItem.distance} {(individualItem.distance == 1)?"mile":"miles"} 
                </th>

                <th>
                    Cumulative Distance : {individualItem.total} {(individualItem.total == 1)?"mile":"miles"}
                </th>
            </small>}
        </td>

            <td>
                <img src={reorderIcon} alt="drager"/>
                <button style={{border:'none',background:'none'}}><PlaceActionsDropdown {...props} placeActions={props.placeActions} index={index} /> </button>
            </td>


    </tr>
    );
}

export default TableRow;  