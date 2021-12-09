import React from 'react';
import { useToggle } from '../../../../hooks/useToggle'
import RoundTrip from '../../../../static/images/round-trip.png'
import TripName from '../TripName/TripName'
import { Tooltip } from 'reactstrap'

import prettyNum, {PRECISION_SETTING} from 'pretty-num';
const Header = (props) => {
    const [toolTip,toggleToolTip] = useToggle(false)
    return (
        <thead>
            <tr>
                <th/>
                <th>
                    <TripName style={{float:'left'}} key={props.tripName} showMessage={props.showMessage} {...props}/>
                    
                </th>
                <th>
               {
                    (props.totalDistance > 0)?
                        <div> 
                            <img style={{float:'right',height:'20px',margin:'5px'}} src={RoundTrip} alt='round-trip'/>
                            <div id='round-trip' style={{float:'right'}}>{prettyNum(props.totalDistance,{thousandsSeparator:','})} {localStorage.getItem("fileUnitsName") != null ? localStorage.getItem("fileUnitsName") : "Miles"}</div>
                            <Tooltip toggle={toggleToolTip} isOpen={toolTip} placement='bottom' target='round-trip'>Round Trip</Tooltip>
                        </div>:<></>
                        
                    }
                    
                    
                
                </th>
            </tr>
        </thead>
    );
}

export default Header