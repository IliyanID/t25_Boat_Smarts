import React, {useEffect, useState} from "react";
import {
    InputGroup,
    InputGroupAddon,
    Input,
    Button,
    Image
} from 'reactstrap';
import { FaFilter,FaSearch }from 'react-icons/fa'
import {sendAPIRequest} from "../../../../utils/restfulAPI";

export default function DefaultSearch(props) {
    const [userInput, setUserInput] = useState("");
    const [dropdownOpen,setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);

    async function handleChange(e) {
        setUserInput(e.target.value);
    };

    async function handleClick(e) {
        e.preventDefault();
        getResults();
    }

    useEffect(()=>{
        if(props.activeTab !== "defaultSearch")
            return
        let requestBody = createFindRequestBody(userInput,props.limitTypes.request,props.limitWhere.request)
        getResults(requestBody, props.currentURL, props.setSearchResults,userInput);
        
    },[userInput, props.activeTab]);


    return (
        <InputGroup>
            <Input value={userInput} onChange={handleChange}/>
            <InputGroupAddon addonType="append">
                <Button role="filter" onClick={props.toggleFilterSearch}><FaFilter/></Button>
                <Button role="search" onClick={handleClick}><FaSearch/></Button>
            </InputGroupAddon>
        </InputGroup>
    )
};

async function getResults(requestBody, currentURL, setSearchResults,userInput) {
    if (userInput === ""){
        setSearchResults(null);
        return
        }
    const response = await sendAPIRequest(requestBody, currentURL);
    if(response){
        setSearchResults(response);
    }
};

function createFindRequestBody(userInput,types,where) {
    let request = {
        requestType: 'find',
        match: userInput,
        limit: 10
    }
    if(types && types.length !== 0)
        request['type'] = types;

    if(where && where.length !== 0)
        request['where'] = where;

    return request
};

