import React from 'react'
import { Button, Input, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const FilterSearchModal = (props) =>{
    return (
        <Modal isOpen={props.filterSearchOpen} toggle={props.toggleFilterSearch}>
            <ModalHeader toggle={props.toggleFileUploadOpen}>Search Filter</ModalHeader>
            <ModalBody>
                
            </ModalBody>
            <ModalFooter>
                <Button role="saveFilterSettings" color="primary"  data-testid='save' >Save</Button>
            </ModalFooter>
        </Modal>
    )

}
export default FilterSearchModal;