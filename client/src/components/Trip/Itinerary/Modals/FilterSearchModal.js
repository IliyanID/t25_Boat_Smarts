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
    let sharedProps = {
        style:{optionContainer:{maxHeight:"100px"}},
        displayValue:"name"
    }

    const limitTypesChange = (e)=>handleChange(e,props.limitTypes,props.setLimitTypes)
    const limitWhereChange = (e)=>handleChange(e,props.limitWhere,props.setLimitWhere)
    return (
        <Modal isOpen={props.filterSearchOpen} toggle={props.toggleFilterSearch}>
            <ModalHeader toggle={props.toggleFilterSearch}>Search Filter</ModalHeader>
            <ModalBody className="filterSearchOptions">
                <Multiselect
                    options={typesResponse} // Options to display in the dropdown
                    selectedValues={typesRequest} // Preselected value to persist in dropdown
                    onSelect={limitTypesChange} // Function will trigger on select event
                    onRemove={limitTypesChange} // Function will trigger on remove event
                    placeholder="Filter By Type"
                    {...sharedProps}
                />

                <Multiselect
                    options={whereResponse} // Options to display in the dropdown
                    selectedValues={whereRequest} // Preselected value to persist in dropdown
                    onSelect={limitWhereChange} // Function will trigger on select event
                    onRemove={limitWhereChange} // Function will trigger on remove event
                    placeholder="Filter By Countries"
                    {...sharedProps}
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