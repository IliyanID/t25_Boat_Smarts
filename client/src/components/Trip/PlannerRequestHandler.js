import { useEffect } from 'react'

import { convertPlace } from './Itinerary/Modals/FileUpload'
import { sendAPIRequest, getOriginalServerUrl } from "../../utils/restfulAPI"
import { EARTH_RADIUS_UNITS_DEFAULT } from "../../utils/constants"
import { latLngToPlace } from "../../utils/transformers"

const prepForAPIRequest = (props,packagedUtilPlaces) =>{
    let serverURLSet = props.serverSettings && props.serverSettings.serverUrl;
    let currentURL = serverURLSet ? props.serverSettings.serverUrl : getOriginalServerUrl();
    let convertedPlaces = [];
    
    let convertPlacesFunc = (place) =>{
        let temp = latLngToPlace(place);
        temp['name'] = place.name;
        convertedPlaces.push(temp);
     }
     packagedUtilPlaces.places.map(convertPlacesFunc);

    return {currentURL,convertedPlaces}
}

export const handleConfigRequest = (allPackages,props) =>{
    return useEffect(()=>{
        const {currentURL} = prepForAPIRequest({...props},{...allPackages})
        
        const checkAndApplyLimit = (limit,setLimit,response)=>{
            if(response){
                let temp = {...limit}
                temp.response = response;
                setLimit(temp)
            }
            else
                setLimit({request:[],response:[]})
        }

            sendAPIRequest({
                requestType:'config',
            },currentURL).then((response)=>{
                    
                    if(!response)
                        return
                    
                    checkAndApplyLimit(allPackages.limitTypes,allPackages.setLimitTypes,response.type)
                    checkAndApplyLimit(allPackages.limitWhere,allPackages.setLimitWhere,response.where)
                })
    },[props.serverSettings]);
} 

export const handleDistancesRequest = (allPackages,props) =>{
    return useEffect(()=>{
        const {currentURL,convertedPlaces} = prepForAPIRequest({...props},{...allPackages})
        sendAPIRequest({
            requestType:'distances',
            places:convertedPlaces,
            earthRadius:parseInt(localStorage.getItem("fileUnitsValue") != null ? localStorage.getItem("fileUnitsValue") : EARTH_RADIUS_UNITS_DEFAULT.miles)
        },currentURL).then((response)=>{
                if(response)
                    allPackages.setDistances(response)
                else    
                    allPackages.setDistances({distances: []});
            })
        
    },[allPackages.places, allPackages.tripSettingsOpen]);
}

export const placeUpdateMessage = (allPackages, props) => {
    return useEffect(()=>{
        if(allPackages.selectedIndex != -1 && allPackages.places.length > allPackages.previousPlaces.length ){
            props.showMessage("Added to Trip " + allPackages.places[allPackages.selectedIndex].name,"info")            
        }
    },[allPackages.places]);
}

const sendTourApiCall = (allPackages,props,selectedIndex) =>{
    const {currentURL,convertedPlaces} = prepForAPIRequest({...props},{...allPackages})
            
            let tempPlace= {name:null,lat:null,lng:null};
            if(selectedIndex >= 0 && selectedIndex < allPackages.places.length)
                tempPlace = allPackages.places[selectedIndex]

            allPackages.setOrigionalPlaces([...allPackages.places])            
            sendAPIRequest({
                requestType:'tour',
                places:convertedPlaces,
                earthRadius:EARTH_RADIUS_UNITS_DEFAULT.miles,
                response: 1
            },currentURL).then((response)=>{
                    if(response){
                        let convertedPlaces = response.places.map(place => convertPlace(place))
                        allPackages.setAllPlaces(convertedPlaces);
                        convertedPlaces.forEach((item,index)=>{
                            if(item.name === tempPlace.name && item.lat === tempPlace.lat && item.lng === tempPlace.lng){
                                allPackages.setSelectedIndex(index)
                                return
                            }
            })

                    }
                })
           
}
export const handleTourRequest = (allPackages,props) =>{
    return useEffect(()=>{
            if(allPackages.previewTripFocus)
                sendTourApiCall(allPackages,props,allPackages.selectedIndex)        
            /*window.scrollTo({
                top: 0,
                behavior: 'smooth'
              })*/
    },[allPackages.previewTripFocus])
}
export const handleAutoTour = (allPackages,props) =>{
    

    return useEffect(()=>{
        if(allPackages.automaticallyRunTour && allPackages.places.length !== allPackages.previousPlaces.length){
                      sendTourApiCall(allPackages,props,allPackages.selectedIndex)

           
        }
   },[allPackages.automaticallyRunTour,allPackages.places])
 
}