const API_KEY = "your-api-key";
const ICAO_CODE = "EGSH";

let decodedMetarXhr = new XMLHttpRequest();

decodedMetarXhr.addEventListener("readystatechange", function () {
    if(this.readyState === 4) {
        decodedMetarSuccess(JSON.parse(this.responseText));
    }
})

function getDecodedMetar() {
    decodedMetarXhr.open("GET", "https://api.checkwx.com/metar/" + ICAO_CODE + "/decoded");
    decodedMetarXhr.setRequestHeader("X-API-KEY", API_KEY);
    decodedMetarXhr.send();
}

function decodedMetarSuccess(response) {
    if (response.results > 0) {
        document.getElementById('station').innerText = ICAO_CODE;
        document.getElementById('stationName').innerText = response.data[0].station.name
        let windDirection = response.data[0].wind.degrees;
        let windSpeed = response.data[0].wind.speed_kts;
        let flightCategory = response.data[0].flight_category;
        let cloudBase = response.data[0].ceiling.feet
        let cloudType = response.data[0].ceiling.text.toUpperCase()
        let observed = response.data[0].observed
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
        document.getElementById('observedDateTime').innerText = observed
    }
}
getDecodedMetar();
setInterval(getDecodedMetar, 300000);