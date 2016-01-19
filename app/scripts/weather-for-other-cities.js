function loadWeather(cityElem) {
    var cityApiUrl = "https://api-https.herokuapp.com/openweathermap/data/2.5/weather?id=" +
        cityElem.getAttribute("data-id") +
        "&APPID=" + keyApi;

    function getWeatherForCity() {
        var deferred = $.Deferred();
        $.getJSON(cityApiUrl, deferred.resolve).fail(deferred.reject);
        return deferred.promise();
    };

    function updateView(data) {
        var iconImg = $('<img src="">');
        iconImg.appendTo(cityElem);
        var icons = {
            "Clouds": "images/clouds.svg",
            "Clear": "images/clear.svg",
            "Snow": "images/snow.svg",
            "Rain": "images/rain.svg",
            "Mist": "images/mist.svg",
            "Haze": "images/mist.svg"
        }

        var type = data.weather[0].main;
        iconImg.attr("src", icons[type]);

        cityElem.childNodes[1].innerHTML = data.name;
        cityElem.childNodes[3].innerHTML = parseInt(data.wind.speed) + ' m/s';
        cityElem.childNodes[5].innerHTML = parseInt(data.main.temp - 273.15) +
            "  &#176;C";
        cityElem.childNodes[7].innerHTML = (data.weather[0].main).toUpperCase();

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
