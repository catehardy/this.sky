// TO DO:
// Find an international weather API - DONE
// Read documentation and create API call - DONE
// Add basic forecast to index.html - DONE
// Figure out how to select a forecast by location (read https://openweathermap.org/api/geocoding-api) - DONE
// Create a form for user to select their chosen location's forecast - DONE
// Clear both input value and previous forecast, after forecast displays - DONE
// Figure out how to let user see and choose options for their city (e.g. which 'London' do they mean)?
// Display error if user doesn't enter a valid location
// Allow user to press "enter" to submit city as well as clicking submit button
// Allow user to choose between imperial and metric temp/wind speed
// Use flexbox and CSS to improve page layout
// Add dynamic page background, selected by keywords in shortForecast
// (is there a way to get a list of all possible responses to forecast.weather[0].description?)

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