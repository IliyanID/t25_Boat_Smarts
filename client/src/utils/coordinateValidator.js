export default function validateCoordinates(latitudeString, longitudeString) {
    const latitudeElement = document.getElementById('latitude');
    const longitudeElement = document.getElementById('longitude');

    if (latitudeString) {
        const validLatitude = isValidLatitude(latitudeString);
        if (validLatitude) {
            addValidBorder(latitudeElement);
        } else {
            addInvalidBorder(latitudeElement);
        }
    } else {
        removeBorders(latitudeElement);
    }
    if (longitudeString) {
        const validLongitude = isValidLongitude(longitudeFloat);
        if (validLongitude) {
            addValidBorder(longitudeElement);
        } else {
            addInvalidBorder(longitudeElement);
        }
    }
    else {
        removeBorders(longitudeElement);
    }
}

function isValidLatitude(latitudeString) {
    const latitudeFloat = parseFloat(latitudeString);
    return typeof latitudeFloat === 'number' && latitudeFloat >= -90 && latitudeFloat <= 90;
}

function isValidLongitude(longitudeString) {
    const longitudeFloat = parseFloat(longitudeString);
    return typeof longitudeFloat === 'number' && longitudeFloat >= -180 && longitudeFloat <= 180;
}

function addValidBorder(element) {
    element.valid = true;
    element.invalid = false;
}

function addInvalidBorder(element) {
    element.valid = false;
    element.invalid = true;
}

function removeBorders(element) {
    element.classList.remove('is-valid');
    element.classList.remove('is-invalid');
}