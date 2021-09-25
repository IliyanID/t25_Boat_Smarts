import React, {useState, useEffect} from "react";
import {Col, Label, Input} from 'reactstrap';


export default function DMS(props) {
    const coordString = props.coordType;
    const [degrees, setDegrees] = useState("");
    const [minutes, setMinutes] = useState("");
    const [seconds, setSeconds] = useState("");
    
    function handleDegreeChange(e) {
        setDegrees(e.target.value);
    }

    function handleMinuteChange(e) {
        setMinutes(e.target.value);
    }

    function handleSecondChange(e) {
        setSeconds(e.target.value);
    }

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
        const decimal = parseFloat(degrees) + parseFloat(minutes)/60 + parseFloat(seconds)/3600;
        return decimal.toString();
    }

    return (
        <Col sm="12" md="6" className="mb-1 mt-2">
            <Label for="coordinate">{coordString}:</Label>
            <Input
                className=""
                id="degrees"
                name="degrees"
                value={degrees}
                onChange={handleDegreeChange}
                placeholder="Degrees"
            />
            <Input
                id="minutes"
                name="minutes"
                value={minutes}
                onChange={handleMinuteChange}
                placeholder="Minutes"
            />
            <Input
                id="seconds"
                name="seconds"
                value={seconds}
                onChange={handleSecondChange}
                placeholder="Seconds"
            />
        </Col>
    );
}