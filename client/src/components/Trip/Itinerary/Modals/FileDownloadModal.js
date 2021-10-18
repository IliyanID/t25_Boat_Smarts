import React, {useState} from "react";
import { Button, Input, InputGroup, InputGroupAddon,InputGroupText, Modal, ModalBody, ModalFooter, ModalHeader, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

export default function FileDownloadModal(props) {

    const [dropdownOpen,setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);

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

                <Dropdown direction="right" isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle caret>
                        {localStorage.getItem("fileType")}
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={()=> localStorage.setItem("fileType","JSON")}>JSON</DropdownItem>
                        <DropdownItem onClick={()=> localStorage.setItem("fileType","CSV")}>CSV</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={props.toggleFileDownloadOpen}>Cancel</Button>
                <Button color="primary" onClick={props.toggleFileDownloadOpen}>Download</Button>
            </ModalFooter>
        </Modal>
    )
}