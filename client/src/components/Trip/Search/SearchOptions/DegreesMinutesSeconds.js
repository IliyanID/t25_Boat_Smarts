import React, {useState, useEffect} from "react";
import {Col, Label, InputGroup, Input, InputGroupAddon, InputGroupText} from 'reactstrap';


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
        const d = degrees !== "" ? parseFloat(degrees) : 0;
        const m = minutes !== "" ? parseFloat(minutes) : 0;
        const s = seconds !== "" ? parseFloat(seconds) : 0;
        const decimal = d + m/60 + s/3600;
        return decimal.toString();
    }

    return (
        <>
        
        <Col className="mb-1 pr-0">
            <InputGroup size="small">
            <Input
                className="pr-0"
                id="degrees"
                name="degrees"
                value={degrees}
                onChange={handleDegreeChange}
                placeholder="Degrees"
            />
            <InputGroupAddon addonType="append">
                <InputGroupText>&#176;</InputGroupText>
            </InputGroupAddon>
            </InputGroup>
        </Col>
        <Col className="mb-1 px-0 px-sm-1 px-md-2">
            <InputGroup size="small">
            <Input
                className="pr-0"
                id="minutes"
                name="minutes"
                value={minutes}
                onChange={handleMinuteChange}
                placeholder="Minutes"
            />
            <InputGroupAddon addonType="append">
                <InputGroupText>'</InputGroupText>
            </InputGroupAddon>
            </InputGroup>
        </Col>
        <Col className="mb-1 pl-0">
            <InputGroup size="small">
            <Input
                className="pr-0"
                id="seconds"
                name="seconds"
                value={seconds}
                onChange={handleSecondChange}
                placeholder="Seconds"
            />
            <InputGroupAddon addonType="append">
                <InputGroupText>"</InputGroupText>
            </InputGroupAddon>
            </InputGroup>
        </Col>
        </>
    );
}