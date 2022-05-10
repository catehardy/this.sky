// TO DO:
// Visuals:
// Add dynamic page background, selected by keywords in shortForecast
// (is there a way to get a list of all possible responses to forecast.weather[0].description?)
// Style combobox with CSS, once built

// User entry:
// Create a combobox for users to select their location more precisely
// Display error if user doesn't enter a valid location
// Keyboard entry as well as mouse click to select
// Allow user to choose between imperial and metric temp/wind speed

// Extra info to display:
// Display forecast as well as current weather
// Current time in this location?
// 'Random location' button?

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
  const userSubmission = document.getElementById("user-submission");
  userSubmission.addEventListener("click", function() {

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

        myDiv.appendChild(horizontalRule)
        myDiv.appendChild(header)
        myDiv.appendChild(newForecast)
        myDiv.appendChild(newTemp)
        myDiv.appendChild(newFeelsLike)
        myDiv.appendChild(newWindSpeed)

        // Clear search form
        document.getElementById("forecast-search").reset();
    })
    .catch(error => console.error(error));
  })
}

main();
