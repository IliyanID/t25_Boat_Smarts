import React from 'react';
import FileDownloadModal from '../Modals/FileDownloadModal.js';
import { ItineraryActionsDropdown } from '../actions.js';
import TripName from '../TripName/TripName'

const Header = (props) => {
    return (
        <thead>
            <tr>
                <th/>
                <th>
                    <TripName key={props.tripName} {...props}/>
                    <dd style={{float:"right"}}>
                        {(props.totalDistance > 0)&&<>Round Trip : {props.totalDistance} {(props.totalDistance == 1)?"mile":"miles"} </>}
                    </dd>
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