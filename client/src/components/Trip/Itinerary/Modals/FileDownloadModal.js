import React, {useState} from "react";
import { Button, Input, InputGroup, InputGroupAddon,InputGroupText, Modal, ModalBody, ModalFooter, ModalHeader, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

export default function FileDownloadModal(props) {

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
                <Input type="select" placeholder="File Type" onChange={handleSelectChange}> 
                    <option onClick={() => localStorage.setItem("fileType", "JSON")}>JSON</option>
                    <option onClick={() => localStorage.setItem("fileType", "CSV")}>CSV</option>
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