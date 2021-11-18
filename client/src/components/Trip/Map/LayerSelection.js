import React, { useRef } from 'react'
import '../../../static/styles/layer-selection.scss'
import { Map as LeafletMap, TileLayer} from 'react-leaflet';

export const LayerSelection = (props) =>{
    const map = useRef()

    return(
        <div className='layerSelection'>
            <div onClick={()=>props.setSelectedLayer(props.layers.satelite)} className='disablePreviewMap'>Layers</div>
            <LeafletMap 
                className='previewMap'
                zoom={1}
                center={props.coordinates}
                zoomControl={false} 
                ref={map} 
                attributionControl={false} 
            >
                    <TileLayer url={props.layers.satelite}/>
            </LeafletMap>
        </div>
    )
}
export default LayerSelection;