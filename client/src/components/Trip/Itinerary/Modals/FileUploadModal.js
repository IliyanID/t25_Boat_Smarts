import React from "react";
import { Button, Input, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

export default function FileUploadModal(props) {

    return (
        <Modal isOpen={props.fileUploadOpen} toggle={props.toggleFileUploadOpen}>
            <ModalHeader toggle={props.toggleFileUploadOpen}>Upload Trip</ModalHeader>
            <ModalBody>
                <Input type="file" />
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={props.toggleFileUploadOpen}>Cancel</Button>
                <Button color="primary" onClick={() => {}}>Save</Button>
            </ModalFooter>
        </Modal>
    )
}