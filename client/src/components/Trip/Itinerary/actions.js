import React, { useState, useEffect } from 'react';
import { ButtonGroup, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown, Tooltip } from 'reactstrap';
import { BiDotsVerticalRounded, BiSleepy } from 'react-icons/bi';
import { FaHome, FaTrash, FaTrashAlt, FaSearchLocation, FaFileUpload,FaFileDownload, FaRoute} from 'react-icons/fa';
import { AiOutlineRedo} from 'react-icons/ai';
import { DEFAULT_STARTING_PLACE, LOG } from '../../../utils/constants';
import { currentLocation } from '../../../utils/currentLocation';

export function ItineraryActionsDropdown(props) {
    let defaultArr = [false,false,false,false,false,false];
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


    return (
        <ActionsDropdown {...props}>
            <DropdownItem id="addHome" onClick={() => {reset();curr.latitude!=null ?
                    props.placeActions.append(curr) : props.showMessage("User denied Geolocation. Please turn it on and reload the page.","warning")}} 
                    data-testid='home-button'>
                <FaHome />
            </DropdownItem>
                <Tooltip placement="left" isOpen={toolTip[0]} target="addHome" toggle={()=>toggle(0)}>
                        Add starting Location
                </Tooltip>

            <DropdownItem id='load-file-button' onClick={()=>{reset();props.toggleFileUploadOpen()}} data-testid='load-file-button'>
                <FaFileUpload/>
            </DropdownItem>
                <Tooltip   Tooltip placement="left" isOpen={toolTip[1]} target="load-file-button" toggle={()=>toggle(1)}>
                        Load Trip From File
                </Tooltip>

            <DropdownItem onClick={()=>{reset();props.toggleFileDownloadOpen()}} id='save-file-button' data-testid='save-file-button'>
                <FaFileDownload/>
            </DropdownItem>
                <Tooltip placement="left" isOpen={toolTip[2]} target="save-file-button" toggle={()=>toggle(2)}>
                        Save Trip To File
                </Tooltip>

            <DropdownItem onClick={() => {reset();}} id='shorter-trip-button' data-testid='shorter-trip-button'>
                <FaRoute />
            </DropdownItem> 
                <Tooltip placement="left" isOpen={toolTip[3]} target="shorter-trip-button" toggle={()=>toggle(3)}>
                        Optimize Trip
                </Tooltip>

            <DropdownItem id='reverse-trip-buttom' data-testid='reverse-trip-buttom' onClick={() => {reset();props.placeActions.reverse()}}>
                <AiOutlineRedo/>
            </DropdownItem>
                <Tooltip placement="left" isOpen={toolTip[4]} target="reverse-trip-buttom" toggle={()=>toggle(4)}>
                        Reverse Trip
                </Tooltip>

            <DropdownItem onClick={() => {reset();props.placeActions.removeAll()}} id='delete-all-button' data-testid='delete-all-button'>
                <FaTrashAlt />
            </DropdownItem>
                <Tooltip placement="left" isOpen={toolTip[5]} target="delete-all-button" toggle={()=>toggle(5)}>
                        Delete all Trips
                </Tooltip>
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