import React from 'react'
import {CgArrowsShrinkV} from 'react-icons/cg'
import { RiArrowGoForwardLine, RiArrowGoBackLine } from 'react-icons/ri'

const DistanceInfo = (props) =>{
    let individualItem = props.cumalitiveDistances[props.index]
    let distances = props.distances.distances

    if(!distances || !(distances.length > props.index) || !(distances.length !== 1))
        return <></>

    let individualDistanceText = 'Distance to Place #' + (props.index + 2)
    if(props.index === distances.length - 1)
        individualDistanceText = 'Distance to Start'

    return(
        <>
            
            <div className={(props.componentIsDragged)?'draggedDistance':'invdividualDistance' + ' distances'}>
                <div className='distancesContainer'>
                    {(props.index !== distances.length - 1)?
                        <>
                            <CgArrowsShrinkV size={30}/>
                                <div className='unitContainer'>{unit(individualItem.distance)}</div>
                            <CgArrowsShrinkV size={30}/>
                        </>
                        :
                        <>

                        <RiArrowGoForwardLine size={30} style={{transform:'rotate(270deg)'}}/>
                            <div className='unitContainer'>{unit(individualItem.distance)} to start</div>
                        <RiArrowGoBackLine size={30} style={{transform:'rotate(90deg)'}}/>
                        </>
                    }
                </div>

            </div>
            <br/>
        </>
   ) 
}
const unit = (item) =>{
    if(item == 1)
        return item + ' mile'

    return item + ' miles'
}
export default DistanceInfo;