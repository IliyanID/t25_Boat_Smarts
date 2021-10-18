import React, {useState} from "react";
import { Button, Input, Modal, ModalBody, ModalFooter, ModalHeader, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

export default function FileDownloadModal(props) {

    const [dropdownOpen, setDropdownOpen] =  useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);

    return (
        <Modal isOpen={props.fileDownloadOpen} toggle={props.toggleFileDownloadOpen}>
            <ModalHeader toggle={props.toggleFileDownloadOpen}>Download Trip</ModalHeader>
            <ModalBody>
                <Input type="textarea" placeholder="Trip Name" /><br/>
                <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle caret>
                        File Type
                    </DropdownToggle>
                    <DropdownMenu container="body">
                        <DropdownItem onClick={() => localStorage.setItem("downloadFileType","JSON")}>JSON</DropdownItem>
                        <DropdownItem onClick={() => localStorage.setItem("downloadFileType","CSV")}>CSV</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={props.toggleFileDownloadOpen}>Cancel</Button>
                <Button color="primary" onClick={() => {}}>Save</Button>
            </ModalFooter>
        </Modal>
    )
}