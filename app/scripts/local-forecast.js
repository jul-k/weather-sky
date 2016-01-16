function forecastUrl(lon, lat, days) {
    days = days || 4
    var geocodingDailyApi =
        "https://weather-sky.herokuapp.com/data/2.5/forecast/daily?lat=" +
        lat +
        "&lon=" + lon +
        "&APPID=" + keyApi +
        '&cnt=' + days;
    return geocodingDailyApi;
}

function dailyForecast(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    var dailyApiUrl = forecastUrl(lon, lat);

    var deferred = $.Deferred();
    $.getJSON(dailyApiUrl, deferred.resolve).fail(deferred.reject);
    return deferred.promise();
}

function renderForecast(forecast) {
    var daily = document.getElementsByClassName("daily-forecast");
    daily = Array.prototype.slice.call(daily);
    var forecastList = forecast.list.slice(1);
    _.zip(daily, forecastList).map(function(pair) {
        console.log(pair);
        var el = pair[0];
        var weather = pair[1];

        var formattedDate = moment.unix(weather.dt).format("ll");

        el.childNodes[1].innerHTML = formattedDate;
        el.childNodes[3].innerHTML = parseInt(weather.speed) +
            ' m/s';
        el.childNodes[5].innerHTML = parseInt(weather.temp.day -
                273.15) +
            " C";
        el.childNodes[7].innerHTML = weather.weather[0].main;

        $(el).find(".loader").hide();
    })
}
