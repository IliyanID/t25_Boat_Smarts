import { useState } from "react";
import { DEFAULT_STARTING_PLACE } from "./constants";

export function currentLocation (showMessage,setCurrLatitude,setCurrLongitude){

    
    if (!window.navigator.geolocation){
    }else{
            window.navigator.geolocation.getCurrentPosition(
                position => {
                    setCurrLatitude(position.coords.latitude);
                    setCurrLongitude(position.coords.longitude);
                },
                error => {
                    let message = error.message;
                    showMessage(message,"warning");
                }
                );
    }
            
};
