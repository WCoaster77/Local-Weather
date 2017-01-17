// Check for location services active and get position
function getPosition() {

    //For Codepen use
    //$.getJSON("http://ip-api.com/json", getAPI)

    //For Regular use
    if (navigator.geolocation) { // Check for location capability and get weather if true
        navigator.geolocation.getCurrentPosition(getAPI);
    } else {
        console.log("Geolocatioin is not supported on your browser.");
    }
}

function getAPI(position) { // Use location from position to populate weather data API call

    // For Codepen use
    //var lat = position.lat;
    //var long = position.lon;

    // For Regular use
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long +
        "&APPID=5d350991d758cab06246c66f77821968", createStr);
}
    
function createStr(data) { // Populate variables from API data return

    var coord = data.coords,
        weather = [],
        tempK = data.main.temp,
        wind = data.wind,
        country = data.sys.country,
        city = data.name,
        arrTest = [];

    // Create string for weather description and icon image src string
    data.weather.forEach(function (list) {
        weather.push(list.main, 'http://openweathermap.org/img/w/' + list.icon + '.png');
    });

    // Cycle through weather array and post description and icon to page
    for (var i = 1, w = 0; w < weather.length; i += 2, w += 2) {
        var icon = new Image();
        icon.src = weather[i];
        document.getElementById("weather").innerHTML += weather[w] + ' ';
        document.getElementById("icon").appendChild(icon).width = '75';
    }

    document.getElementById("city").innerHTML = city + ', ' + country;
    document.getElementById("temp").innerHTML = Number(Math.round(tempK - 273 + 'e0') + 'e-0') + 'C';
    document.getElementById("wind").innerHTML = 'Wind Speed: ' + Number(Math.round(wind.speed + 'e1') + 'e-1') + ' Direction: ' + Number(Math.round(wind.deg + 'e1') + 'e-1');
    document.getElementById("compass").style.setProperty('--direction', wind.deg); //Set CSS variable to degrees of wind

    arrTest.push(coord, weather, tempK, wind, country, city); // Maybe use this later
}

function convertTemp() {
    var str = document.getElementById("temp").textContent;
    var scale = str.slice(-1);
    var tempK = str.slice(0, str.length - 1);
    
    if (scale === 'C') {
        document.getElementById("temp").innerHTML = Number(Math.round(tempK * 1.8 + 32 + 'e0') + 'e-0') + 'F';
    } else {
        document.getElementById("temp").innerHTML = Number(Math.round((tempK - 32) * 5 / 9 + 'e0') + 'e-0') + 'C';
    }
}

// For test purposes to display a variables contents in the console
function prtAlert(msg) {
    console.log(JSON.stringify(msg, null, 3));
}

getPosition();

//    document.getElementById("temp").innerHTML = Number(Math.round(tempK - 273 + 'e0') + 'e-0') + 'C ' 
//+Number(Math.round((tempK - 273) * 9 / 5 + 32 + 'e0') + 'e-0') + 'F';