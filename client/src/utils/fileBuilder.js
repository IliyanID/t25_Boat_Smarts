import { latLngToPlace } from "./transformers"

export function buildTripJSON(places, units, earthRadius) {

    let convertedPlaces = [];
    places.map((place) => {convertedPlaces.push(latLngToPlace(place))});

    const tripJSON = {
        earthRadius: earthRadius,
        units: units,
        places: convertedPlaces,
    };

    return JSON.stringify(tripJSON, null, 2);
}