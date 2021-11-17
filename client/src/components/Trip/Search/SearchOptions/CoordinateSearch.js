import React, { useState, useEffect } from "react";

import { Button, Input, InputGroup, InputGroupAddon, InputGroupText, Label, Row, Col } from "reactstrap";
import { checkBounds } from '../../../../utils/currentLocation'
import Coordinates from 'coordinate-parser';
import { reverseGeocode } from "../../../../utils/reverseGeocode";
import { LOG } from "../../../../utils/constants";
import { latLngToPlace } from "../../../../utils/transformers";

export default function CoordinateSearch(props) {
  const { inputText, latLng, validCoordinates, processInputChange } = useCoordinateValidation();

  function handleFind() {
    getResults();
  }

  function handleAdd() {
    if(latLng && !checkBounds(latLng,props.showMessage))
      props.placeActions.append(latLngToPlace(latLng));
  }

  async function getResults() {
    if (validCoordinates) {
      const coordDetails = await reverseGeocode(latLng);
      props.setLocationPreview(coordDetails);
    } else showInvalidCoordinateMessage(props.showMessage);
  }

  return <CoordinateSearchElement inputText={inputText} latLng={latLng} processInputChange={processInputChange} handleFind={handleFind} handleAdd={handleAdd} />;
}

function showInvalidCoordinateMessage(showMessage) {
  try {
    showMessage("Invalid coordinates.", "warning");
  } catch (e) {
    LOG.error('Failed to show invalid coordinate message');
  }
}

function CoordinateSearchElement(props) {
  return (
    <>
      <Row>
        <Col className="my-2 col-sm-12">
          <CoordinatesInput inputText={props.inputText} latLng={props.latLng} processInputChange={props.processInputChange} />
        </Col>
      </Row>
      <Row>
        <Col className="mx-auto my-1 px-auto col-auto">
          <Button className="mx-1" onClick={props.handleFind}>Find</Button>
          <Button className="mx-1" onClick={props.handleAdd}>Add to Trip</Button>
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