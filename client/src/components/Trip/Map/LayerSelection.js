import React from 'react'
import '../../../static/styles/layer-selection.scss'
import { Map as LeafletMap, TileLayer} from 'react-leaflet';

const IndividualLayer = (props) =>{
    return(
        <div className='layerSelection'>
            <div onClick={()=>props.setSelectedLayer(props.layers[props.index])} className='disablePreviewMap'>Layers</div>
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
 
    )
}

export const LayerSelection = (props) =>{

    return(
        <>
        {
            Object.keys(props.layers).map(item=>{
                return <IndividualLayer index={item}  {...props}/>
            })
        }
        </>
   )
}
export default LayerSelection;