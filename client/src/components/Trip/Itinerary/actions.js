import React, { useState, Fragment } from 'react';
import { ButtonGroup, Tooltip, Button, Popover} from 'reactstrap';
import { FaHome, FaTrashAlt, FaRoute} from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { BsFileEarmarkFill } from 'react-icons/bs'
import { TiArrowRepeat } from 'react-icons/ti'
import { RiSettings5Fill } from 'react-icons/ri'
import { currentLocation } from '../../../utils/currentLocation';
import { useToggle } from '../../../hooks/useToggle'
import { FiLayers } from 'react-icons/fi'
import { IndividualLayer } from '../Map/LayerSelection'

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
            icon:<FiLayers/>,
            onClick:(props)=>{}
            ,description:'Change Map Layers'
        },
        {
            icon:<BsFileEarmarkFill/>,
            onClick:(props)=>{
                props.toggleFileActions()
            },
            description:'Download or Upload Trip'
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
    const [popover,togglePopover] = useState(false)
    return (
         <ButtonGroup vertical style={{float:'right',marginBottom:'10px',zIndex:'10000'}}>
        {data.map((item,index)=>{
                let id = `home-row-${index}`
                return(
                <Fragment key={id}>
                    <Button  id={id} onClick={() => { 
                        if(props.previewTripFocus)
                            return
                        setToolTip(defaultArr); 
                        item.onClick(props) }}>{item.icon}</Button>
                    <Tooltip  placement="right" isOpen={toolTip[index]} target={id} toggle={() => toggle(index, toolTip, setToolTip)}>
                        {item.description}
                    </Tooltip>
            
                </Fragment>)
            })}
        <Popover  placement='left' isOpen={popover} toggle={()=>togglePopover(!popover)} target={`home-row-1`} >
            {
                Object.keys(props.layers).map((item,key)=>{
                    return <IndividualLayer key={`layerSelect-${key}`} id={`layer-selection-${item}`} index={item}  {...props}/>
                })
            }
        </Popover>
        
    </ButtonGroup>

    );
}



export const PlaceActionsDropdown = (props) => {
    const [tooltip,toggleToolTip] = useToggle(false)
    return (
        <div>
            <div onClick={()=>setToolTip(defaultArr)}>
                <FaHome id={`to-start-${props.index}`} style={{margin:' 0px 10px'}} onClick={()=>{props.placeActions.move(props.index,0)}}/>
                <Tooltip placement='bottom' isOpen={tooltip}  toggle={toggleToolTip} target={`to-start-${props.index}`}>
                    Move to Start of Trip
                </Tooltip>
                <AiOutlineClose onClick={() => {props.placeActions.removeAtIndex(props.index)}} data-testid={`delete-button-${(props).index}`}/>
            </div>
        </div>
    )
}