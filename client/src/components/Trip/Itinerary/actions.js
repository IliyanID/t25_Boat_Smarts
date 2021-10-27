import React, {useState} from 'react';
import { ButtonGroup, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import { BiDotsVerticalRounded, BiSleepy } from 'react-icons/bi';
import { FaHome, FaTrash, FaTrashAlt, FaSearchLocation, FaFileUpload,FaFileDownload, FaRoute} from 'react-icons/fa';
import { DEFAULT_STARTING_PLACE, LOG } from '../../../utils/constants';
import { currentLocation } from '../../../utils/currentLocation';

export function ItineraryActionsDropdown(props) {

    let curr = currentLocation(props.showMessage);

    return (
        <ActionsDropdown {...props}>
            <DropdownItem onClick={() => {curr.latitude!=null ?
                    props.placeActions.append(curr) : props.showMessage("User denied Geolocation. Please turn it on and reload the page.","warning")}} 
                    data-testid='home-button'>
                <FaHome />
            </DropdownItem>
            <DropdownItem onClick={props.toggleFileUploadOpen} data-testid='load-file-button'>
                <FaFileUpload/>
            </DropdownItem>
            <DropdownItem onClick={props.toggleFileDownloadOpen} data-testid='save-file-button'>
                <FaFileDownload/>
            </DropdownItem>
            <DropdownItem onClick={() => {}} data-testid='shorter-trip-button'>
                <FaRoute />
            </DropdownItem>    
            <DropdownItem onClick={() => props.placeActions.removeAll()} data-testid='delete-all-button'>
                <FaTrashAlt />
            </DropdownItem>
        </ActionsDropdown>
    );
}

export function PlaceActionsDropdown(props) {
    return (
        <ActionsDropdown {...props}>
            {(props.index !== 0)&&
            <DropdownItem onClick={() => {props.placeActions.move(props.index,0);props.setCenterView(!props.centerView);}} data-testid={`select-button-${props.index}`}>
                <FaHome />
            </DropdownItem>
            }
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