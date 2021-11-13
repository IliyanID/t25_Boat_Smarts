import React from 'react';
import { useToggle } from '../../../../hooks/useToggle'
import FileDownloadModal from '../Modals/FileDownloadModal.js';
import RoundTrip from '../../../../static/images/round-trip.png'
import { ItineraryActionsDropdown } from '../actions.js';
import TripName from '../TripName/TripName'
import { Tooltip } from 'reactstrap'
const Header = (props) => {
    const [toolTip,toggleToolTip] = useToggle(false)
    return (
        <thead>
            <tr>
                <th/>
                <th>
                    <TripName style={{float:'left'}} key={props.tripName} showMessage={props.showMessage} {...props}/>
                    {
                    (props.totalDistance > 0)?
                        <div> 
                            <img style={{float:'right',height:'20px',margin:'5px'}} src={RoundTrip} alt='round-trip'/>
                            <div id='round-trip' style={{float:'right'}}>{props.totalDistance} {(props.totalDistance === 1)?"mile":"miles"}</div>
                            <Tooltip toggle={toggleToolTip} isOpen={toolTip} placement='bottom' target='round-trip'>Round Trip</Tooltip>
                        </div>:<></>
                        
                    }
                </th>
                
                <th>
                    <ItineraryActionsDropdown placeActions={props.placeActions} showMessage={props.showMessage} {...props}/>
                    <FileDownloadModal {...props}/>
                </th>
            </tr>
        </thead>
    );
}

export default Header