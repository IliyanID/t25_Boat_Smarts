import React, {useEffect, useState} from "react";
import { useToggle } from '../../../../hooks/useToggle.js';
import { Button, 
     Modal, ModalBody, ModalFooter, ModalHeader, Row, Col, Container } from "reactstrap";

export function TripSettingsModal(props) {
    return (
        <Modal isOpen={props.tripSettingsOpen} toggle={props.toggleTripSettingsOpen}>
            <ModalHeader toggle={props.toggleTripSettingsOpen}>Trip Settings</ModalHeader>
            <Container>
                <Row>
                    <Col>Tester</Col>
                    <Col>Tester 2</Col>
                </Row>
                <Row>
                    <Col>Tester</Col>
                    <Col>Tester 2</Col>
                </Row>
            </Container>
            <ModalFooter>
                <Button color="primary" onClick={props.toggleTripSettingsOpen} data-testid="SaveSettings">Save</Button>
            </ModalFooter>
        </Modal>
    )
}

export default TripSettingsModal