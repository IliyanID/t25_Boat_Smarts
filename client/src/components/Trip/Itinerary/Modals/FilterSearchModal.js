import React from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Multiselect from 'multiselect-react-dropdown';
import '../../../../static/styles/student-styles.scss'

let globalProps;
const FilterSearchModal = (props) =>{
    globalProps = props;
    const handleSaveClick = ()=>{
        props.toggleFilterSearch();
    }

    const typesResponse = formatLimits(props.limitTypes.response);
    const typesRequest = formatLimits(props.limitTypes.request);

    const whereResponse = formatLimits(props.limitWhere.response);
    const whereRequest = formatLimits(props.limitWhere.request);

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

const handleTypesChange = (e) =>{
    let tempRequestType = formatLimitsBack(e);
    let temp = {...globalProps.limitTypes};
    temp.request = tempRequestType;
    globalProps.setLimitTypes(temp);
}

const handleWhereChange = (e) =>{
    let tempRequestWhere = formatLimitsBack(e);
    let temp = {...globalProps.limitTypes};
    temp.request = tempRequestWhere;
    globalProps.setLimitTypes(temp);
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