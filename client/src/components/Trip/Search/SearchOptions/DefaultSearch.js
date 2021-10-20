import React, {useEffect, useState} from "react";
import {
    InputGroup,
    InputGroupAddon,
    Input,
    Button
} from 'reactstrap';
import {sendAPIRequest} from "../../../../utils/restfulAPI";

export default function DefaultSearch(props) {
    const [userInput, setUserInput] = useState("");

    async function handleChange(e) {
        setUserInput(e.target.value);
    };

    async function handleClick(e) {
        e.preventDefault();
        getResults();
    }

    useEffect(()=>{
        getResults(userInput, props.activeTab, props.currentURL, props.setSearchResults);
    },[userInput, props.activeTab]);


    return (
        <InputGroup>
            <Input value={userInput} onChange={handleChange}/>
            <InputGroupAddon addonType="append">
                <Button role="search" onClick={handleClick}>Search</Button>
            </InputGroupAddon>
        </InputGroup>
    )
};

async function getResults(userInput, activeTab, currentURL, setSearchResults) {
    const requestBody = createFindRequestBody(userInput);

    if (activeTab !== "defaultSearch") return;

    if (userInput === ""){
        setSearchResults(null);
        return;
    }

    const response = await sendAPIRequest(requestBody, currentURL);

    if(response){
        setSearchResults(response);
    }
};

function createFindRequestBody(userInput) {
    return {
        requestType: 'find',
        match: userInput,
        limit: 10
    }
};

