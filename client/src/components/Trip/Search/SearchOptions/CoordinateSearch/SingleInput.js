import React from 'react';
import { Col, InputGroup, Input, InputGroupAddon, InputGroupText } from 'reactstrap';

export default function SingleInput(props) {
    return (
        <Col className={props.classes}>
            <InputGroup size="small">
                <Input
                    className="pr-0"
                    value={props.inputValue}
                    onChange={props.handleValueChange}
                    placeholder={props.inputType}
                />
                <InputGroupAddon addonType="append">
                    <InputGroupText>{props.inputSymbol}</InputGroupText>
                </InputGroupAddon>
            </InputGroup>
        </Col>
    );
}