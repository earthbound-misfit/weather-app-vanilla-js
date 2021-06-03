function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[day];
}

function displayForecast(response) {
    let forecast = response.data.daily;
    let forecastElement = document.querySelector(".weather-forecast");

    let forecastHTML = `<div class="row">`;
    
    forecast.forEach(function (forecastDay) {
        forecastHTML = 
          forecastHTML +
          `
          <div class="col-2">
            <span class="forecast-day">
            ${formatDay(forecastDay.dt)}
            </span>
            <img src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="50px" />
            <span id="forecast-high">${forecastDay.temp.max}˚</span><span id="forecast-low">${forecastDay.temp.min}˚</span>
          </div>
        `;
    });

    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
  }

function getLatLong (coordinates) {
    console.log(coordinates);
    let apiKey = "dff2474c7e34531595f0b5e8d1de3e52";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
        let temperatureElement = document.querySelector("#temperature");
        let cityElement = document.querySelector("#city");
        let descriptionElement = document.querySelector("#description");
        let humidityElement = document.querySelector("#humidity");
        let windElement = document.querySelector("#wind-speed");
        let dateElement = document.querySelector("#date");
        let iconElement = document.querySelector("#icon");
        let icon = response.data.weather[0].icon;

        fahrenheitTemperature = response.data.main.temp;
        
        temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
        cityElement.innerHTML = response.data.name;
        descriptionElement.innerHTML = response.data.weather[0].description;
        humidityElement.innerHTML = response.data.main.humidity;
        windElement.innerHTML = response.data.wind.speed;
        dateElement.innerHTML = formatDate(response.data.dt * 1000);
        iconElement.setAttribute("src",`https://openweathermap.org/img/wn/${icon}@2x.png`);
        iconElement.setAttribute("alt", response.data.weather[0].description);

        getLatLong(response.data.coord);
        
}

function search(city) {
    let apiKey = "dff2474c7e34531595f0b5e8d1de3e52";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
}

function convertToCelsius(event) {
    event.preventDefault();
    let celsiusTemperature = (fahrenheitTemperature - 32) / 1.8; 
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    fahrenheitLink.classList.remove("active");
    celsiusLink.classList.add("active");
}

function convertToFahrenheit(event) {
    event.preventDefault();
    temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
}

let fahrenheitTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius)

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

search("Chicago");