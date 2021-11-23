import React, {useEffect, useState} from "react";
import { useToggle } from '../../../../hooks/useToggle.js';
import { Button, Input, InputGroup, InputGroupAddon,InputGroupText, Modal, ModalBody, ModalFooter, ModalHeader, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Form, FormGroup, Label, Row, Col } from "reactstrap";
import {buildTripJSON, buildTripCSV, buildTripSVG} from "../../../../utils/fileBuilder";
import { EARTH_RADIUS_UNITS_DEFAULT } from "../../../../utils/constants"



const MIME_TYPE = {
    JSON: "application/json",
    CSV: "text/csv",
    SVG: "image/svg+xml",
    KML: "application/vnd.google-earth.kml+xml"
};


export function FileDownload(props) {

    const [fileName, setFileName] = useState(props.tripName);
    const [fileType, setFileType] = useState(localStorage.getItem("fileType") != null ? localStorage.getItem("fileType") : "JSON");

    useEffect(()=>{setFileName(props.tripName)}, [props.tripName, props.fileDownloadOpen]);

    const [saveToMem, setSaveToMem] = useToggle(false);
    function handleDownload() {
        if (saveToMem){
            localStorage.setItem("fileType",fileType);
        }
        downloadFile(fileName, MIME_TYPE[fileType], props.places);
        props.toggleFileActions();
    }

    return (
        <ModalWrapper handleDownload={handleDownload} fileName={fileName} {...props}>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>File Name</InputGroupText>
                    </InputGroupAddon>
                    <Input value={fileName} placeholder="Enter File Name" onChange={(e)=>setFileName(e.target.value)}/>
                </InputGroup><br/>
                <FileTypeSelector saveToMem={saveToMem} setSaveToMem={setSaveToMem} fileType={fileType} setFileType={setFileType} />
        </ModalWrapper>   
    )
}

export function ModalWrapper(props) {
    return (
        <>
            <ModalBody>
                {props.children}
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={props.toggleFileActions}>Cancel</Button>
                <Button color="primary" onClick={props.handleDownload} disabled={props.fileName===""} data-testid="download">Download</Button>
            </ModalFooter>
        </>
    )
}

export function FileTypeSelector(props) {
    const [dropdownOpen,setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);

    return (
                <Form>
                    <Dropdown direction="right" isOpen={dropdownOpen} toggle={toggle}>
                        <Label>File Type:&ensp;</Label>
                        <DropdownToggle caret>
                            {props.fileType}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={()=> props.setFileType("JSON")}>JSON</DropdownItem>
                            <DropdownItem onClick={()=> props.setFileType("CSV")}>CSV</DropdownItem>
                            <DropdownItem onClick={()=> props.setFileType("SVG")}>SVG</DropdownItem>
                        </DropdownMenu>
                    </Dropdown><br/>
                    <FormGroup check>
                        <Input type="checkbox" onClick={props.setSaveToMem} defaultChecked={props.saveToMem}/>
                        <Label>Save Settings For Later</Label>
                    </FormGroup>
                </Form>
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
    } else if (mimeType === MIME_TYPE.SVG) {
        return buildTripSVG(places);
    }
}

export function addExtension(fileName, mimeType){
    const cleanName = fileName.replace(/ /g,"_")
    if (mimeType === MIME_TYPE.JSON){
        return cleanName + ".json";
    } else if (mimeType === MIME_TYPE.CSV) {
        return cleanName + ".csv";
    } else if (mimeType === MIME_TYPE.SVG) {
        return cleanName + ".svg";
    }
}
export default FileDownload