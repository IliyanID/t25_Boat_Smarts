import React from 'react'

const DistanceInfo = (props) =>{
    let individualItem = props.cumalitiveDistances[props.index]
    let distances = props.distances.distances

    const unit = (item) =>{
        if(item == 1)
            return item + ' mile'
   
        return item + ' miles'
    }
    
    if(distances && distances.length > props.index && distances.length !== 1){
        let individualDistanceText = 'Distance to Start'
        if(props.index === distances.length - 1)
            individualDistanceText = 'Distance to Place #' + (props.index + 2)
            
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
    return <></>
}

export default DistanceInfo;