import { useState } from "react";
import { DEFAULT_STARTING_PLACE } from "./constants";

export async function currentLocation (){

    let latitude = null
    let longitude = null

    if (!window.navigator.geolocation){
    }else{
            let position = await getPosition(); 
            console.log(position)
            return {latitude: position.coords.latitude,longitude: position.coords.longitude}
    }
    return {latitude,longitude};
};

function getPosition() {
    // Simple wrapper
    return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej);
    });
}
