import React, { useState, useEffect } from 'react';
import { ButtonGroup, DropdownMenu, DropdownToggle, UncontrolledDropdown, Tooltip, Button } from 'reactstrap';
import { BiDotsVerticalRounded, BiSleepy } from 'react-icons/bi';
import { FaHome, FaTrash, FaTrashAlt, FaSearchLocation, FaFileUpload,FaFileDownload, FaRoute} from 'react-icons/fa';
import { AiOutlineClose, AiOutlineRedo} from 'react-icons/ai';
import { BsArrowDownUp } from 'react-icons/bs'
import { DEFAULT_STARTING_PLACE, LOG } from '../../../utils/constants';
import { currentLocation } from '../../../utils/currentLocation';

export const toggle = (index,toolTip,setToolTip) =>{
    let temp =  [...toolTip]
    temp[index] = !temp[index]
    setToolTip(temp)
}

export function ItineraryActionsDropdown(props) {
    let descriptions = ["Add starting Location","Load Trip From File","Save Trip To File","Optimize Trip","Reverse Trip","Delete all Trips"]
    let defaultArr = new Array(descriptions.length).fill(false)

    const [toolTip,setToolTip] = useState(defaultArr)

    //Make sure to add description of new button inside of descriptions
    // also set the id of the button in the format id = {`index-{index of button in Items}`}
    let Items = [
    <FaHome id={`index-0`} onClick={() => {
            currentLocation().then((curr)=>{
                props.placeActions.append(curr) 
            }).catch((e)=>{
                props.showMessage("User denied Geolocation. Please turn it on and reload the page.","warning")
            })
        }}
            
            data-testid='home-button'>
    </FaHome>,
    <FaFileUpload onClick={props.toggleFileUploadOpen} id={`index-1`} data-testid='load-file-button'>
   
    </FaFileUpload>,
    <FaFileDownload onClick={props.toggleFileDownloadOpen} id={`index-2`} data-testid='save-file-button'>

    </FaFileDownload>,
    <FaRoute onClick={props.togglePreviewTripFocus} id={`index-3`} data-testid='shorter-trip-button'>

    </FaRoute>,
    <BsArrowDownUp onClick={()=>{if(props.places.length !== 0){props.placeActions.reverse(); props.showMessage("Succesfully Reversed Trip from Starting Location","info")}}} id={`index-4`} data-testid='reverse-trip-buttom'>

    </BsArrowDownUp>,
    <FaTrashAlt onClick={props.placeActions.removeAll} id={`index-5`} data-testid='delete-all-button'>
 
    </FaTrashAlt>
    ]

    return (

        <ButtonGroup style={{float:'right',marginBottom:'10px'}}>
                {
                    Items.map((item,index)=>{
                        return(
                        <>
                            <Button onClick={()=>setToolTip(defaultArr)}>{item}</Button>
                            <Tooltip placement="left" isOpen={toolTip[index]} target={`index-${index}`}  toggle={()=>toggle(index,toolTip,setToolTip)}>
                                {descriptions[index]}
                            </Tooltip>
                        </>)
                        
                    })
                }
        </ButtonGroup>
          

    );
}

export function PlaceActionsDropdown(props) {
    let descriptions=["Move Trip to Start","Delete Place","Center View on Trip"]
    let defaultArr = new Array(descriptions.length).fill(false)
    const [toolTip,setToolTip] = useState(defaultArr)

    //Make sure to add description of new button inside of descriptions
    // also set the id of the bbuton in the format id = {`index-{index of button in Items}-${props.index}`}
    let Items = [
        <Button onClick={() => {props.placeActions.move(props.index,0);props.setCenterView(!props.centerView);}} id={`index-0-${props.index}`} data-testid={`home-button-${props.index}`}>
            <FaHome />
        </Button>,
  
            <AiOutlineClose onClick={() => {props.placeActions.removeAtIndex(props.index)}} id={`index-1-${props.index}`} data-testid={`delete-button-${props.index}`}/>
,
        <Button onClick={() => {props.placeActions.selectIndex(props.index);props.setCenterView(!props.centerView);}} id={`index-2-${props.index}`} data-testid={`center-button-${props.index}`}>
            <FaSearchLocation />
        </Button>
    ]

    return (
                <div key={`index-${1}-${props.index}`}>
                    <div onClick={()=>setToolTip(defaultArr)}>
                        {Items[1]}
                    </div>

                </div>
    )
    return (
        <ActionsDropdown id={'test'}{...props}>
        {
            Items.map((item,index)=>{
                if(index === 0 && props.index === 0)
                    return <Button key={`index-${index}-${props.index}`}></Button>

                return(
                <Button key={`index-${index}-${props.index}`}>
                    <Button onClick={()=>setToolTip(defaultArr)}>
                        {item}
                    </Button>
                    <Tooltip placement="left" isOpen={toolTip[index]} target={`index-${index}-${props.index}`}  toggle={()=>toggle(index,toolTip,setToolTip)}>
                        {descriptions[index]}
                    </Tooltip>
                </Button>)

            })
        }
        </ActionsDropdown>
    );
}

function ActionsDropdown(props) {
    return (
        <UncontrolledDropdown direction="left">
            <DropdownToggle style={{width:'40px'}} tag="Button" data-testid={`row-toggle-${props.index}`}>
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