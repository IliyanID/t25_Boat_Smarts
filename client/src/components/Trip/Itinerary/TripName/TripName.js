import React, { useState, useRef, useEffect, useToggle } from 'react'

import { FaEdit } from 'react-icons/fa';
import CheckMark from '../../../../static/images/checkmark.svg'
import Cancel from '../../../../static/images/cancel.svg'

const TripName = (props) =>{
    const inputRef = useRef();
    const [tempName,setTempName] = useState(props.tripName)
    const [inFocus,setInFocus] = useState(false)
    const [infoMessage, setInfoMessage] = useState(true)



    let handleFocusOut = (e)=>{
        let userDidntPressCheckMark = e && e.path && e.path[1].id !== "inputContainer";
        let userDidntPressSaveButton = e && e.path && e.path[0].innerText != "Save"
        //If the parent of the clicked item isn't the inputRef div
        if(userDidntPressCheckMark && userDidntPressSaveButton && infoMessage){
            if(props.tripName !== inputRef.current.value)
                printMessage();
            handleSubmit(); 
        }
    }
    useEffect(() => {
        document.addEventListener('click', handleFocusOut)
    },[])

    const setFocus = () =>{
        setInFocus(true)
        setInfoMessage(false)
        inputRef.current.focus()
    }
    const handleCancel = () =>{
        setInFocus(false)
        setTempName(props.tripName)
    }
    const handleSubmit = () =>{
        if(inFocus !== false)
            setInFocus(false)
        if(props.tripName !== inputRef.current.value){
            props.setTripName(inputRef.current.value)
            printMessage();
        }
    }

    const printMessage = () =>{
        let message = "Trip Name has been changed from \'" + props.tripName + "\' to \'" + inputRef.current.value + "\'.";
        props.showMessage(message,"info");
    }

    let iconStyle = {width:"20px",cursor:"pointer",marginRight:"10px"}

    let buttonLayout;
    if(!inFocus){
        //Shift to the right to make room for the cancel button when rendered so the input doesn't move around
        iconStyle["marginLeft"] = "30px"
        buttonLayout = <FaEdit  data-testid="edit" onClick={setFocus} style={iconStyle}/>
    }
    else{
        buttonLayout = (<>
            <img data-testid="submitName" id="submit" style={iconStyle} onClick={handleSubmit} src={CheckMark} />
            <img data-testid="cancelName" id="cancel" style={iconStyle} onClick={handleCancel} src={Cancel} />
        </>)
    }

    return(
        <div id="inputContainer">
            {buttonLayout}
            <input data-testid="input" ref={inputRef} onFocus={setFocus} style={{border:"none"}} type="text" onChange={(e)=>setTempName(e.target.value)} value={tempName}/>
        </div>
    )
    
}

export default TripName;