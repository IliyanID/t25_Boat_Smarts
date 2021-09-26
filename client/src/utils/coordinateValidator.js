export default function validateCoordinates(latitudeString, longitudeString, setValidLatitude, setValidLongitude) {
    const latitudeFloat = parseFloat(latitudeString);
    const validLatitude = typeof latitudeFloat === 'number' && latitudeFloat >= -90 && latitudeFloat <= 90;
    setValidLatitude(validLatitude);
    const longitudeFloat = parseFloat(longitudeString);
    const validLongitude = typeof longitudeFloat === 'number' && longitudeFloat >= -180 && longitudeFloat <= 180;
    setValidLongitude(validLongitude);
}