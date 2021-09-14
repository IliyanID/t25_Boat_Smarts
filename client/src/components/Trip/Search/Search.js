import React, {useState, useRef} from "react";
import {
    InputGroup,
    InputGroupAddon,
    Input,
    Button
} from 'reactstrap';
import {sendAPIRequest} from "../../../utils/restfulAPI";

export default function Search(props) {
    const [userInput, setUserInput] = useState("");

    function handleChange(e) {
        setUserInput(e.target.value)
    };

    function handleClick(e) {
        e.preventDefault();
        const requestBody = findRequestBody();
        const response = sendAPIRequest(requestBody);
    }

    return (
        <>
        <InputGroup>
            <Input value={userInput} onChange={handleChange}/>
            <InputGroupAddon addonType="append">
                <Button onClick={handleClick}>Search</Button>
            </InputGroupAddon>
        </InputGroup>
        </>
    )
}

