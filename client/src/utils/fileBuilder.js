import {lines} from '../static/images/baseMapText.json';

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
    let retStr = 'earthRadius,units,latitude,longitude,name';
    for (const place of places) {
        retStr += `\n${earthRadius},${units},${place.lat},${place.lng},${place.name}`;
    }
    return retStr;
}

export function buildTripSVG(places) {
    let retStr = '<?xml version="1.0" encoding="UTF-8"?>\n';
    retStr += '<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="512">\n';
    retStr += baseMapSVG();
    retStr += ' <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 180">\n';
    retStr += '		<g transform="matrix(1,0,0,-1,180,90)">\n';
    for (var i = 0; i < places.length; ++i){
    retStr += `         <line id="${places[i].name}out" x1="${places[i].lng}" y1="${places[i].lat}" x2="${places[(i+1)%places.length].lng}" y2="${places[(i+1)%places.length].lat}" stroke="blue" stroke-width="1.5"/>\n`
    retStr += `         <circle id="${places[i].name}" cx="${places[i].lng}" cy="${places[i].lat}" r=".75" stroke="blue" stroke-width="0" fill="blue" />\n`
    }
    retStr += '     </g>\n'
    retStr += ' </svg>\n'
    retStr += '</svg>\n'
    return retStr;
}


function baseMapSVG() {
    var text = ""
    for (const line of lines){
        text += line;
    }
    return text
}

export function buildTripKML(places, tripName){
    var retStr = '<?xml version="1.0" encoding="UTF-8"?>\n'
    retStr += '<kml xmlns="http://www.opengis.net/kml/2.2" xmlns:gx="http://www.google.com/kml/ext/2.2" xmlns:kml="http://www.opengis.net/kml/2.2" xmlns:atom="http://www.w3.org/2005/Atom">\n'
    retStr += ' <Document>\n'
    retStr += baseKML(tripName)
    for (var i = 0; i < places.length; ++i){
        retStr += singlePlaceKML(places[i])
        retStr += singleLineKML(places[i], places[(i+1)%places.length])
    }
    retStr += ' </Document>\n'
    retStr += '</kml>\n'
    return retStr;
}

function baseKML(tripName){
    return `  <name>${tripName}</name>
    <open>1</open>
    <description>Built using The Boat Smarts' trip planner application for cs314 at CSU</description>
    <Style id="CrossStyle">
      <LineStyle>
        <color>ffffffb6</color>
        <width>4</width>
      </LineStyle>
      <IconStyle>
       <Icon>
	<href>https://earth.google.com/earth/rpc/cc/icon?color=1976d2&amp;id=2000&amp;scale=4</href>
       </Icon>
      </IconStyle>
    </Style>
      `
}

function singlePlaceKML(place){
    return `<Placemark> 
    <name> ${place.name} </name> 
    <styleUrl>#CrossStyle</styleUrl>
    <Point>
     <coordinates>
      ${place.lng},${place.lat}
     </coordinates>
    </Point> 
   </Placemark>
   `
}

function singleLineKML(place1, place2){
    return `<Placemark>
    <name>${place1.name} to ${place2.name}</name>
    <styleUrl>#CrossStyle</styleUrl>
    <LineString>
      <coordinates> ${place1.lng},${place1.lat},0
      ${place2.lng},${place2.lat},0 </coordinates>
    </LineString>
    </Placemark>
    `
}


