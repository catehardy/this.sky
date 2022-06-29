function getUserCity() {
  const inputVal = document.getElementById("user-location").value;
  return getLocation(inputVal);
}

function getLocation(city) {
  return (
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=886b4d9fa52f373586e1ac5a100c5cf1`)
      .then(response => response.json())
      .then(json => {
        const locations = json;
        console.log('Locations: ', locations);
        // return the lat and lon of the first location in locations array
        // (TO DO: allow user to choose from locations array)
        const latLon = [locations[0].lat, locations[0].lon];
        return latLon;
      })
      .then(latLon => {
        const [lat, lon] = latLon;
        return getForecast(lat, lon);
      })
      .catch((error) => console.error(error))
      );
}

function getForecast(lat, lon) {
  return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&APPID=886b4d9fa52f373586e1ac5a100c5cf1`)
    .then(response => response.json())
    .then(json => {
      return json;
    })
    .catch((error) => console.error(error))
}

function empty(element) {
  element.replaceChildren(); 
}

function main() {
  const userClick = document.getElementById("user-submission")
  const userEnter = document.getElementById("user-location")

  userClick.addEventListener('click', displayForecast);

  userEnter.addEventListener('keypress', function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      displayForecast()
    }});

  function displayForecast(e) {

    // Remove previous results from display
    let parent = document.getElementById("api-spot");
    empty(parent);

    getUserCity()
    .then(response => {
        const forecast = response;

        console.log("forecast object: ", forecast)

        const shortForecast = forecast.weather[0].description
        const currentTemp = Math.round(forecast.main.temp)
        const feelsLike = Math.round(forecast.main.feels_like)
        const currentWindSpeed = Math.round(forecast.wind.speed)


        // ---------------------------------
        // Get local time for searched city
        const userDate = new Date(); // UTC, to get offset for local user
        const userOffset = userDate.getTimezoneOffset()*60*1000; // user's offset time in milliseconds

        const date = new Date().getTime() // UTC
        const localTimeDifference = (forecast.timezone * 1000); // Searched city's offset time in milliseconds
        const localTime = new Date(date + localTimeDifference + userOffset); // New timestamp: UTC +/- local offset for searched city +/- user offset

        const hours = localTime.getHours();
        const minutes = "0" + localTime.getMinutes();

        const formattedTime = `${hours}:${minutes.substr(-2)}`;

        // TODO:
        // Replace deprecated .substr() method
        // Should this become a separate function, called from main?
        // ---------------------------------


        const myDiv = document.querySelector('#api-spot')

        const horizontalRule = document.createElement("hr")

        const inputVal = document.getElementById("user-location").value;
        const header = document.createElement("h2")
        header.innerText = `Current weather in ${inputVal}`

        const newForecast = document.createElement("p")
        newForecast.innerText = `Quick description: ${shortForecast}`

        const newTemp = document.createElement("p")
        newTemp.innerText = `Current temperature: ${currentTemp} °c`

        const newFeelsLike = document.createElement("p")
        newFeelsLike.innerText = `Feels like: ${feelsLike} °c`

        const newWindSpeed = document.createElement("p")
        newWindSpeed.innerText = `Current windspeed: ${currentWindSpeed} km/h`

        const newCityTime = document.createElement("p")
        newCityTime.innerText = `Current time in ${inputVal}: ${formattedTime}`

        myDiv.appendChild(horizontalRule)
        myDiv.appendChild(header)
        myDiv.appendChild(newForecast)
        myDiv.appendChild(newTemp)
        myDiv.appendChild(newFeelsLike)
        myDiv.appendChild(newWindSpeed)
        myDiv.appendChild(newCityTime)

        // Clear search form
        document.getElementById("forecast-search").reset();
    })
    .catch(error => console.error(error));
  }
}

main();
