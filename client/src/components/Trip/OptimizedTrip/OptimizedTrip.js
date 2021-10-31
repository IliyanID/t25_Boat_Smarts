import React, { useRef, useEffect } from 'react'
import { useToggle } from '../../../hooks/useToggle';
import { Button, Tooltip } from 'reactstrap';
import { AiFillInfoCircle } from 'react-icons/ai';
import '../../../static/styles/focus.css'

const OptimizedTrip = (props) =>{
    let firstMount = useRef(true);
    let blockerRef = useRef();
    let buttonsRef = useRef();
    const hanleConfirm = () =>{
        props.togglePreviewTripFocus()
    }
    
    const handleReject = () =>{
        props.togglePreviewTripFocus();
        props.setPlaces(props.origionalPlaces)
    }

    let [toolTip,toggleToolTip] = useToggle(false)

    useEffect(()=>{
        if(firstMount.current)
            return
        if(props.previewTripFocus){
            blockerRef.current.classList = 'focus';
            buttonsRef.current.classList = 'OptimizationOption'
        }
        else{
            blockerRef.current.classList = 'notInFocus';
            buttonsRef.current.classList = 'OptimizationOptionHide'
        }
    },[props.previewTripFocus])

    useEffect(()=>{
        firstMount.current = false;
    },[])

    return  <>
                <div ref={blockerRef}/>
                <div ref={buttonsRef} className='OptimizationOptionDefault'>
                        <div className='OptimizedHeader'>
                            <h3>Planner is in Preview Mode</h3>
                            <AiFillInfoCircle id='previewMode'/>
                            <Tooltip placement="right" isOpen={toolTip} toggle={toggleToolTip} target='previewMode'>All site features, except for the map, are temporarily disabled until the user confirms or denies the optimized trip.</Tooltip>
                        </div>
                        <Button color="primary" onClick={hanleConfirm}>Confirm Optimized Trip</Button>
                        <Button color="secondary" onClick={handleReject}>Revert to Origional Trip</Button>
                </div>
            </>
}



export default OptimizedTrip;