import React, { useEffect, useState } from "react";
import { Button, Input, Modal, ModalBody, ModalFooter, CustomInput, FormGroup} from "reactstrap";
import * as tripSchema from '../../../../../schemas/TripFile.json';
import { LOG } from "../../../../utils/constants";
import { isJsonResponseValid } from "../../../../utils/restfulAPI";
import { reverseGeocode } from "../../../../utils/reverseGeocode";
import { placeToLatLng } from "../../../../utils/transformers";

const packageStates = (props) =>{
    const [validFile, setValidFile] = useState(false);
    const [fileInput, setFileInput] = useState(null);
    const {setSelectedIndex, filePlaces, setFilePlaces } = props;
    const context = { validFile, setValidFile, filePlaces, setFilePlaces, setSelectedIndex };

    const [selectedTab,setSelectedTab] = useState('FileUpload')
    return {
        validFile,setValidFile,
        fileInput,setFileInput,
        setSelectedIndex,filePlaces,setFilePlaces,
        context,
        selectedTab,setSelectedTab,
        ...props
    }
}

const handleFileLoad = (e,allPackages) => {
    allPackages.setFileInput(e.target);
    validateFile(allPackages.fileInput, allPackages.context);
}

const handleSaveClick = async (e,allPackages) => {
    e.preventDefault();
    const convertedPlaces = await Promise.all(allPackages.filePlaces.map(place => convertPlace(place)));
    allPackages.setSelectedIndex(-1)
    allPackages.setPlaces(convertedPlaces);
    allPackages.toggleFileActions();

    let tripName = allPackages.fileInput.files[0].name;
    tripName = tripName.substring(0,tripName.lastIndexOf('.')).replaceAll('_',' ')
    allPackages.setTripName(tripName)
}

const HandleFileInput = (allPackages) =>{
    return useEffect(() => {
        validateFile(allPackages.fileInput, allPackages.context);
    }, [allPackages.fileInput]);
}

export function FileUpload(props) {
    const allPackages = packageStates(props)
    HandleFileInput(allPackages)
   
    let fileName
    if(allPackages.fileInput && allPackages.fileInput.files)
        fileName = allPackages.fileInput.files[0].name

    return (<>
                    <ModalBody>
                        <FormGroup>
                            <CustomInput
                                id='customFileInput'
                                type="file"
                                name="customFile"
                                label={fileName || 'Choose Trip File'}
                                onChange={(e)=>handleFileLoad(e,allPackages)}
                                role='input'
                            />
                        </FormGroup>
                    </ModalBody>
            
                    <ModalFooter>
                        <Button color="secondary" onClick={props.toggleFileActions}>Cancel</Button>
                        <Button role="saveUpload" color="primary" onClick={(e)=>handleSaveClick(e,allPackages)} disabled={!allPackages.validFile} data-testid='save' >Save</Button>
                    </ModalFooter>
        </>
    )
}



 export function validateFile(input, context) {
    const { validFile, setValidFile, filePlaces, setFilePlaces, setSelectedIndex } = context;
    if (!input || !('files' in input) || input.files.length <= 0) 
            return
        //console.log(input.files)
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
            if (isJsonResponseValid(result, tripSchema)) {
                if (result.units) localStorage.setItem('fileUnitsName', result.units);
                if (result.earthRadius) localStorage.setItem('fileUnitsValue', result.earthRadius);
                setFilePlaces(result.places);
                setSelectedIndex(0);
            }
        }
    }
    reader.onerror = () => {
        LOG.error(reader.error);
    }
    
}

export function csvToJson(stringFromFile) {
    let json = {places: []};
    const lines = stringFromFile.split('\n');
    const properties = lines[0].split(',');
    for (let i = 1; i < lines.length; i++) {
        let curr = {};
        const line = lines[i].split(',');
        for (let j = 0; j < properties.length; j++) {
            if (properties[j] === 'units') json['units'] = line[j];
            else if (properties[j] === 'earthRadius') json['earthRadius'] = parseFloat(line[j]);
            else curr[properties[j]] = line[j];
        }
        json.places.push(curr);
    }
    return json;
}

export function convertPlace(place) {
    if (!('name' in place) || place.name === '' ){
        return {...placeToLatLng(place), name: "Unknown"};
    } else {
        return {...placeToLatLng(place), name: place.name}
    }
}

export default FileUpload