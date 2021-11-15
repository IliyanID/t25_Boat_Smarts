import React, { useRef, useEffect } from 'react'
import { useToggle } from '../../../hooks/useToggle';
import { Button, Tooltip } from 'reactstrap';
import { AiFillInfoCircle } from 'react-icons/ai';
import '../../../static/styles/focus.css'

const packageRefs = () =>{
    let firstMount = useRef(true);
    let blockerRef = useRef();
    let buttonsRef = useRef();
    let [toolTip,toggleToolTip] = useToggle(false)
    return {
        firstMount,
        blockerRef,
        buttonsRef,
        toolTip,toggleToolTip
    }
}

const hanleConfirm = (allPackages) =>{
    if(allPackages.previewTripFocus)
        allPackages.togglePreviewTripFocus()
}

const handleReject = (allPackages) =>{
    allPackages.togglePreviewTripFocus();
    allPackages.setAllPlaces(allPackages.origionalPlaces)
}

const handlePreviewFocus = (allPackages)=>{
    return    useEffect(()=>{
        if(allPackages.firstMount.current)
            allPackages.firstMount.current = false;
        else if(allPackages.previewTripFocus && !allPackages.disablePreviewMode){
            allPackages.blockerRef.current.classList = 'focus';
            allPackages.buttonsRef.current.classList = 'OptimizationOption'
        }
        else{
            allPackages.blockerRef.current.classList = 'notInFocus';
            allPackages.buttonsRef.current.classList = 'OptimizationOptionHide'
        }
    },[allPackages.previewTripFocus])

}

const OptimizedTrip = (props) =>{
    const allRefs = packageRefs()
    const allPackages ={...allRefs,...props}
    handlePreviewFocus(allPackages) 


    if(allPackages.disablePreviewMode)
            hanleConfirm(allPackages)
    return  <>
                <div ref={allPackages.blockerRef} data-testid='blocker'/>
                <div ref={allPackages.buttonsRef} className='OptimizationOptionDefault'>
                        <div className='OptimizedHeader'>
                            <h3>Planner is in Preview Mode</h3>
                            <AiFillInfoCircle id='previewMode'/>
                            <Tooltip placement="right" isOpen={allPackages.toolTip} toggle={allPackages.toggleToolTip} target='previewMode'>All site features, except for the map, are temporarily disabled until the user confirms or denies the optimized trip.</Tooltip>
                        </div>
                        <Button color="primary" onClick={()=>hanleConfirm(allPackages)} data-testid='ConfirmTrip'>Confirm Optimized Trip</Button>
                        <Button color="secondary" onClick={()=>handleReject(allPackages)} data-testid='DenyTrip'>Revert to Origional Trip</Button>
                </div>
            </>
}



export default OptimizedTrip;
