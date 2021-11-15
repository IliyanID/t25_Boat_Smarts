

export async function currentLocation (){

    let position = await getPosition(); 
    return {latitude: position.coords.latitude,longitude: position.coords.longitude}

};

function getPosition() {
    // Simple wrapper
    return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej);
    });
}

export const checkBounds = (latLng,showMessage) =>{
     if(latLng.lat < -90 || latLng.lat > 90 || latLng.lng < -180 || latLng.lng > 180){
      showMessage('Out of Bounds', 'error')
      return true
    }
    return false
}