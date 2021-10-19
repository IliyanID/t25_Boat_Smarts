import React, {useState} from "react";
import { useToggle } from '../../../../hooks/useToggle.js';
import { Button, Input, InputGroup, InputGroupAddon,InputGroupText, Modal, ModalBody, ModalFooter, ModalHeader, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Form, FormGroup, Label, Row, Col } from "reactstrap";

export default function FileDownloadModal(props) {

    const [dropdownOpen,setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);

    const [saveToMem, setSaveToMem] = useToggle(localStorage.getItem("fileType") != null);

    return (
        <Modal isOpen={props.fileDownloadOpen} toggle={props.toggleFileDownloadOpen}>
            <ModalHeader toggle={props.toggleFileDownloadOpen}>Download Trip</ModalHeader>
            <ModalBody>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>Trip Name</InputGroupText>
                    </InputGroupAddon>
                    <Input type="textarea" placeholder="Trip Name"/>
                </InputGroup><br/>
                <Form>
                    <Dropdown direction="right" isOpen={dropdownOpen} toggle={toggle}>
                        <DropdownToggle caret>
                            {localStorage.getItem("fileType") != null ? localStorage.getItem("fileType") : "JSON"}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={()=> localStorage.setItem("fileType","JSON")}>JSON</DropdownItem>
                            <DropdownItem onClick={()=> localStorage.setItem("fileType","CSV")}>CSV</DropdownItem>
                        </DropdownMenu>
                    </Dropdown><br/>
                    <FormGroup check>
                        <Input type="checkbox" onClick={setSaveToMem} defaultChecked={localStorage.getItem("fileType") != null}/>
                        <Label>Save Settings For Later</Label>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={props.toggleFileDownloadOpen}>Cancel</Button>
                <Button color="primary" onClick={() => {saveToMem ? props.toggleFileDownloadOpen() : localStorage.removeItem("fileType")}}>Download</Button>
            </ModalFooter>
        </Modal>
    )
}