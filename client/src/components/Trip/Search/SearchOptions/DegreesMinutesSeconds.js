import React, { useState, useEffect } from "react";
import { Col, Label, InputGroup, Input, InputGroupAddon, InputGroupText } from 'reactstrap';


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
        const decimal = parseFloat(degrees) + parseFloat(minutes) / 60 + parseFloat(seconds) / 3600;
        return decimal.toString();
    }

    return (
        <>
            <SingleInput classes="mb-1 pr-0" inputType="Degrees" inputSymbol="&#176;" inputValue={degrees} handleValueChange={handleDegreeChange} />
            <SingleInput classes="mb-1 px-0 px-sm-1 px-md-2" inputType="Minutes" inputSymbol="'" inputValue={minutes} handleValueChange={handleMinuteChange} />
            <SingleInput classes="mb-1 pl-0" inputType="Seconds" inputSymbol='"' inputValue={seconds} handleValueChange={handleSecondChange} />
        </>
    );
}

function SingleInput(props) {
    return (
        <Col className={props.classes}>
            <InputGroup size="small">
                <Input
                    className="pr-0"
                    value={props.inputValue}
                    onChange={props.handleValueChange}
                    placeholder={props.inputType}
                />
                <InputGroupAddon addonType="append">
                    <InputGroupText>{props.inputSymbol}</InputGroupText>
                </InputGroupAddon>
            </InputGroup>
        </Col>
    );
}