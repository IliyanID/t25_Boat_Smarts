export function buildTripJSON(places, units, earthRadius) {

    let convertedPlaces = [];
    for (const place of places) {
        convertedPlaces.push({
            latitude: place.lat.toString(),
            longitude: place.lng.toString(),
            name: place.name
        });
    }

    const tripJSON = {
        earthRadius: earthRadius,
        units: units,
        places: convertedPlaces
    };

    return JSON.stringify(tripJSON, null, 2);
}

export function buildTripCSV(places, units, earthRadius) {
    let retStr = '"earthRadius","units","latitude","longitude", "name"';
    for (const place of places) {
        retStr += singleCSVRow(earthRadius, units, place);
    }
    return retStr;
}

function singleCSVRow(earthRadius, units, place){
    let retStr = '\n' + earthRadius + ',';
    retStr += '"' + units + '",';
    retStr += '"' + place.lat + '",';
    retStr += '"' + place.lng + '",';
    retStr += '"' + place.name + '"';
    return retStr;
}