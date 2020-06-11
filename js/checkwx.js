var apiKey = "your-api-key";
var icaoCode = "EGSH";

var decodedMetarXhr = new XMLHttpRequest();

decodedMetarXhr.addEventListener("readystatechange", function () {
    if(this.readyState === 4) {
        decodedMetarSuccess(JSON.parse(this.responseText));
    }
})

function getDecodedMetar() {
    decodedMetarXhr.open("GET", "https://api.checkwx.com/metar/" + icaoCode + "/decoded");
    decodedMetarXhr.setRequestHeader("X-API-KEY", apiKey);
    decodedMetarXhr.send();
}

function metarSuccess(response) {
    if (response.results > 0) {
        var metar = response.data[0];
        document.getElementById('metar').innerText = metar;
    } else {
        document.getElementById('metar').innerText = 'No results returned from API';
    }
}

function decodedMetarSuccess(response) {
    if (response.results > 0) {
        document.getElementById('station').innerText = icaoCode;
        document.getElementById('stationName').innerText = response.data[0].station.name
        var windDirection = response.data[0].wind.degrees;
        var windSpeed = response.data[0].wind.speed_kts;
        var flightCategory = response.data[0].flight_category;
        var cloudBase = response.data[0].ceiling.feet
        var cloudType = response.data[0].ceiling.text.toUpperCase()
        document.getElementById('flightCategory').innerText = flightCategory;
        switch (flightCategory) {
            case "VFR":
                document.getElementById('flightCategory').className = 'alert alert-success';
                break;
            case "LIFR":
                document.getElementById('flightCategory').className = 'alert alert-warning';
                break;
            case "IFR":
                document.getElementById('flightCategory').className = 'alert alert-danger';
                break;
            case "MVFR":
                document.getElementById('flightCategory').className = 'alert alert-warning';
                break;
            default:
                break;
        }
        document.getElementById('windSpeed').innerText = windSpeed + " KTS"
        document.getElementById('windDirection').childNodes[0].nodeValue = windDirection + "°";
        document.getElementById('clouds').innerText = cloudType + " @ " + cloudBase + "ft";
        document.getElementById('arrow').style.transform = "rotate(" + windDirection + "deg)"
    }
}

setInterval(getDecodedMetar(), 90000);