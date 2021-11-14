import { useEffect } from 'react'

import { convertPlace } from './Itinerary/Modals/FileUploadModal'
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
            earthRadius:EARTH_RADIUS_UNITS_DEFAULT.miles
        },currentURL).then((response)=>{
                if(response)
                    allPackages.setDistances(response)
                else    
                    allPackages.setDistances({distances: []});
            })
        if(allPackages.selectedIndex != -1 && allPackages.places.length > allPackages.previousPlaces.length ){
            props.showMessage("Added to Trip " + allPackages.places[allPackages.selectedIndex].name,"info")            
        }
    },[allPackages.places]);
}

export const handleTourRequest = (allPackages,props) =>{
    return useEffect(()=>{
        const {currentURL,convertedPlaces} = prepForAPIRequest({...props},{...allPackages})
        if((allPackages.previewTripFocus || allPackages.automaticallyRunTour) && allPackages.places.length > allPackages.previousPlaces.length){
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
                    }
                })

            window.scrollTo({
                top: 0,
                behavior: 'smooth'
              })
        }
    },[allPackages.previewTripFocus,allPackages.automaticallyRunTour,allPackages.places])
}