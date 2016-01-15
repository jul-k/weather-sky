$(function() {
    $('.effect').matchHeight({
        target: $('.height-block')
    });

    $.when(getLocation())
        .fail(Fail)
        .then(getWeatherForLocation)
        .then(updateLocalWeather);

    var cities = document.getElementsByClassName("another-city");

    Array.prototype.slice.call(cities).map(loadWeather);
});

var yourCity = document.getElementsByTagName("h3")[0];
var wind = document.getElementsByTagName("h5")[0];
var temperature = document.getElementsByTagName("h2")[0];
var main = document.getElementsByTagName("p")[0];
var keyApi = "e35bf81be57b793b935696723cd40c65";

function Fail(error) {
    console.error(error);
};

function loadWeather(cityElem) {
    var cityApiUrl = "http://api.openweathermap.org/data/2.5/weather?id=" +
        cityElem.getAttribute("data-id") +
        "&APPID=" + keyApi;

    function getWeatherForCity() {
        var deferred = $.Deferred();
        $.getJSON(cityApiUrl, deferred.resolve).fail(deferred.reject);
        return deferred.promise();
    };

    function updateView(data) {
        cityElem.childNodes[1].innerHTML = data.name;
        cityElem.childNodes[3].innerHTML = parseInt(data.wind.speed) + ' m/s';
        cityElem.childNodes[5].innerHTML = parseInt(data.main.temp - 273.15) +
            " C";
        cityElem.childNodes[7].innerHTML = data.weather[0].main;
    }

    $.when(getWeatherForCity())
        .then(updateView);
};

function updateAnotherCityWeather(weather) {

};

function getLocation() {
    var deferred = $.Deferred();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(deferred.resolve, deferred.reject);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
    return deferred.promise();
};

function getWeatherForLocation(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;

    var url = makeApiUrl(lon, lat);
    var deferred = $.Deferred();
    $.getJSON(url, deferred.resolve).fail(deferred.reject);
    return deferred.promise();
};

function updateLocalWeather(weather) {
    yourCity.innerHTML = weather.name;
    wind.innerHTML = parseInt(weather.wind.speed) + ' m/s';
    temperature.innerHTML = parseInt(weather.main.temp - 273.15) + " C";
    main.innerHTML = weather.weather[0].main;
};

function makeApiUrl(lon, lat, appId) {
    appId = appId || keyApi;
    var geocodingAPI = "http://api.openweathermap.org/data/2.5/weather?lat=" +
        lat +
        "&lon=" +
        lon +
        "&APPID=" +
        appId;

    console.log(geocodingAPI);
    return geocodingAPI;
};


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
