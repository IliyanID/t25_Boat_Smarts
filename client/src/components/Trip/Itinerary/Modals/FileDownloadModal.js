import React, {useState} from "react";
import { Button, Input, InputGroup, InputGroupAddon,InputGroupText, Modal, ModalBody, ModalFooter, ModalHeader, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

export default function FileDownloadModal(props) {

    const [dropdownOpen,setDropdownOpen] = useState(false);

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
                <Input type="select" defaultValue={localStorage.getItem("fileType")}> 
                    <option onClick={() => localStorage.setItem("fileType","JSON")}>JSON</option>
                    <option>CSV</option>
                </Input>
                </InputGroup><br/>

                <Dropdown>
                    <DropdownToggle>
                        {localStorage.getItem("fileType")}
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={()=> localStorage.setItem("fileType","JSON")}>JSON</DropdownItem>
                        <DropdownItem>JSON</DropdownItem>
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