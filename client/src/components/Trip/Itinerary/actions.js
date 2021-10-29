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

    const reset = () =>{
        setToolTip(defaultArr)
    }
    //To add new button make sure to add reset() to the onClick event or the ToolTip will bug out
    //Make sure to add description of new button inside of descriptions
    // also set the id of the button in the format id = {`index-{index of button in Items}`}
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
                        <div key={`index-${index}`}>
                            {item}
                            <Tooltip placement="left" isOpen={toolTip[index]} target={`index-${index}`}  toggle={()=>toggle(index)}>
                                {descriptions[index]}
                            </Tooltip>
                        </div>)
                        
                    })
                }
        </ActionsDropdown>
    );
}

export function PlaceActionsDropdown(props) {
    let descriptions=["Move Trip to Start","Delete Trip","Center View on Trip"]
    let defaultArr = new Array(descriptions.length).fill(false)
    const [toolTip,setToolTip] = useState(defaultArr)
    const toggle = (index) =>{
        let temp =  [...toolTip]
        temp[index] = !temp[index]
        setToolTip(temp)
    }

    const reset = () =>{
        setToolTip(defaultArr)
    }

    //To add new button make sure to add reset() to the onClick event or the ToolTip will bug out
    //Make sure to add description of new button inside of descriptions
    // also set the id of the bbuton in the format id = {`index-{index of button in Items}-${props.index}`}
    let Items = [
        <DropdownItem onClick={() => {reset();props.placeActions.move(props.index,0);props.setCenterView(!props.centerView);}} id={`index-0-${props.index}`} data-testid={`home-button-${props.index}`}>
            <FaHome />
        </DropdownItem>,
        <DropdownItem onClick={() => {reset();props.placeActions.removeAtIndex(props.index)}} id={`index-1-${props.index}`} data-testid={`delete-button-${props.index}`}>
            <FaTrash />
        </DropdownItem>,
        <DropdownItem onClick={() => {reset();props.placeActions.selectIndex(props.index);props.setCenterView(!props.centerView);}} id={`index-2-${props.index}`} data-testid={`center-button-${props.index}`}>
            <FaSearchLocation />
        </DropdownItem>
    ]

    return (
        <ActionsDropdown id={'test'}{...props}>
        {
            Items.map((item,index)=>{
                if(index === 0 && props.index === 0)
                    return <div key={`index-${index}-${props.index}`}></div>

                return(
                <div key={`index-${index}-${props.index}`}>
                    {item}
                    <Tooltip placement="left" isOpen={toolTip[index]} target={`index-${index}-${props.index}`}  toggle={()=>toggle(index)}>
                        {descriptions[index]}
                    </Tooltip>
                </div>)

            })
        }
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