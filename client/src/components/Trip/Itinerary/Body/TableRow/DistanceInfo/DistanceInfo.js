import React from 'react'

const DistanceInfo = (props) =>{
    const unit = (item) =>{
        if(item == 1)
            return item + ' mile'
        else    
            return item + ' miles'
    }

    let individualItem = props.cumalitiveDistances[props.index]
    let distances = props.distances.distances
    if(distances && distances.length > props.index && distances.length !== 1){
        return(
            <small>
                <th>
                    {(props.index === distances.length-1)?
                        <>Distance to Start </>
                        :
                        <>Distance to Place #{props.index+2} </>
                    }
                    : {unit(individualItem.distance)} 
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