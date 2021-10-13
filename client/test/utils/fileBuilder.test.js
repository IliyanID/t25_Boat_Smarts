import { describe, expect, it } from "@jest/globals";
import {buildTripJSON} from "../../src/utils/fileBuilder";
import {isJsonResponseValid} from "../../src/utils/restfulAPI";
import * as tripSchema from '../../schemas/TripFile';
import { latLngToPlace } from "../../src/utils/transformers"

describe('fileBuilder', () => {
    const places1 = [
        {
            lat: 40,
            lng: -105
        },
        {
            lat: 29.979,
            lng: 31.134
        }
    ];

    it('returns a valid JSON object', () =>{
        let tripStr = buildTripJSON(places1, "km", 6371);
        let tripObject = JSON.parse(tripStr);
        expect(isJsonResponseValid(tripObject, tripSchema)).toBeTruthy();
    })

    it('corectly stores places', () =>{
        let tripStr = buildTripJSON(places1, "km", 6371);
        let tripObject = JSON.parse(tripStr);
        let convertedPlaces1 = [];
        places1.map((place) => {convertedPlaces1.push(latLngToPlace(place))});
        expect(tripObject.places).toEqual(convertedPlaces1);
    })

})