function displayTemperature(response) {
    console.log(response.data);
}

let apiKey = "dff2474c7e34531595f0b5e8d1de3e52";
let apiUrl = `api.openweathermap.org/data/2.5/weather?q=Chicago&appid=${apiKey}&units=imperial`;

axios.get(apiUrl).then(displayTemperature);