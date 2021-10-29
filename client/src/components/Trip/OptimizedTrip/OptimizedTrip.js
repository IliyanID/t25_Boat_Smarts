import React, { useRef } from 'react'
import { useToggle } from '../../../hooks/useToggle';
import { Button, Tooltip } from 'reactstrap';
import { AiFillInfoCircle } from 'react-icons/ai';
import '../../../static/styles/focus.css'

const OptimizedTrip = (props) =>{
    const hanleConfirm = () =>{
        props.togglePreviewTripFocus()
    }
    
    const handleReject = () =>{
        props.togglePreviewTripFocus();
        props.setPlaces(props.origionalPlaces)
    }

    let [toolTip,toggleToolTip] = useToggle(false)

    let titleRef = useRef()
    if(props.previewTripFocus)
        titleRef.current.scrollIntoView({behavior:'smooth',block:'center'})

    return  <>
				<div ref={titleRef} className={(props.previewTripFocus)?'focus':'notFocus'}/>

                {(props.previewTripFocus)&&
                <div className='OptimizationOption'>
                        <div className='OptimizedHeader'>
                            <h3>Planner is in Preview Mode</h3>
                            <AiFillInfoCircle id='previewMode'/>
                            <Tooltip placement="right" isOpen={toolTip} toggle={toggleToolTip} target='previewMode'>All site features except for the map are temporarly disabled until the user confirms or denies the optimized trip.</Tooltip>
                        </div>
                        <Button color="primary" onClick={hanleConfirm}>Confirm Optimized Trip</Button>
                        <Button color="secondary" onClick={handleReject}>Revert to Origional Trip</Button>
                </div>}
            </>
}



export default OptimizedTrip;