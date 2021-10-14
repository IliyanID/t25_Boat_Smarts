import { describe, expect, it } from "@jest/globals";
import {buildTripJSON, buildTripCSV} from "../../src/utils/fileBuilder";
import {isJsonResponseValid} from "../../src/utils/restfulAPI";
import * as tripSchema from '../../schemas/TripFile';
import { latLngToPlace } from "../../src/utils/transformers"

describe('fileBuilder', () => {
    const places1 = [
        {
            lat: 40,
            lng: -105,
            name: "Place1"
        },
        {
            lat: 29.979,
            lng: 31.134,
            name: "Place2"
        },
        {
            lat: 87,
            lng: 123,
            name: "Place3"
        }
    ];

    let convertedPlaces1 = [];
    for (const place of places1) {
        convertedPlaces1.push({
            latitude: place.lat.toString(),
            longitude: place.lng.toString(),
            name: place.name
        });
    }

    it('returns a valid JSON object', () =>{
        let tripStr = buildTripJSON(places1, "km", 6371);
        let tripObject = JSON.parse(tripStr);
        expect(isJsonResponseValid(tripObject, tripSchema)).toBeTruthy();
    })

    it('corectly stores places in JSON', () =>{
        let tripStr = buildTripJSON(places1, "km", 6371);
        let tripObject = JSON.parse(tripStr);
        expect(tripObject.places).toEqual(convertedPlaces1);
    })

    it('returns a CSV with the right number of lines', () =>{
        let tripCSV = buildTripCSV(places1, "km", 6731);
        let tripLines = tripCSV.split('\n');
        expect(tripLines.length).toEqual(places1.length+1);
    })

    it('returns a CSV with the right number of column headers', () =>{
        let tripCSV = buildTripCSV(places1, "km", 6731);
        let tripLines = tripCSV.split('\n');
        let firstLine = tripLines[0].split(',');
        expect(firstLine.length).toEqual(5);
    })

})