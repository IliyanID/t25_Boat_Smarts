import React, {Component} from 'react';
import { ButtonGroup, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import { BiDotsVerticalRounded, BiSleepy } from 'react-icons/bi';
import { FaHome, FaTrash, FaTrashAlt, FaSearchLocation } from 'react-icons/fa';
import { DEFAULT_STARTING_PLACE } from '../../../utils/constants';

export default class CurrentLocation extends Component{
    state = {
        latitude: DEFAULT_STARTING_PLACE.latitude,
        longitude: DEFAULT_STARTING_PLACE.longitude
    };
    
findCurrentLocation = (props) => {
    if (!navigator.geolocation){
        //ToDo
        //Add popup for if the users browser doesnt have location services turned on
        let message = "Broswer Location not turned on. Adding default location."
        props.showMessage(message,"warning")
    }else{
        window.navigator.geolocation.getCurrentPosition(
        position => {
            this.state.latitude = position.coords.latitude;
            this.state.longitude = position.coords.longitude;
        }
        );
    }

};
};
export function ItineraryActionsDropdown(props) {

     let userLocation = new CurrentLocation();

     userLocation.findCurrentLocation(props);

    return (
        <ActionsDropdown {...props}>
            <DropdownItem onClick={() => props.placeActions.append(userLocation.state)} data-testid='home-button'>
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