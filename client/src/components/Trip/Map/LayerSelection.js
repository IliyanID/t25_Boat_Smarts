import React from 'react'
import '../../../static/styles/layer-selection.scss'

export const LayerSelection = (props) =>{
    return(
        <div className='layerSelection'>
            <img src='https://maps.gstatic.com/tactile/layerswitcher/ic_terrain-2x.png' alt='terrain'/>
        </div>
    )
}
export default LayerSelection;