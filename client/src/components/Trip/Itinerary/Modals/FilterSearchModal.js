import React from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Multiselect from 'multiselect-react-dropdown';
import '../../../../static/styles/student-styles.scss'

let globalProps;
const FilterSearchModal = (props) =>{
    globalProps = props;
    const typesResponse = formatLimits(props.limitTypes.response);
    const typesRequest = formatLimits(props.limitTypes.request);

    const whereResponse = formatLimits(props.limitWhere.response);
    const whereRequest = formatLimits(props.limitWhere.request);

    let sharedStyles = {optionContainer:{maxHeight:"100px"}}

    return (
        <Modal isOpen={props.filterSearchOpen} toggle={props.toggleFilterSearch}>
            <ModalHeader toggle={props.toggleFilterSearch}>Search Filter</ModalHeader>
            <ModalBody className="filterSearchOptions">
                <Multiselect
                    style={sharedStyles}
                    options={typesResponse} // Options to display in the dropdown
                    selectedValues={typesRequest} // Preselected value to persist in dropdown
                    onSelect={(e)=>handleChange(e,props.limitTypes,props.setLimitTypes)} // Function will trigger on select event
                    onRemove={(e)=>handleChange(e,props.limitTypes,props.setLimitTypes)} // Function will trigger on remove event
                    displayValue="name" // Property name to display in the dropdown options
                    placeholder="Filter By Type"
                />

                <Multiselect
                    style={sharedStyles}
                    options={whereResponse} // Options to display in the dropdown
                    selectedValues={whereRequest} // Preselected value to persist in dropdown
                    onSelect={(e)=>handleChange(e,props.limitWhere,props.setLimitWhere)} // Function will trigger on select event
                    onRemove={(e)=>handleChange(e,props.limitWhere,props.setLimitWhere)} // Function will trigger on remove event
                    displayValue="name" // Property name to display in the dropdown options
                    placeholder="Filter By Countries"
                />
            </ModalBody>
            <ModalFooter>
                <Button role="saveFilterSettings" onClick={props.toggleFilterSearch} color="primary"  data-testid='save' >Save</Button>
            </ModalFooter>
        </Modal>
    )

}

const handleChange = (e,limit,setLimit) =>{
    let tempRequest = formatLimitsBack(e);
    let temp = {...limit};
    temp.request = tempRequest;
    setLimit(temp);
}

const formatLimitsBack = (formatedArr) =>{
    let formatLimitsBackResult = [];
    formatedArr.map((item)=>{
        formatLimitsBackResult.push(item.name);
    })
    return formatLimitsBackResult
}

const formatLimits = (unFormatedArr) =>{
    let result = [];
    unFormatedArr.map((item,index)=>{
        result.push({name:item,id:index})
    })
    return result;
}
export default FilterSearchModal;