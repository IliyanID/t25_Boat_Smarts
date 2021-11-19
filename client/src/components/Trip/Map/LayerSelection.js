import React, {useState} from 'react'
import { Popover, Fade } from 'reactstrap';
import '../../../static/styles/layer-selection.scss'
import { Map as LeafletMap, TileLayer} from 'react-leaflet';
import { FiLayers } from 'react-icons/fi'

const IndividualLayer = (props) =>{
    let style = {borderColor:' rgb(70, 70, 70)'}
    if(props.index === props.selectedLayer){
        style.borderColor = '#1abc9c'
    }
    return(
        <div style={props.style} id={props.id} className={'layerSelection ' + props.className}>
            <div style={style} onClick={()=>{
                props.setSelectedLayer(props.index);
                localStorage.setItem('t25-map-layer',props.index)
            }} className='disablePreviewMap'>{props.index}</div>
            <LeafletMap 
                className='previewMap'
                zoom={6}
                center={props.coordinates}
                zoomControl={false} 
                attributionControl={false} 
            >
                    <TileLayer url={props.layers[props.index]}/>
            </LeafletMap>
        </div>
 
    )
}

const LayerButton = (props) =>{
    return <div style={props.style} id={props.id} className={'layerSelection ' + props.className}>
            <div className='disablePreviewMap'><FiLayers style={{marginRight:'5px'}}/>Layers</div>
            <LeafletMap 
                className='previewMap'
                zoom={1}
                center={props.coordinates}
                zoomControl={false} 
                attributionControl={false} 
            >
                    <TileLayer url={props.layers[props.index]}/>
            </LeafletMap>
        </div>
}

export const LayerSelection = (props) =>{
    const [popover,togglePopover] = useState(false)
    return(
        <>
        <LayerButton id='individual-layer-selection' index={props.selectedLayer} style={{position:'absolute',bottom:'5px',left:'5px'}} {...props}/>
        <Popover style={{backgroundColor:'black'}} triggers="click" placement='auto' isOpen={popover} toggle={()=>togglePopover(!popover)} target='individual-layer-selection' >
        

        {
            Object.keys(props.layers).map(item=>{
                return <IndividualLayer id={`layer-selection-${item}`} index={item}  {...props}/>
            })
        }
        </Popover>
        </>
   )
}
export default LayerSelection;