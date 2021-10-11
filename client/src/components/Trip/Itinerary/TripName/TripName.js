import React, { useState, useRef } from 'react'

import PencilIcon from '../../../../static/images/pencil.svg'
import CheckMark from '../../../../static/images/checkmark.svg'
import Cancel from '../../../../static/images/cancel.svg'

const TripName = (props) =>{
    const inputContainer = useRef();
    const inputRef = useRef();
    const [tempName,setTempName] = useState(props.tripName)
    const [inFocus,setInFocus] = useState(false)

    let handleFocusOut = (e)=>{
        //If the parent of the clicked item isn't the inputRef div
        if(e && e.path && e.path[1] !== inputContainer.current)
            handleSubmit()  
    }
    document.addEventListener('click', handleFocusOut)

    const setFocus = () =>{
        setInFocus(true)
        inputRef.current.focus()
    }
    const handleCancel = () =>{
        setInFocus(false)
        setTempName(props.tripName)
    }
    const handleSubmit = () =>{
        setInFocus(false)
        props.setTripName(tempName)
    }

    let iconStyle = {width:"20px",cursor:"pointer",marginRight:"10px"}

    let buttonLayout;
    if(!inFocus){
        //Shift to the right to make room for the cancel button when rendered so the input doesn't move around
        iconStyle["marginLeft"] = "30px"
        buttonLayout = <img onClick={setFocus} style={iconStyle} src={PencilIcon}/>
    }
    else{
        buttonLayout = (<>
            <img id="submit" style={iconStyle} onClick={handleSubmit} src={CheckMark} />
            <img id="cancel" style={iconStyle} onClick={handleCancel} src={Cancel} />
        </>)
    }

    return(
        <div ref={inputContainer}>
            {buttonLayout}
            <input ref={inputRef} onFocus={setFocus} style={{border:"none"}} type="text" onChange={(e)=>setTempName(e.target.value)} value={tempName}/>
        </div>
    )
    
}

export default TripName;