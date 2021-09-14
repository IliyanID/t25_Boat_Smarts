import React, {useState, useEffect} from "react";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButtonDropdown,
    Input,
    Button
} from 'reactstrap';

export default function Search(props) {
    const [userInput, setUserInput] = useState("");

    return (
        <>
        <InputGroup>
            <Input />
            <InputGroupAddon addonType="append">
                // TODO: add onClick property to Button
                <Button>Search</Button>
            </InputGroupAddon>
        </InputGroup>
        </>
    )
}