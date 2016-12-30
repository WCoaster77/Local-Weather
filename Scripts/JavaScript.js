var set = [];
var currWeath = [];
var ret = "";

function getAPI(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    var i = 0;
    document.getElementById("locate").innerHTML = 'LAT: ' + lat + '<br/>' + 'LONG: ' + long;
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long +
        "&APPID=5d350991d758cab06246c66f77821968", function (data) {
        str = JSON.stringify(data.weather, null, 3);
        console.log(str);
        data.weather.forEach(function (list) {  // Create array of the current weather
            currWeath.push(list.description);
            alert(currWeath[i]);
            i++;
            return currWeath;
        });
        });
    console.log(currWeath[0]);
    document.getElementById("weather").innerHTML = "weather ==>" + currWeath;
    //console.log(currWeath[1]);
};

navigator.geolocation.getCurrentPosition(getAPI);

//function getWeather(data) {
//    for (i = 0; i < data.weather.length; i++) {
//        document.getElementById("weather").innerHTML += (data.weather[i].description + '<br>');
//        console.log(data.weather[i]);
//    }
//}
//        var weatherNow = getWeather();
//console.log(weatherNow);


//if (navigator.geolocation) {
//    navigator.geolocation.getCurrentPosition(userPosition);
//} else {
//    console.log("Geolocatioin is not supported on your browser.");
//    test.innerHTML = "Geolocatioin is not supported on your browser.";
//}

// **** A string to view API object values -- Call it inside getJSON function ****
//Object.getOwnPropertyNames(data.contents.quotes[0]).forEach(function (val, idx, array)
//{
//    ret += (val + ' -> ' + data.contents.quotes[0][val] + '<br>');
//    return ret;
//});