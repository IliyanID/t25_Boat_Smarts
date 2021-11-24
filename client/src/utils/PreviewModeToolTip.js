import React from 'react'
import { AiFillInfoCircle } from 'react-icons/ai';
import { useToggle } from '../hooks/useToggle'
import { Tooltip } from 'reactstrap'

export const PreviewModeToolTip = (props) =>{
    return<>
        <AiFillInfoCircle id={`tooltip-preview-mode-${props.id}`}/>
        <MakeToolTip target={`tooltip-preview-mode-${props.id}`} text='
            All site features, 
            except for the map, 
            are temporarily disabled by Preview Mode until the user confirms or denies the optimized trip.'/>
    </>
}

export const MakeToolTip = (props) =>{
    const [tooltip,toggleToolTip] = useToggle(false)
    return  <Tooltip target={props.target} placement={props.placement || 'right'} isOpen={tooltip} toggle={toggleToolTip}> 
                {props.text}
            </Tooltip>
}

export default PreviewModeToolTip