import React, { useRef, useEffect } from 'react'
import { useToggle } from '../../../hooks/useToggle';
import { Button, Collapse, Tooltip } from 'reactstrap';
import { AiFillInfoCircle } from 'react-icons/ai';
import '../../../static/styles/focus.css'
import { FaHandMiddleFinger } from 'react-icons/fa';

const packageRefs = () =>{
    let firstMount = useRef(true);
    let blockerRef = useRef();
    let buttonsRef = useRef();
    let [toolTip,toggleToolTip] = useToggle(false)
    const [isOpen, toggleOpen] = useToggle(false);
    return {
        firstMount,
        blockerRef,
        buttonsRef,
        toolTip,toggleToolTip,
        isOpen,toggleOpen
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
            allPackages.buttonsRef.current.classList = 'OptimizationOption';
            allPackages.toggleOpen();
        }
        else{
            allPackages.blockerRef.current.classList = 'notInFocus';
            allPackages.buttonsRef.current.classList = 'OptimizationOptionHide';
            allPackages.toggleOpen();
        }
    },[allPackages.previewTripFocus])

}

const OptimizedTrip = (props) =>{
    const allRefs = packageRefs()
    const allPackages ={...allRefs,...props}
    handlePreviewFocus(allPackages) 


    if(allPackages.disablePreviewMode)
            hanleConfirm(allPackages)
    return  <Collapse isOpen={allPackages.isOpen}>
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
            </Collapse>
}



export default OptimizedTrip;