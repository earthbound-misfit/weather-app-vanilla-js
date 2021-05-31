function displayWeather(response) {
        console.log(response.data);
      }

      let apiKey = "dff2474c7e34531595f0b5e8d1de3e52";
      let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}`;

      axios.get(apiUrl).then(displayWeather);

