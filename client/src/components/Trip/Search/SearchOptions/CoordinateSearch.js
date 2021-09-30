import React, { useState, useEffect } from "react";

import { Button, Input,  InputGroup, InputGroupAddon, InputGroupText, Label, Row, Col } from "reactstrap";
import Coordinates from 'coordinate-parser';
import { reverseGeocode } from "../../../../utils/reverseGeocode";

export default function CoordinateSearch(props) {
    const { inputText, latLng, validCoordinates, processInputChange } = useCoordinateValidation();

    function handleFind() {
        getResults();
    }

    function handleAdd() {
        if (latLng) {
            props.placeActions.append(latLng);
        }
    }

    async function getResults() {
        if (validCoordinates) {
            const coordDetails = await reverseGeocode(latLng);
            props.setLocationPreview(coordDetails);
        } else {
            props.showMessage("Invalid coordinates.", "warning");
        }
    }

    return (
        <>
            <Row>
                <Col className="my-2 col-sm-12">
                  <CoordinatesInput inputText={inputText} latLng={latLng} processInputChange={processInputChange} />
                </Col>
            </Row>
            <Row>
                <Col className="mx-auto my-1 px-auto col-auto">
                    <Button className="mx-1" onClick={handleAdd}>Add to Trip</Button>
                    <Button className="mx-1" onClick={handleFind}>Find</Button>
                </Col>
            </Row>
        </>
    );
}

function useCoordinateValidation() {
    const [inputText, setInputText] = useState("");
    const [latLng, setLatLng] = useState(null);
    const validCoordinates = latLng !== null;
  
    function processInputChange(onChangeEvent) {
      const newInputText = onChangeEvent.target.value;
      const newLatLng = getCoordinatesOrNull(newInputText);
  
      setInputText(newInputText);
      setLatLng(newLatLng);
    }
  
    return { inputText, latLng, validCoordinates, processInputChange };
  }

  function getCoordinatesOrNull(coordinatesString) {
    try {
      // uses Coordinates class from coordinate-parser
      const convertedCoordinates = new Coordinates(coordinatesString);
      return {
        lat: convertedCoordinates.getLatitude(),
        lng: convertedCoordinates.getLongitude()
      };
    } catch (error) {
      return null;
    }
  }
  
  
  function CoordinatesInput(props) {
    const validCoordinates = props.latLng != null;
    const inputBoxEmpty = !props.inputText;
    
    return (
      <InputGroup>
        <InputGroupAddon addonType="prepend">Coordinates</InputGroupAddon>
        <Input
          placeholder="Latitude, Longitude"
          onChange={props.processInputChange}
          value={props.inputText}
          valid={validCoordinates}
          invalid={!validCoordinates && !inputBoxEmpty}
        />
      </InputGroup>
    );
  }