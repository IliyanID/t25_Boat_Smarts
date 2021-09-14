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
    const [searchResults, setSearchResults] = useState({});
    const currentURL = useRef();

    function handleChange(e) {
        setUserInput(e.target.value)
    };

    function handleClick(e) {
        e.preventDefault();
        const requestBody = findRequestBody();
        const response = sendAPIRequest(requestBody, currentURL + '/api/find');
        setSearchResults(response);
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

