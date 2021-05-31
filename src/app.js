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

function displayWeather(response) {
    console.log(response.data);
        let temperatureElement = document.querySelector("#temperature");
        let cityElement = document.querySelector("#city");
        let descriptionElement = document.querySelector("#description");
        let humidityElement = document.querySelector("#humidity");
        let windElement = document.querySelector("#wind-speed");
        let dateElement = document.querySelector("#date");
        let iconElement = document.querySelector("#icon");
        let icon = response.data.weather[0].icon;
        
        temperatureElement.innerHTML = Math.round(response.data.main.temp);
        cityElement.innerHTML = response.data.name;
        descriptionElement.innerHTML = response.data.weather[0].description;
        humidityElement.innerHTML = response.data.main.humidity;
        windElement.innerHTML = response.data.wind.speed;
        dateElement.innerHTML = formatDate(response.data.dt * 1000);
        iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${icon}@2x.png`);
        iconElement.setAttribute("alt", response.data.weather[0].description);
      }

let apiKey = "dff2474c7e34531595f0b5e8d1de3e52";
let city = "Chicago";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

axios.get(apiUrl).then(displayWeather);

