var currWeath = [];

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

    if (navigator.geolocation) { // Check for location capability and get weather if true
        navigator.geolocation.getCurrentPosition(getAPI);
    } else {
        console.log("Geolocatioin is not supported on your browser.");
        test.innerHTML = "Geolocatioin is not supported on your browser.";
    }

function getAPI(position) { // Use location to populate weather data call

    var lat = position.coords.latitude;
    var long = position.coords.longitude;

    $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long +
        "&APPID=5d350991d758cab06246c66f77821968", function (data) { // Populate variables from API data return
            data.weather.forEach(function (list) {  // Create array of the current weather
                //Can I do ==> retrun data; and use other global functions to declare required variablles?
           currWeath.push(list.main);
        });
        console.log(currWeath);
        document.getElementById("weather").innerHTML = "weather ==> " + currWeath;
        return currWeath;
    });
}

//console.log('LAT: ' + lat + '\n'  + 'LONG: ' + long);
//str = JSON.stringify(data.weather, null, 3);