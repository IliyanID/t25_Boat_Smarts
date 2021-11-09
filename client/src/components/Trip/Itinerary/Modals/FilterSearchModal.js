import React, { useState } from 'react'
import { Button, Input, Modal, ModalBody, ModalFooter, ModalHeader, Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from "reactstrap";
import Multiselect from 'multiselect-react-dropdown';
import '../../../../static/styles/student-styles.scss'

const FilterSearchModal = (props) =>{
    const handleSaveClick = ()=>{
        props.toggleFilterSearch();
    }

    const handleTypesChange = (e) =>{
        let tempRequest = [];
        e.map((item)=>{
            tempRequest.push(item.name);
        })
        let temp = {...props.limitTypes};
        temp.request = tempRequest;
        props.setLimitTypes(temp);
    }

    const handleWhereChange = (e) =>{
        let tempRequest = [];
        e.map((item)=>{
            tempRequest.push(item.name);
        })
        let temp = {...props.limitTypes};
        temp.request = tempRequest;
        props.setLimitTypes(temp);
    }




    const typesResponse = []
    props.limitTypes.response.map((limit,index)=>{
        typesResponse.push({name:limit,id:index})
    })

    const typesRequest = []
    props.limitTypes.request.map((limit,index)=>{
        typesRequest.push({name:limit,id:index})
    })

    const whereResponse = []
    props.limitWhere.response.map((limit,index)=>{
        whereResponse.push({name:limit,id:index})
    })

    const whereRequest = []
    props.limitWhere.request.map((limit,index)=>{
        whereRequest.push({name:limit,id:index})
    })

  

    return (
        <Modal isOpen={props.filterSearchOpen} toggle={props.toggleFilterSearch}>
            <ModalHeader toggle={props.toggleFilterSearch}>Search Filter</ModalHeader>
            <ModalBody className="filterSearchOptions">
                <Multiselect
                    style={{optionContainer:{maxHeight:"100px"}}}
                    options={typesResponse} // Options to display in the dropdown
                    selectedValues={typesRequest} // Preselected value to persist in dropdown
                    onSelect={handleWhereChange} // Function will trigger on select event
                    onRemove={handleWhereChange} // Function will trigger on remove event
                    displayValue="name" // Property name to display in the dropdown options
                    placeholder="Filter By Type"
                />

                <Multiselect
                    style={{optionContainer:{maxHeight:"100px"}}}
                    options={whereResponse} // Options to display in the dropdown
                    selectedValues={whereRequest} // Preselected value to persist in dropdown
                    onSelect={handleTypesChange} // Function will trigger on select event
                    onRemove={handleTypesChange} // Function will trigger on remove event
                    displayValue="name" // Property name to display in the dropdown options
                    placeholder="Filter By Countries"
                />
            </ModalBody>
            <ModalFooter>
                <Button role="saveFilterSettings" onClick={handleSaveClick} color="primary"  data-testid='save' >Save</Button>
            </ModalFooter>
        </Modal>
    )

}
export default FilterSearchModal;