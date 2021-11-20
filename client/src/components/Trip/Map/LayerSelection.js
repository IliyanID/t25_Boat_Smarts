import React, {useState} from 'react'
import { Popover, Fade } from 'reactstrap';
import '../../../static/styles/layer-selection.scss'
import { Map as LeafletMap, TileLayer} from 'react-leaflet';
import { FiLayers } from 'react-icons/fi'

export const IndividualLayer = (props) =>{
    let style = {borderColor:' rgb(70, 70, 70)'}
    if(props.index === props.selectedLayer){
        style.border = '4px solid #1abc9c'
    }
    return(
        <div style={props.style} id={props.id} className={'layerSelection ' + props.className}>
            <div style={style} onClick={()=>{
                props.setSelectedLayer(props.index);
                localStorage.setItem('t25-map-layer',props.index)
                props.toggleLayers()
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


export default IndividualLayer;