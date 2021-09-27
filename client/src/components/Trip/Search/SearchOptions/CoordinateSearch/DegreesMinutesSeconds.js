import React, { useState, useEffect } from "react";
import SingleInput from "./SingleInput";

export default function DMS(props) {
    const coordString = props.coordType;
    const [degrees, setDegrees] = useState("");
    const [minutes, setMinutes] = useState("");
    const [seconds, setSeconds] = useState("");

    useEffect(() => {
        setCoord();
    }, [degrees, minutes, seconds]);

    function setCoord() {
        const decimalDegrees = toDecimalDegrees();
        if (coordString === "Latitude") {
            props.setLatitude(decimalDegrees);
        } else {
            props.setLongitude(decimalDegrees);
        }
    }

    function toDecimalDegrees() {
        const d = degrees !== "" ? parseFloat(degrees) : 0;
        const m = minutes !== "" ? parseFloat(minutes) : 0;
        const s = seconds !== "" ? parseFloat(seconds) : 0;
        const decimal = d + m/60 + s/3600;
        return decimal.toString();
    }

    return (
        <>
            <SingleInput classes="mb-1 pr-1" inputType="Degrees" inputSymbol="&#176;" inputValue={degrees} handleValueChange={e => {setDegrees(e.target.value)}} />
            <SingleInput classes="mb-1 px-1 px-sm-2 px-md-3 px-lg-4" inputType="Minutes" inputSymbol="'" inputValue={minutes} handleValueChange={e => {setMinutes(e.target.value)}} />
            <SingleInput classes="mb-1 pl-1" inputType="Seconds" inputSymbol='"' inputValue={seconds} handleValueChange={e => {setSeconds(e.target.value)}} />
        </>
    );
}