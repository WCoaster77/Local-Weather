var currWeath = [];
var cityName = [];
var data = {};
var str = 'start';

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
        icon = new Image(),
        tempK = data.main.temp,
        wind = data.wind,
        country = data.sys.country,
        city = data.name,
        currweather =
        arrTest = [];

    data.weather.forEach(function (list) {
        weather.push(list.main, (list.icon + '.png')); // Creates string for icon image src string
    });
    icon.src = 'http://openweathermap.org/img/w/' + weather[1];

    arrTest.push(coord, weather, temp, wind, country, city); // Maybe use this later

    document.getElementById("city").innerHTML = city + ', ' + country;
    document.getElementById("temp").innerHTML = (tempK - 273) + ' C ' + (((tempK - 273) * 9 / 5) + 32) + ' F';
    document.getElementById("weather").innerHTML = weather[0];
    document.getElementById("test").appendChild(icon); //doc element must be <div> not <p>
    document.getElementById("wind").innerHTML = 'Wind Speed: ' + wind.speed + ' Direction: ' + wind.deg;
}

function prtAlert(msg) {
    console.log(JSON.stringify(msg, null, 3));
}

getPosition();



//            data.weather.forEach(function (list) {  // Create array of the current weather
//                currWeath.push(list);
//            });
//            document.getElementById("weather").innerHTML = "weather ==> " + currWeath[0].description;
//        });
//}

//console.log('LAT: ' + lat + '\n'  + 'LONG: ' + long);
//str = JSON.stringify(data, null, 3);


// ***** Weather Widget *****
//window.myWidgetParam = { // Parameters for Weather Widget
//    id: 31,
//    cityid: 6173331,
//    appid: '5d350991d758cab06246c66f77821968',
//    containerid: 'openweathermap-widget',
//};
//(function () { // Web call for Weather Widget script
//    var script = document.createElement('script');
//    script.type = 'text/javascript';
//    script.async = true;
//    script.src = 'http://openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js';
//    var s = document.getElementsByTagName('script')[0];
//    s.parentNode.insertBefore(script, s);
//})();