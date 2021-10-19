import React, { useEffect, useState } from "react";
import { Button, Input, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import * as tripSchema from '../../../../../schemas/TripFile.json';
import { LOG } from "../../../../utils/constants";
import { isJsonResponseValid } from "../../../../utils/restfulAPI";
import { reverseGeocode } from "../../../../utils/reverseGeocode";
import { placeToLatLng } from "../../../../utils/transformers";

export default function FileUploadModal(props) {
    const [validFile, setValidFile] = useState(false);
    const [fileInput, setFileInput] = useState(null);
    const {setSelectedIndex, filePlaces, setFilePlaces} = props;
    const context = { validFile, setValidFile, filePlaces, setFilePlaces, setSelectedIndex };
    const handleFileLoad = (e) => {
        setFileInput(e.target);
        validateFile(fileInput, context);
    }
    const handleSaveClick = async (e) => {
        e.preventDefault();
        const convertedPlaces = await Promise.all(filePlaces.map(place => reverseGeocode(placeToLatLng(place))));
        props.setPlaces(convertedPlaces);
        props.toggleFileUploadOpen();
    }
    useEffect(() => {
        validateFile(fileInput, context);
    })
    return (
        <Modal isOpen={props.fileUploadOpen} toggle={props.toggleFileUploadOpen}>
            <ModalHeader toggle={props.toggleFileUploadOpen}>Upload Trip</ModalHeader>
            <ModalBody>
                <Input role="input" type="file" valid={validFile} invalid={!validFile} onChange={handleFileLoad} />
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={props.toggleFileUploadOpen}>Cancel</Button>
                <Button color="primary" onClick={handleSaveClick} disabled={!validFile}>Save</Button>
            </ModalFooter>
        </Modal>
    )
}

function validateFile(input, context) {
    const { validFile, setValidFile, filePlaces, setFilePlaces, setSelectedIndex } = context;
    if (input && 'files' in input && input.files.length > 0) {
        let reader = new FileReader();
        reader.readAsText(input.files[0]);
        reader.onload = () => {
            let result;
            try {
                result = JSON.parse(reader.result);
            } catch (e) {
                result = csvToJson(reader.result);
            } finally {
                setValidFile(isJsonResponseValid(result, tripSchema));
                if (validFile) {
                    setFilePlaces(result.places);
                    setSelectedIndex(filePlaces.length - 1);
                }
            }
        }
        reader.onerror = () => {
            LOG.error(reader.error);
        }
    }
}

function csvToJson(stringFromFile) {
    let json = {places: []};
    const lines = stringFromFile.split('\n');
    const properties = lines[0].split(',');
    for (let i = 1; i < lines.length; i++) {
        let curr = {};
        const line = lines[i].split(',');
        for (let j = 0; j < properties.length; j++) {
            curr[properties[j]] = line[j]
        }
        json.places.push(curr);
    }
    return json;
}