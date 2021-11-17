import React, { useState, Fragment } from 'react';
import { ButtonGroup, Tooltip, Button } from 'reactstrap';
import { FaHome, FaTrashAlt, FaFileUpload,FaFileDownload, FaRoute} from 'react-icons/fa';
import { AiOutlineClose, AiOutlineRedo} from 'react-icons/ai';
import { TiArrowRepeat } from 'react-icons/ti'
import { RiSettings5Fill } from 'react-icons/ri'
import { currentLocation } from '../../../utils/currentLocation';

export const toggle = (index,toolTip,setToolTip) =>{
    let temp =  [...toolTip]
    temp[index] = !temp[index]
    setToolTip(temp)
}
    const data = [
   
        {
            icon:<FaHome/>,
            onClick:(props)=>{
                currentLocation().then((curr)=>{
                    curr.name='Current Location'
                    props.placeActions.append(curr)
                }).catch(()=>{
                    props.showMessage('Geolocation disabled. Please turn it on and reload the page','warning')
                })
            },
            description:'Add starting Location'
        },
        {
            icon:<FaFileUpload/>,
            onClick:(props)=>{
                props.toggleFileUploadOpen()
            },
            description:'Load Trip From File'
        },
        {
            icon:<FaFileDownload/>,
            onClick:(props)=>{
                props.toggleFileDownloadOpen()
            },
            description:'Save Trip To File' 
        },
        {
            icon:<FaRoute/>,
            onClick:(props)=>{
                props.togglePreviewTripFocus(); 
            },
            description:'Create shorter trip'
        },
        {
            icon:<TiArrowRepeat/>,
            onClick:(props)=>{
                if(props.places.length !== 0){
                    props.placeActions.reverse()
                    props.showMessage('Reversed Trip from Starting Location','info')
                }
            },
            description:'Reverse trip from start'
        },
        {
            icon:<RiSettings5Fill/>,
            onClick:(props)=>{
                props.toggleTripSettingsOpen();
            },
            description:'Trip Settings'
        },
        {
            icon:<FaTrashAlt/>,
            onClick:(props)=>{
                props.placeActions.removeAll()
            },
            description:'Delete Current Trip'
        }
    ]
export const ItineraryActionsDropdown = (props) => {
    let defaultArr = new Array(data.length).fill(false)
    const [toolTip,setToolTip] = useState(defaultArr)
    return (
    <ButtonGroup style={{float:'right',marginBottom:'10px'}}>
        {
            data.map((item,index)=>{
                let id = `home-row-${index}`
                return(
                <Fragment key={id}>
                    <Button id={id} onClick={() => { setToolTip(defaultArr); item.onClick(props) }}>{item.icon}</Button>
                    <Tooltip placement="bottom" isOpen={toolTip[index]} target={id} toggle={() => toggle(index, toolTip, setToolTip)}>
                        {item.description}
                    </Tooltip>
                </Fragment>)
            })
        }
    </ButtonGroup>
    );
}

export const PlaceActionsDropdown = (props) => {
    return (
        <div>
            <div onClick={()=>setToolTip(defaultArr)}>
                <FaHome style={{margin:' 0px 10px'}} onClick={()=>{props.placeActions.move(props.index,0)}}/>
                <AiOutlineClose onClick={() => {props.placeActions.removeAtIndex(props.index)}} id={`index-1-${props.index}`} data-testid={`delete-button-${(props).index}`}/>
            </div>
        </div>
    )
}