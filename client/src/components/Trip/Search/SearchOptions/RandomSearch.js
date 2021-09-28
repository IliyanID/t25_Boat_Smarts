import React, {useEffect, useState} from "react";
import { Button, Row, Col } from "reactstrap";
import {sendAPIRequest} from "../../../../utils/restfulAPI";

function createFindRequestBody() {
    return {
        requestType: 'find',
        match: "",
        limit: 10
    }
}



export default function RandomSearch(props){

    async function getResults() {

        const requestBody = createFindRequestBody();
        const response = await sendAPIRequest(requestBody, props.currentURL);
    
        if(response) props.setSearchResults(response);
    }

    useEffect(() => {if (props.activeTab === "randomSearch") getResults();}, [props.activeTab])

    return (
        <>
        <br/>
        <Button color="primary" onClick={getResults}>Find Random Places</Button>
        </>
    );
}