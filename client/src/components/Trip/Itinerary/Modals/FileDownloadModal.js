import React, {useState} from "react";
import { Button, Input, InputGroup, InputGroupAddon,InputGroupText, Modal, ModalBody, ModalFooter, ModalHeader, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

export default function FileDownloadModal(props) {

    console.log(localStorage.getItem("fileType"));

    const [fileType, setFileType] = useState("JSON");

    const changeFileType = () => {
        if(localStorage.getItem("fileType") == "CSV"){
            localStorage.setItem("fileType","JSON");
            setFileType("JSON");
        }
        if(localStorage.getItem("fileType") == "JSON"){
            localStorage.setItem("fileType","CSV");
            setFileType("CSV");
        }
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
                <Input type="select" defaultValue={fileType}> 
                    <option onClick={() => {changeFileType()}}>JSON</option>
                    <option onClick={() => {changeFileType()}}>CSV</option>
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