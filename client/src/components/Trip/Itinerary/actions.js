import React, { useState, useEffect } from 'react';
import { ButtonGroup, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown, Tooltip } from 'reactstrap';
import { BiDotsVerticalRounded, BiSleepy } from 'react-icons/bi';
import { FaHome, FaTrash, FaTrashAlt, FaSearchLocation, FaFileUpload,FaFileDownload, FaRoute} from 'react-icons/fa';
import { AiOutlineRedo} from 'react-icons/ai';
import { DEFAULT_STARTING_PLACE, LOG } from '../../../utils/constants';
import { currentLocation } from '../../../utils/currentLocation';

export function ItineraryActionsDropdown(props) {
    let descriptions = ["Add starting Location","Load Trip From File","Save Trip To File","Optimize Trip","Reverse Trip","Delete all Trips"]
    let defaultArr = new Array(descriptions.length).fill(false)
    let curr = currentLocation(props.showMessage);


    const [toolTip,setToolTip] = useState(defaultArr)
    const toggle = (index) =>{
        let temp =  [...toolTip]
        temp[index] = !temp[index]
        setToolTip(temp)
    }

    const reset = (e) =>{
        setToolTip(defaultArr)
    }
    
    let Items = [
    <DropdownItem id={`index-0`} onClick={() => {reset();curr.latitude!=null ?
            props.placeActions.append(curr) : props.showMessage("User denied Geolocation. Please turn it on and reload the page.","warning")}} 
            data-testid='home-button'>
        <FaHome />
    </DropdownItem>,
    <DropdownItem id={`index-1`} onClick={()=>{reset();props.toggleFileUploadOpen()}} data-testid='load-file-button'>
        <FaFileUpload/>
    </DropdownItem>,
    <DropdownItem onClick={()=>{reset();props.toggleFileDownloadOpen()}} id={`index-2`} data-testid='save-file-button'>
        <FaFileDownload/>
    </DropdownItem>,
    <DropdownItem onClick={() => {reset();}} id={`index-3`} data-testid='shorter-trip-button'>
        <FaRoute />
    </DropdownItem>,
    <DropdownItem id={`index-4`} data-testid='reverse-trip-buttom' onClick={() => {reset();props.placeActions.reverse()}}>
        <AiOutlineRedo/>
    </DropdownItem>,
    <DropdownItem onClick={() => {reset();props.placeActions.removeAll()}} id={`index-5`} data-testid='delete-all-button'>
        <FaTrashAlt />
    </DropdownItem>
    ]

    return (
        <ActionsDropdown {...props}>
                {
                    Items.map((item,index)=>{
                        return(
                        <>
                            {item}
                            <Tooltip placement="left" isOpen={toolTip[index]} target={`index-${index}`}  toggle={()=>toggle(index)}>
                                {descriptions[index]}
                            </Tooltip>
                        </>
                        )
                    })
                }
        </ActionsDropdown>
    );
}

export function PlaceActionsDropdown(props) {
    return (
        <ActionsDropdown {...props}>
            <DropdownItem onClick={() => props.placeActions.removeAtIndex(props.index)} data-testid={`delete-button-${props.index}`}>
                <FaTrash />
            </DropdownItem>
            <DropdownItem onClick={() => {props.placeActions.selectIndex(props.index);props.setCenterView(!props.centerView);}} data-testid={`select-button-${props.index}`}>
                <FaSearchLocation />
            </DropdownItem>
        </ActionsDropdown>
    );
}

function ActionsDropdown(props) {
    return (
        <UncontrolledDropdown direction="left">
            <DropdownToggle tag="div" data-testid={`row-toggle-${props.index}`}>
                <BiDotsVerticalRounded size="1.5em" />
            </DropdownToggle>
            <DropdownMenu>
                <ButtonGroup>
                    {props.children}
                </ButtonGroup>
            </DropdownMenu>
        </UncontrolledDropdown>
    );
}