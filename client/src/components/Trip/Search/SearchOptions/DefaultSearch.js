import React, {useEffect, useState} from "react";
import {
    InputGroup,
    InputGroupAddon,
    Input,
    Button,
    Image
} from 'reactstrap';
import { FaFilter,FaSearch , FaBan}from 'react-icons/fa'
import {sendAPIRequest} from "../../../../utils/restfulAPI";
import { MakeToolTip } from '../../../../utils/PreviewModeToolTip';
import { AiFillPropertySafety } from "react-icons/ai";

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
        <SearchInputGroup setSearchResults={props.setSearchResults} userInput={userInput} setUserInput={setUserInput} handleChange={handleChange} handleClick={handleClick} toggleFilterSearch={props.toggleFilterSearch}/>
    )
};

function SearchInputGroup(props) {
    return (
        <InputGroup>
            <InputGroupAddon addonType="prepend">
                <Button id="defSearchClear" role="clear" color = "danger" onClick={() => clearInput(props.setSearchResults, props.setUserInput)}><FaBan/></Button>
                <MakeToolTip target = "defSearchClear" placement='bottom' text='Clear Search Results'/>
            </InputGroupAddon>
            <Input value={props.userInput} onChange={props.handleChange} placeholder='Search For A Place'/>
            <InputGroupAddon addonType="append">
                <Button id="defSearchFilter" role="filter" onClick={props.toggleFilterSearch}><FaFilter/></Button>
                <MakeToolTip target = "defSearchFilter" placement='bottom' text='Filter Search Results'/>
                <Button id='defSearch' role="search" onClick={props.handleClick}><FaSearch/></Button>
                <MakeToolTip target = "defSearch" placement='bottom' text='Search'/>
            </InputGroupAddon>
        </InputGroup>
    );
}

async function getResults(requestBody, currentURL, setSearchResults,userInput) {
    if (userInput === ""){
        setSearchResults(null);
        return
        }
    const response = await sendAPIRequest(requestBody, currentURL);
    if(response && userInput !== ""){
        setSearchResults(response);
    }
};

function clearInput(setSearchResults, setUserInput){
    setSearchResults(null);
    setUserInput('');
}

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

