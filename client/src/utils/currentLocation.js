

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