import React, {useEffect, useState} from "react";
import { useToggle } from '../../../../hooks/useToggle.js';
import { Button, Input, InputGroup, InputGroupAddon,InputGroupText, Modal, ModalBody, ModalFooter, ModalHeader, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Form, FormGroup, Label, Row, Col } from "reactstrap";
import {buildTripJSON, buildTripCSV} from "../../../../utils/fileBuilder";
import { EARTH_RADIUS_UNITS_DEFAULT } from "../../../../utils/constants"



const MIME_TYPE = {
    JSON: "application/json",
    CSV: "text/csv",
    SVG: "image/svg+xml",
    KML: "application/vnd.google-earth.kml+xml"
};


export default function FileDownloadModal(props) {

    const [dropdownOpen,setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);

    const [fileName, setFileName] = useState(props.tripName);
    const [fileType, setFileType] = useState(localStorage.getItem("fileType") != null ? localStorage.getItem("fileType") : "JSON");

    useEffect(()=>{setFileName(props.tripName)}, [props.tripName, props.fileDownloadOpen]);

    const [saveToMem, setSaveToMem] = useToggle(localStorage.getItem("fileType") != null);
    function handleDownload() {
        if (saveToMem){
            localStorage.setItem("fileType",fileType);
        }
        downloadFile(fileName, MIME_TYPE[fileType], props.places);
        props.toggleFileDownloadOpen();
    }

    return (
        <Modal isOpen={props.fileDownloadOpen} toggle={props.toggleFileDownloadOpen}>
            <ModalHeader toggle={props.toggleFileDownloadOpen}>Download Trip</ModalHeader>
            <ModalBody>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>File Name</InputGroupText>
                    </InputGroupAddon>
                    <Input value={fileName} placeholder="Enter File Name" onChange={(e)=>setFileName(e.target.value)}/>
                </InputGroup><br/>
                <Form>
                    <Dropdown direction="right" isOpen={dropdownOpen} toggle={toggle}>
                        <Label>File Type:&ensp;</Label>
                        <DropdownToggle caret>
                            {fileType}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={()=> setFileType("JSON")}>JSON</DropdownItem>
                            <DropdownItem onClick={()=> setFileType("CSV")}>CSV</DropdownItem>
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
                <Button color="primary" onClick={handleDownload} disabled={fileName===""} data-testid="download">Download</Button>
            </ModalFooter>
        </Modal>
    )
}

export function downloadFile(fileName, mimeType, places) {
    const fileNameWithExtension = addExtension(fileName, mimeType);
    const fileText = buildFileText(mimeType, places);
    const file = new Blob([fileText], {type: mimeType });
    const link = document.createElement("a");
    const url = URL.createObjectURL(file);
    link.href = url;
    link.download = fileNameWithExtension;
    document.body.appendChild(link);
    link.click();
    setTimeout(function() {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    }, 0);
}

export function buildFileText(mimeType, places) {
    if (mimeType === MIME_TYPE.JSON){
        return buildTripJSON(places, "miles",  EARTH_RADIUS_UNITS_DEFAULT.miles);
    } else if (mimeType === MIME_TYPE.CSV) {
        return buildTripCSV(places, "miles",  EARTH_RADIUS_UNITS_DEFAULT.miles);
    }
}

export function addExtension(fileName, mimeType){
    const cleanName = fileName.replace(/ /g,"_")
    if (mimeType === MIME_TYPE.JSON){
        return cleanName + ".json";
    } else if (mimeType === MIME_TYPE.CSV) {
        return cleanName + ".csv";
    }
}
