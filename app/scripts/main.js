$(function() {
    var cities = document.getElementsByClassName("another-city");
    Array.prototype.slice.call(cities).map(loadWeather);

    $.when(getLocation())
        .fail(showError)
        .then(getWeatherForLocation)
        .then(updateLocalWeather);

    $.when(getLocation())
        .then(dailyForecast)
        .then(renderForecast);
});
