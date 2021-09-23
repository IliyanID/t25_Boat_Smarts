import React, {useEffect, useState} from "react";
import {
    InputGroup,
    InputGroupAddon,
    Input,
    Button
} from 'reactstrap';
import {sendAPIRequest, getOriginalServerUrl} from "../../../utils/restfulAPI";

export default function Search(props) {
    const [userInput, setUserInput] = useState("");
    const currentURL = getOriginalServerUrl();

    async function handleChange(e) {
        setUserInput(e.target.value);
    };

    async function handleClick(e) {
        e.preventDefault();
        getResults();
    }

    async function getResults() {
        const requestBody = createFindRequestBody();
        const response = await sendAPIRequest(requestBody, currentURL);
        props.setSearchResults(response);
    }

    function createFindRequestBody() {
        return {
            requestType: 'find',
            match: userInput,
            limit: 10
        }
    }

    useEffect(()=>{getResults();},[userInput]);

    return (
        <InputGroup>
            <Input value={userInput} onChange={handleChange}/>
            <InputGroupAddon addonType="append">
                <Button role="search" onClick={handleClick}>Search</Button>
            </InputGroupAddon>
        </InputGroup>
    )
}

