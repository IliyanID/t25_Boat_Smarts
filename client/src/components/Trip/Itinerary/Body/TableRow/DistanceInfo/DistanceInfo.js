import React from 'react'

const DistanceInfo = (props) =>{
    let individualItem = props.cumalitiveDistances[props.index]
    let distances = props.distances.distances

    const unit = (item) =>{
        if(item == 1)
            return item + ' mile'
   
        return item + ' miles'
    }
    
    if(!distances || !(distances.length > props.index) || !(distances.length !== 1))
        return <></>

    let individualDistanceText = 'Distance to Place #' + (props.index + 2)
    if(props.index === distances.length - 1)
        individualDistanceText = 'Distance to Start'

    return(
        <small>
            <th>  
                {individualDistanceText} : {unit(individualItem.distance)} 
            </th>

            <th>
                Cumulative Distance : {unit(individualItem.total)}
            </th>
        </small>
    ) 
}

export default DistanceInfo;