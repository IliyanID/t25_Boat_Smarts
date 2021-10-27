import React from 'react'
import { latLngToText } from '../../../../../utils/transformers';
import { PlaceActionsDropdown } from '../../actions.js';
import '../../../../../static/styles/dragStyles.css'
import reorderIcon from '../../../../../static/images/reorder.png'

const TableRow = (props) => {
    const name = props.place.name ? props.place.name : "-";
    const location = latLngToText(props.place);
    let distances = (props.distances)? props.distances.distances:[-1];

    let cumalitiveDistances = [];
    let runningTotal = 0;
    distances.map((item)=>{runningTotal+=item;cumalitiveDistances.push({total: runningTotal,distance:item})});

    let index = props.index
    if(index == undefined)
        props.places.map((el,ind) => {if(el.name === name)index=ind;} )

    let individualItem = (cumalitiveDistances.length>0)?cumalitiveDistances[index]:[-1]

    return (
        <tr {...props.itemProps}>
            <th scope="row">{index + 1}</th>
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
                <img className='reorder' src={reorderIcon} alt="reorder"/>
                <PlaceActionsDropdown  onClick={()=>console.log("clicked")} {...props} placeActions={props.placeActions} index={index} />
            </td>
        </tr>
    );
}

export default TableRow;