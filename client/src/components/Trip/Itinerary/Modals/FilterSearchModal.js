import React from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Multiselect from 'multiselect-react-dropdown';
import '../../../../static/styles/student-styles.scss'

const FilterSearchModal = (props) =>{


    let sharedProps = {
        style:{optionContainer:{maxHeight:"100px"}},
        displayValue:"name"
    }
    let typeProps = generateTypeProps(props);
    let whereProps = generateWhereProps(props);
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

const generateTypeProps = (props) =>{
    const limitTypesChange = (e)=>handleChange(e,props.limitTypes,props.setLimitTypes)
    const typesResponse = formatLimits(props.limitTypes.response);
    const typesRequest = formatLimits(props.limitTypes.request);
    let result = generateShared(typesResponse,typesRequest,limitTypesChange,"Filter By Type")
    return result;
}
const generateWhereProps = (props) =>{
    const limitWhereChange = (e)=>handleChange(e,props.limitWhere,props.setLimitWhere)
    const whereResponse = formatLimits(props.limitWhere.response);
    const whereRequest = formatLimits(props.limitWhere.request);
    let result = generateShared(whereResponse,whereRequest,limitWhereChange,"Filter By Countries")
    return result;
}
    const generateShared = (options,selectedValues,onSelect,onRemove,placeHolder) => {
        return {
            options:options,
            selectedValues:selectedValues,
            onSelect:onSelect,
            onRemove:onRemove,
            placeHolder:placeHolder
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