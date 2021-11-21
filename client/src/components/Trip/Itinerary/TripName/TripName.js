import React, { useState, useRef, useEffect, useToggle } from 'react'

import { FaEdit } from 'react-icons/fa';
import CheckMark from '../../../../static/images/checkmark.svg'
import Cancel from '../../../../static/images/cancel.svg'
import { NavItem } from 'reactstrap';

const packageTripName = (props) =>{
    const inputRef = useRef();
    const [tempName,setTempName] = useState(props.tripName)
    const [inFocus,setInFocus] = useState(false)
    return {
        inputRef:inputRef,
        tempName:tempName,setTempName:setTempName,
        inFocus:inFocus,setInFocus:setInFocus
    }
}
let handleFocusOut = (e,allPackages)=>{
    let userDidntPressCheckMark = e && e.path && e.path[1].id !== "inputContainer" && e.path[2].id !== 'inputContainer';
    let userDidntPressSaveButton = e && e.path && e.path[0].innerText != "Save"
    //If the parent of the clicked item isn't the inputRef div
    if(userDidntPressCheckMark && userDidntPressSaveButton){
        handleSubmit(allPackages); 
    }
}

const setFocus = (allPackages) =>{
    allPackages.setInFocus(true)
    allPackages.inputRef.current.focus()
}
const handleCancel = (allPackages) =>{
    allPackages.setInFocus(false)
    allPackages.setTempName(allPackages.tripName)
}
const handleSubmit = (allPackages) =>{
    allPackages.setInFocus(false)
    if(allPackages.inputRef.current && allPackages.tripName !== allPackages.inputRef.current.value){
        printMessage(allPackages);
        allPackages.setTripName(allPackages.inputRef.current.value)
    }
}

const printMessage = (allPackages) =>{
    let message = "Trip Name has been changed from \'" + allPackages.tripName + "\' to \'" + allPackages.inputRef.current.value + "\'.";
    allPackages.showMessage(message,"info");
}
let cancelPackage = [
    {
        id:'submitName',
        onClick:(allPackages)=>handleSubmit(allPackages),
        src:CheckMark
    },
    {
        id:'cancelName',
        onClick:(allPackages)=>handleCancel(allPackages),
        src:Cancel
    }
]

const getButtonLayout = (allPackages) =>{
    let iconStyle = {width:"20px",cursor:"pointer",marginRight:"10px"}
    let buttonLayout;

    if(!allPackages.inFocus){
        //Shift to the right to make room for the cancel button when rendered so the input doesn't move around
        iconStyle["marginLeft"] = "30px"
        buttonLayout = <FaEdit  data-testid="edit" onClick={()=>setFocus(allPackages)} style={iconStyle}/>
    }
    else{
        buttonLayout = cancelPackage.map((item,index)=>{
            return <img key={`${item}-${index}`} data-testid={item.id} style={iconStyle} onClick={()=>item.onClick(allPackages)} src={item.src}></img>
        })
    }
    return buttonLayout;
}

const TripName = (props) =>{
    const states = packageTripName(props)
    const allPackages = {...states,...props}

    useEffect(() => {
        document.addEventListener('click', (e)=>handleFocusOut(e,allPackages))
    },[])

    const buttonLayout = getButtonLayout(allPackages)
    

    return(
        <div style={allPackages.style} id="inputContainer">
            {buttonLayout}
            <input data-testid="input" ref={allPackages.inputRef} onFocus={()=>setFocus(allPackages)} style={{border:"none"}} type="text" onChange={(e)=>allPackages.setTempName(e.target.value)} value={allPackages.tempName}/>
        </div>
    )
    
}

export default TripName;