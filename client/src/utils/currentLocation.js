import React, { useState, useEffect } from "react";

import { Button, Input, InputGroup, InputGroupAddon, InputGroupText, Label, Row, Col } from "reactstrap";
import Coordinates from 'coordinate-parser';
import { reverseGeocode } from "../../../../utils/reverseGeocode";
import { LOG } from "../../../../utils/constants";


export async function currentLocation (){

    let position = await getPosition(); 
    return {latitude: position.coords.latitude,longitude: position.coords.longitude}

};

function getPosition() {
    // Simple wrapper
    return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej);
    });
}