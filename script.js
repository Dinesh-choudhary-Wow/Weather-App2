const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');
const searchButton = document.querySelector('#query-button');
const searchInput = document.querySelector('#query-input');

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

searchButton.disabled = true;
// checking of input feild is not empty
searchInput.onkeyup = () => {
    if (searchInput.value.length > 0) {
        searchButton.disabled = false;
    } else {
        searchButton.disabled = true;
    }
}

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HourFormat = hour >= 13 ? hour % 12 : hour
    const minutes = time.getMinutes();
    const ampm = hour >= 12 ? 'PM' : 'AM';

    timeEl.innerHTML = hoursIn12HourFormat + ':' + minutes + `<span id="am-pm">${ampm}</span>`
    dateEl.innerHTML = days[day] + ', ' + date + ' ' + months[month];
}, 1000);

function getWeatherData() {
        let query = 'bangalore';
        fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${query}%7D?unitGroup=us&key=HEG4F8F8KWRVJJMYWBWT267MR&contentType=json`).then(res => res.json()).then(data => {
            console.log(data);
            showWeatherData(data);
    });
}
searchButton.addEventListener('click', function () {
    let query = searchInput.value;
    getWeatherDatafrmSearch(query); 
    // buttonElement.disabled = true;
});
function getWeatherDatafrmSearch(query) {
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${query}%7D?unitGroup=us&key=HEG4F8F8KWRVJJMYWBWT267MR&contentType=json`).then(res => res.json()).then(data => {
        console.log(data);
        showWeatherData(data);
});
}

getWeatherData()
function showWeatherData(data) {
    timezone.innerHTML = data.timezone;
    countryEl.innerHTML = data.resolvedAddress;
    let { humidity, pressure } = data.currentConditions;
    let { sunrise, sunset, windspeed } = data.currentConditions;
    currentWeatherItemsEl.innerHTML =
        `<div class="weather-items">
            <div>Humidity</div>
            <div>${humidity}</div>
        </div>
        <div class="weather-items">
            <div>Pressure</div>
            <div>${pressure}</div>
        </div>
        <div class="weather-items">
            <div>Wind Speed</div>
            <div>${windspeed}</div>
        </div>
        <div class="weather-items">
            <div>Sunrise</div>
            <div>${sunrise}</div>
        </div>
        <div class="weather-items">
            <div>Sunset</div>
            <div>${sunset}</div>
        </div>`;
        let otherDayForcast = ''
        data.days.forEach((day,idx)=>{
            if(idx == 0){
                currentTempEl.innerHTML = `
                <div class="weather-forecast-item">
                    <div class="day">Monday</div>
                    <img src="http://openweathermap.org/img/wn/${data.days[0].conditions == "Clear" ? '01d': '10d'}@2x.png" alt="weather icon" class="w-icon" />
                    <div class="temp">Night - ${data.days[0].temp}&#176; C</div>
                    <div class="temp">Day - ${data.days[0].tempmin}&#176; C</div>
                </div>
                `
            }else if(idx >0 && idx <= 7){
                otherDayForcast +=`
                <div class="weather-forecast-item">
                    <div class="day">${day}</div>
                    <img src="http://openweathermap.org/img/wn/${data.days[idx].conditions == "Partially cloudy" ? '04d': '10d'}@2x.png" alt="weather icon" class="w-icon" />
                    <div class="temp">Night - ${data.days[idx].temp}&#176; C</div>
                    <div class="temp">Day - ${data.days[idx].tempmin}&#176; C</div>
                </div>`
            }
        })
        // console.log(data.days[0].temp)
        weatherForecastEl.innerHTML = otherDayForcast;
}