$(function() {
    $('.effect').matchHeight({
        target: $('.height-block')
    });
    getLocation();
    console.log("Ready?")
});

var geocodingAPI,
    lon,
    lat;

var x = document.getElementById("current");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(saveCoord);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
};


function saveCoord(position) {
    console.log("My positions", position);
    lat = position.coords.latitude;
    lon = position.coords.longitude;
}

function makeApiUrl(lon, lat, appId) {
    appId = appId || "e35bf81be57b793b935696723cd40c65";
    geocodingAPI = "http://api.openweathermap.org/data/2.5/weather?lat=" +
        lat +
        "&lon=" +
        lon +
        "&APPID=" +
        appId;
    return geocodingAPI;
};

function urlOfMyLocation() {
    return makeApiUrl(lon, lat);
}

$('button').click(function() {
    var url = urlOfMyLocation();
    $.getJSON(url, function(json) {

        // Set the variables from the results array
        var city = json.name;

        x.innerHTML = 'Your city is: ', city;
    });
});

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
};
