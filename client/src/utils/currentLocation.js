import { useState } from "react";
import { DEFAULT_STARTING_PLACE } from "./constants";

export function currentLocation (showMessage){

    const [latitude, setCurrLatitude] = useState(null);
    const [longitude, setCurrLongitude] = useState(null);

    if (!window.navigator.geolocation){
    }else{
            window.navigator.geolocation.getCurrentPosition(
                position => {
                    setCurrLatitude(position.coords.latitude);
                    setCurrLongitude(position.coords.longitude);
                },
                error => {
                    let message = error.message + " Please turn it on and reload the page.";
                    showMessage(message,"warning");
                }
                );
    }
    return {latitude,longitude};
};
