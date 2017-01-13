﻿
function getPosition() { // Check for location services active and get position
    if (navigator.geolocation) { // Check for location capability and get weather if true
        navigator.geolocation.getCurrentPosition(getAPI);
    } else {
        console.log("Geolocatioin is not supported on your browser.");
        test.innerHTML = "Geolocatioin is not supported on your browser.";
    }
}

function getAPI(position) { // Use location from position to populate weather data API call

    var lat = position.coords.latitude;
    var long = position.coords.longitude;

    $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long +
        "&APPID=5d350991d758cab06246c66f77821968", createStr);
}
    
function createStr(data) { // Populate variables from API data return

    var coord = data.coord,
        weather = [],
        tempK = data.main.temp,
        wind = data.wind,
        country = data.sys.country,
        city = data.name,
        arrTest = [];

    data.weather.forEach(function (list) {
        weather.push(list.main, 'http://openweathermap.org/img/w/' + list.icon + '.png'); // Creates string for icon image src string
    });

    prtAlert(weather);

    for (var i = 1, w = 0; w < weather.length; i += 2, w += 2) {
        var icon = new Image();
        icon.src = weather[i];
        document.getElementById("weather").innerHTML += weather[w] + ' ';
        document.getElementById("icon").appendChild(icon).width = '75';
    }

    document.getElementById("city").innerHTML = city + ', ' + country;
    document.getElementById("temp").innerHTML = Number(Math.round(tempK - 273 + 'e0') + 'e-0') + ' C ' 
        + Number(Math.round((tempK - 273) * 9 / 5 + 32 + 'e0') + 'e-0') + ' F';
    document.getElementById("wind").innerHTML = 'Wind Speed: ' + wind.speed + ' Direction: ' + wind.deg;
    document.getElementById("compass").style.setProperty('--direction', wind.deg);

    arrTest.push(coord, weather, tempK, wind, country, city); // Maybe use this later
}

function prtAlert(msg) {
    console.log(JSON.stringify(msg, null, 3));
}

getPosition();
