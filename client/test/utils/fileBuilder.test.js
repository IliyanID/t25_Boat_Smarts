import { describe, expect, it } from "@jest/globals";
import {buildTripJSON, buildTripCSV, buildTripSVG, buildTripKML} from "../../src/utils/fileBuilder";
import {isJsonResponseValid} from "../../src/utils/restfulAPI";
import * as tripSchema from '../../schemas/TripFile';
import { latLngToPlace } from "../../src/utils/transformers"

describe('fileBuilder', () => {
    const places0 = []

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

    it('returns a SVG with the base map', () =>{
        let tripSVG = buildTripSVG(places0);
        let tripLines = tripSVG.split('\n');
        expect(tripLines.length).toBeGreaterThan(7);
    })

    it('adds a line and a circle for every place', () =>{
        let fullTripSVG = buildTripSVG(places1);
        let fullTripLines = fullTripSVG.split('\n');
        let emptyTripLines = buildTripSVG(places0).split('\n');
        let addedLines = places1.length * 2;
        expect(fullTripLines.length).toEqual(emptyTripLines.length + addedLines);
    })

    it('returns a KML with the base tags and style', () =>{
        let tripKML = buildTripKML(places0, "name");
        let tripLines = tripKML.split('\n');
        expect(tripLines.length).toBeGreaterThan(15);
    })

    it('KML adds a line and a point for every place', () =>{
        let fullTripKML = buildTripKML(places1, "name");
        let fullTripLines = fullTripKML.split('\n');
        let emptyTripLines = buildTripKML(places0, "name").split('\n');
        let addedLines = places1.length * 17;
        expect(fullTripLines.length).toEqual(emptyTripLines.length + addedLines);
    })

})