# this.sky - a simple weather app

## Project Description

[this.sky](https://catehardy.github.io/this.sky/) is an elegantly simple, international weather app built with HTML, CSS and vanilla JavaScript. It displays the current weather in any chosen location around the world, using data fetched from the OpenWeather API.

It’s currently a WIP and when finished will feature a dynamically changing background, to represent the current weather forecast.

As a self-taught developer, I’ve previously followed tutorials to build projects. This is my first solo project, built from my imagination and much Googling!

## To Do

#### User entry:
* Create a combobox for users to select their location more precisely
* Display error if user doesn't enter a valid location
* Allow user to choose between imperial and metric temp/wind speed

#### Security:
* Implement [advice found here](https://www.youtube.com/watch?v=2J3xbMkH2K4)

#### Visuals:
* Add 'am' to end of displayed time, if before 12
* Style combobox with CSS, once built
* Add dynamic page background (to desktop version), selected by keywords in shortForecast (Note: find out if there's a way to get a list of all possible responses to forecast.weather[0].description)

#### Extra info to display:
* Display 24hr or week ahead forecast as well as current weather

## Credits

Thank you to [Dan Hampton](https://github.com/daniel-hampton) for an intro lesson on API usage and timely nudges in the right direction.

Weather data and geocoding APIs from [openweathermap.org](https://openweathermap.org/)

## License

[MIT](https://github.com/catehardy/this.sky/blob/main/LICENSE)
