import React, {useState, useEffect} from "react";
import {
    InputGroup,
    InputGroupAddon,
    Input,
    Button
} from 'reactstrap';

export default function Search(props) {
    const [userInput, setUserInput] = useState("");

    function handleChange(e) {
        setUserInput(e.target.value)
    };

    return (
        <>
        <InputGroup>
            <Input value={userInput} onChange={handleChange}/>
            <InputGroupAddon addonType="append">
                <Button>Search</Button>
            </InputGroupAddon>
        </InputGroup>
        </>
    )
}

