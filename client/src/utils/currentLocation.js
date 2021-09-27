import { useState } from "react";
import { DEFAULT_STARTING_PLACE } from "./constants";

export function CurrentLocation (showMessage){

    const [latitude, setLatitude] = useState(DEFAULT_STARTING_PLACE.latitude);
    const [longitude, setLongitude] = useState(DEFAULT_STARTING_PLACE.longitude);
    
    if (!window.navigator.geolocation){
            //ToDo
            //Add popup for if the users browser doesnt have location services turned on
    }else{
            window.navigator.geolocation.getCurrentPosition(
                position => {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                },
                error => {
                    let message = error.message
                    showMessage(message,"warning")
                }
                );
    }
    return { latitude, longitude }
            
};
