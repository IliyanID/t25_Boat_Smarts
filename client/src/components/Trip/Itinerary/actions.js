import React, { useState, Fragment, useEffect } from 'react';
import { ButtonGroup, Tooltip, Button, Popover} from 'reactstrap';
import { FaHome, FaTrashAlt, FaRoute} from 'react-icons/fa';
import { AiOutlineClose, AiOutlineUndo } from 'react-icons/ai';
import { MdOutlineExpandLess, MdOutlineExpandMore, MdOutlinePanoramaPhotosphereSelect } from 'react-icons/md'
import { BsFileEarmarkFill } from 'react-icons/bs'
import { TiArrowRepeat } from 'react-icons/ti'
import { RiSettings5Fill } from 'react-icons/ri'
import { currentLocation } from '../../../utils/currentLocation';
import { useMultiToggle } from '../../../hooks/useToggle'
import { FiLayers } from 'react-icons/fi'
import { IndividualLayer } from '../Map/LayerSelection'
import { MakeToolTip } from '../../../utils/PreviewModeToolTip';

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
            description:'Add Current Location'
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
            description:'Create Shorter Trip'
        },
        {
            icon:<TiArrowRepeat/>,
            onClick:(props)=>{
                if(props.places.length !== 0){
                    props.placeActions.reverse()
                    props.showMessage('Reversed Trip from Starting Location','info')
                }
            },
            description:'Reverse Trip From Star'
        },
        {
            icon:<RiSettings5Fill/>,
            onClick:(props)=>{
                props.toggleTripSettingsOpen();
            },
            description:'Trip Settings'
        },
        {
            icon:(props)=>{
                if(props.hideMap)
                    return<MdOutlineExpandLess/>
                else
                    return <MdOutlineExpandMore/>
                },
            onClick:(props)=>{
                props.toggleHideMap()

            },
            description:(props)=>{
                if(props.hideMap)
                    return 'Collapse Map'
                return 'Expand Map'
            }
        }
    ]
const ItineraryActionsClick = (props,setToolTip,item) =>{
    if(props.previewTripFocus)
        return 
    item.onClick(props)

}
const checkIfFunc = (func,props) =>{
    let result = func
    if(typeof func === 'function')
        result = func(props)
    return result

}
const addOrRemoveReverseAction = (props) =>{
    return useEffect(()=>{
        let UndoAction = {
            icon:<AiOutlineUndo/>,onClick:(props)=>{
                props.showMessage('Undid Last Action','info')
                props.setPlaces([...props.previousPlaces])
            },description:'Undo Last Action'
        }
        let placesAreEqual = true
        props.places.forEach((place,index)=>{
            if(props.automaticallyRunTour)
                return
            if(props.previousPlaces.length !== props.places.length){
                placesAreEqual = false
                return
            }
            /*let lastPlace = props.previousPlaces[index]
            if(lastPlace.name !== place.name || lastPlace.lat !== place.lat || lastPlace.long !== place.long){
                placesAreEqual = false
                return
            }*/
        })

        if(placesAreEqual)
            props.setPlannerActions([...data])
        else{
            let temp = [...data]
            temp.splice(temp.length - 1,0,{...UndoAction})
            props.setPlannerActions(temp)
        }
    },[props.places])
}
export const ItineraryActionsDropdown = (props) => {
    const [toolTip,setToolTip] = useMultiToggle(false,data.length)
    const [plannerActions,setPlannerActions] = useState([...data])
    addOrRemoveReverseAction({...props,...{plannerActions,setPlannerActions}})
    let orientation = {}
    if(props.hideMap)
        orientation = {vertical:true}
    useEffect(() => {
        if (props.layersOpen)
        document.addEventListener('click', () => {
            props.toggleLayers();})}, [props.layersOpen])
    return (
        <ButtonGroup id='iteneraryActionsDropDown' {...orientation} style={{float:'right',marginBottom:'10px',zIndex:'10000'}}>
        {plannerActions.map((item,index)=>{
                let icon = checkIfFunc(item.icon,props)
                let description = checkIfFunc(item.description,props);
                let id = `home-row-${index}`
                return(<Fragment key={id}>
                            <Button  id={id} onClick={()=>ItineraryActionsClick(props,setToolTip,item)}>{icon}</Button>
                            <Tooltip  placement="auto" isOpen={toolTip[index]} target={id} toggle={() => setToolTip(index)}>{description}
                             </Tooltip>
                        </Fragment>)})}
        <Popover  placement='auto' isOpen={props.layersOpen} toggle={props.toggleLayers} target={`home-row-1`} >
            {Object.keys(props.layers).map((item,key)=>{return <IndividualLayer key={`layerSelect-${key}`} id={`layer-selection-${item}`} index={item}  {...props}/>})}</Popover>    
    </ButtonGroup>);
}



export const PlaceActionsDropdown = (props) => {
    return (
        <div>
            <div>
                <FaHome id={`to-start-${props.index}`} style={{margin:' 0px 10px'}} onClick={()=>{props.placeActions.move(props.index,0)}}/>
                <MakeToolTip target = {`to-start-${props.index}`} placement='bottom' text='Move To Start Of Trip'/>
                <AiOutlineClose id={`delete-${props.index}`} onClick={() => {props.placeActions.removeAtIndex(props.index)}} data-testid={`delete-button-${(props).index}`}/>
                <MakeToolTip target = {`delete-${props.index}`} placement='bottom' text='Remove Place From Trip'/>
            </div>
        </div>
    )
}
