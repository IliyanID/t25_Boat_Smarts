import React from 'react';
import { ButtonGroup, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { FaHome, FaTrash, FaTrashAlt } from 'react-icons/fa';
import { DEFAULT_STARTING_PLACE } from '../../../utils/constants';

export default class CurrentLocation{
	state = {
		lat: null,
        lng: null
	};

	findCoordinates = () => {
		navigator.geolocation.getCurrentPosition(
			position => {
				this.setState({ lat: position.coords.latitude });
                this.setState({ lng: position.coords.longitude});
                //console.log(this.state)
			},
		);
	};

}

export function ItineraryActionsDropdown(props) {

    let i = new CurrentLocation;

    i.findCoordinates();

    //console.log(i.state);

    return (
        <ActionsDropdown {...props}>
            <DropdownItem onClick={() => props.placeActions.append(i.state)} data-testid='home-button'>
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