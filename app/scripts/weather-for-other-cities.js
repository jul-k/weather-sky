function loadWeather(cityElem) {
    var cityApiUrl = "https://weather-sky.herokuapp.com/data/2.5/weather?id=" +
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

        $(cityElem).find(".loader").hide();
    }

    function delay(val) {
        // body...
        var deferred = $.Deferred();
        setTimeout(function() {
            deferred.resolve(val);
        }, 10000 * Math.random());
        return deferred.promise();
    }

    $.when(getWeatherForCity())
        .then(updateView);
};
