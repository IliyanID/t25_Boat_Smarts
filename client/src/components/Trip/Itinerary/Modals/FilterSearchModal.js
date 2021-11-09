import React from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Multiselect from 'multiselect-react-dropdown';
import '../../../../static/styles/student-styles.scss'

const FilterSearchModal = (props) =>{


    let sharedProps = {
        style:{optionContainer:{maxHeight:"100px"}},
        displayValue:"name"
    }
    let typeProps = generateProps(props.limitTypes,props.setLimitTypes,"Filter By Type")
    let whereProps = generateProps(props.limitWhere,props.setLimitWhere,"Filter By Country")
    return (
        <Modal isOpen={props.filterSearchOpen} toggle={props.toggleFilterSearch}>
            <ModalHeader toggle={props.toggleFilterSearch}>Search Filter</ModalHeader>
            <ModalBody className="filterSearchOptions">
                <Multiselect
                    {...typeProps}
                    {...sharedProps}
                />

                <Multiselect
                    {...whereProps}
                    {...sharedProps}
                />
            </ModalBody>
            <ModalFooter>
                <Button role="saveFilterSettings" onClick={props.toggleFilterSearch} color="primary"  data-testid='save' >Save</Button>
            </ModalFooter>
        </Modal>
    )

}

const generateProps = (limit,setLimit,placeholder)=>{
    const limitChange = (e)=>handleChange(e,limit,setLimit)
    const response = formatLimits(limit.response);
    const request = formatLimits(limit.request);
    return {
        options:response,
        selectedValues:request,
        onSelect:limitChange,
        onRemove:limitChange,
        placeholder:placeholder
    }
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