import React, {useState} from "react";
import { Button, Input, InputGroup, InputGroupAddon,InputGroupText, Modal, ModalBody, ModalFooter, ModalHeader, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

export default function FileDownloadModal(props) {

    const handleSelectChange = ({target: {value}}) => {
        let fileType = JSON.parse(value);
        setFocusAfterClose(fileType);
        //console.log(fileType);
        localStorage.setItem("fileType", fileType);
        //console.log(localStorage.getItem("fileType"));
    }

    return (
        <Modal isOpen={props.fileDownloadOpen} toggle={props.toggleFileDownloadOpen}>
            <ModalHeader toggle={props.toggleFileDownloadOpen}>Download Trip</ModalHeader>
            <ModalBody>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>Trip Name</InputGroupText>
                    </InputGroupAddon>
                <Input type="textarea" placeholder="Trip Name" />
                </InputGroup><br/>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>File Type</InputGroupText>
                    </InputGroupAddon>
                <Input type="select" placeholder="Flie Type" onChange={handleSelectChange}> 
                    <option value="true">JSON</option>
                    <option value="false">CSV</option>
                </Input>

                </InputGroup><br/>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={props.toggleFileDownloadOpen}>Cancel</Button>
                <Button color="primary" onClick={props.toggleFileDownloadOpen}>Download</Button>
            </ModalFooter>
        </Modal>
    )
}