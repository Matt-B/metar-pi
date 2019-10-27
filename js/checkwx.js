var apiKey = "your-api-key";
var icaoCode = "EGSH";

var metarXhr = new XMLHttpRequest();
var tafXhr = new XMLHttpRequest();

metarXhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
        metarSuccess(JSON.parse(this.responseText));
    }
});

tafXhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
        tafSuccess(JSON.parse(this.responseText));
    }
});

function getMetar() {
    metarXhr.open("GET", "https://api.checkwx.com/metar/" + icaoCode);
    metarXhr.setRequestHeader("X-API-KEY", apiKey);
    metarXhr.send();
}

function getTaf() {
    tafXhr.open('GET', "https://api.checkwx.com/taf/" + icaoCode);
    tafXhr.setRequestHeader("X-API-KEY", apiKey);
    tafXhr.send();
}

function metarSuccess(response) {
    if (response.results > 0) {
        var metar = response.data[0];
        document.getElementById('metar').innerText = metar;
    } else {
        document.getElementById('metar').innerText = 'No results returned from API';
    }
}

function tafSuccess(response) {
    if (response.results > 0) {
        var metar = response.data[0];
        document.getElementById('taf').innerText = metar;
    } else {
        document.getElementById('taf').innerText = 'No results returned from API';
    }
}

setInterval(getMetar(), 90000);
setInterval(getTaf(), 90000);