import React, {useState} from "react";
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
    const setSearchResults = props.setSearchResults;

    function handleChange(e) {
        setUserInput(e.target.value)
    };

    async function handleClick(e) {
        e.preventDefault();
        const requestBody = createFindRequestBody();
        const response = await sendAPIRequest(requestBody, currentURL);
        setSearchResults(response);
    }

    function createFindRequestBody() {
        return {
            requestType: 'find',
            match: userInput,
            limit: 10
        }
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

