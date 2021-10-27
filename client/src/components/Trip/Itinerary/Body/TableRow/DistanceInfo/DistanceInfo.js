import React from 'react'

const DistanceInfo = (props) =>{
    let individualItem = props.cumalitiveDistances[props.index]
    if(props.distances.distances && props.distances.distances.length > props.index && props.distances.distances.length !== 1){
        return(
            <small>
                <th>
                    {(props.index === props.distances.distances.length-1)?
                        <>Distance to Start </>
                        :
                        <>Distance to Place #{props.index+2} </>
                    }
                    : {individualItem.distance} {(individualItem.distance == 1)?"mile":"miles"} 
                </th>

                <th>
                    Cumulative Distance : {individualItem.total} {(individualItem.total == 1)?"mile":"miles"}
                </th>
            </small>
        )
    }
    return <></>
}

export default DistanceInfo;