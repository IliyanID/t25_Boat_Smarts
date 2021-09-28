import React, {useState} from 'react';
import { ButtonGroup, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import { BiDotsVerticalRounded, BiSleepy } from 'react-icons/bi';
import { FaHome, FaTrash, FaTrashAlt, FaSearchLocation } from 'react-icons/fa';
import { DEFAULT_STARTING_PLACE } from '../../../utils/constants';
import { currentLocation } from '../../../utils/currentLocation';

export function ItineraryActionsDropdown(props) {

    

    return (
        <ActionsDropdown {...props}>
            <DropdownItem onClick={() => {let coord = currentLocation(props.showMessage);props.placeActions.append(coord);}} data-testid='home-button'>
                <FaHome />
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