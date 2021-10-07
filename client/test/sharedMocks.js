export const VALID_CONFIG_RESPONSE = JSON.stringify({
    requestType: 'config',
    serverName: 't99',
    features: ['config']
});

export const INVALID_REQUEST = JSON.stringify({
    invalid: 'this is an invalid response to fail the schema'
});

export const MOCK_PLACES = [
    { id: 1, name: 'Place A', lat: 40.0, lng: 50.0, country: 'Unknown'},
    { id: 2, name: 'Place B', lat: -45.0, lng: -55.0, country: 'Unknown'},
    { id: 3, name: '', lat: 60.0, lng: -150.0, country: 'Unknown'}
];

export const MOCK_LATLNG_LOCATION = {
    name: 'Lat Long',
    lat: 40,
    lng: -105
}

export const MOCK_RESULT_POSITIVE = {
    name: 'Test Location',
    latitude: '40',
    longitude: '30',
    iso_country: 'Testland',
    id: 16
}

export const MOCK_RESULT_NEGATIVE = {
    name: 'Other Test Location',
    latitude: '-40',
    longitude: '-30',
    iso_country: 'Testland',
    id: 17
}

export const MOCK_FIND_RESPONSE = JSON.stringify(
    {
        "match": "Reading",
        "limit": 0,
        "found": 5,
        "places": [
            {
                "altitude": "70",
                "iso_country": "US",
                "latitude": "40.64440155029297",
                "name": "Hess Port Reading Heliport",
                "municipality": "Port Reading",
                "id": "13JY",
                "longitude": "-74.24530029296875"
            },
            {
                "altitude": "224",
                "iso_country": "US",
                "latitude": "40.3317985534668",
                "name": "Reading Hospital \u0026 Medical Center Heliport",
                "municipality": "Reading",
                "id": "96PN",
                "longitude": "-75.95659637451172"
            },
            {
                "altitude": "320",
                "iso_country": "US",
                "latitude": "40.33060073852539",
                "name": "Reading Hospital Heliport",
                "municipality": "West Reading",
                "id": "9PS5",
                "longitude": "-75.95020294189453"
            },
            {
                "altitude": "344",
                "iso_country": "US",
                "latitude": "40.378501892089844",
                "name": "Reading Regional Carl A Spaatz Field",
                "municipality": "Reading",
                "id": "KRDG",
                "longitude": "-75.96520233154297"
            },
            {
                "altitude": "700",
                "iso_country": "US",
                "latitude": "42.54999923706055",
                "name": "Reading Airport",
                "municipality": "Fennville",
                "id": "MI76",
                "longitude": "-86.2166976928711"
            }
        ],
        "requestType": "find"
    }
)

export const REVERSE_GEOCODE_RESPONSE = JSON.stringify({
    "place_id": 259127396,
    "licence": "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
    "osm_type": "relation",
    "osm_id": 8539568,
    "lat": "40.57066025",
    "lon": "-105.08539645568865",
    "place_rank": 30,
    "category": "amenity",
    "type": "university",
    "importance": 0.4948531325947546,
    "addresstype": "amenity",
    "name": "Colorado State University",
    "display_name": "Colorado State University, South College Avenue, Fort Collins, Larimer County, Colorado, 80525-1725, United States",
    "address": {
        "amenity": "Colorado State University",
        "road": "South College Avenue",
        "city": "Fort Collins",
        "county": "Larimer County",
        "state": "Colorado",
        "postcode": "80525-1725",
        "country": "United States",
        "country_code": "us"
    },
    "boundingbox": [
        "40.5527786",
        "40.5789122",
        "-105.0972937",
        "-105.0721817"
    ]
});