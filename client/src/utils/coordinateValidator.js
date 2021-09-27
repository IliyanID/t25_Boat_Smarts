export default function validateCoordinates(latitudeString, longitudeString, setValidLatitude, setValidLongitude) {
    const latitudeFloat = latitudeString !== "" ? parseFloat(latitudeString) : 0;
    const validLatitude = typeof latitudeFloat === 'number' && latitudeFloat >= -90 && latitudeFloat <= 90;
    setValidLatitude(validLatitude);
    const longitudeFloat = longitudeString !== "" ? parseFloat(longitudeString) : 0;
    const validLongitude = typeof longitudeFloat === 'number' && longitudeFloat >= -180 && longitudeFloat <= 180;
    setValidLongitude(validLongitude);
}