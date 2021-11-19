import React from 'react'
import { AiFillInfoCircle } from 'react-icons/ai';
import { useToggle } from '../hooks/useToggle'
import { Tooltip } from 'reactstrap'

export const PreviewModeToolTip = (props) =>{
    const [tooltip,toggleToolTip] = useToggle(false);

    return<>
        <AiFillInfoCircle id={`tooltip-preview-mode-${props.id}`}/>
        <Tooltip placement='right' isOpen={tooltip} toggle={toggleToolTip} target={`tooltip-preview-mode-${props.id}`}>
            All site features, 
            except for the map, 
            are temporarily disabled by Preview Mode until the user confirms or denies the optimized trip.
        </Tooltip>
    </>
}

export default PreviewModeToolTip