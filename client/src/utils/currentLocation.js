import { useState } from "react";
import { DEFAULT_STARTING_PLACE } from "./constants";

export function currentLocation (showMessage,append){

    const [latitude, setCurrLatitude] = useState(DEFAULT_STARTING_PLACE.latitude);
    const [longitude, setCurrLongitude] = useState(DEFAULT_STARTING_PLACE.longitude);

    window.navigator.geolocation.getCurrentPosition(
        position => {
            setCurrLatitude(position.coords.latitude);
            setCurrLongitude(position.coords.longitude);
            append({latitude,longitude});
        },
        error => {
            let message = error.message;
            showMessage(message,"warning");
        }
    );          
};
