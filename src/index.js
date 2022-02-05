function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  let day = days[date.getDay()];
  return `last updated: ${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndPoint}?q=${city}&appid=999c20f99932bf48ce2906868ec3c37f
&&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function changeCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function displayWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;

  celsiusTemperature = response.data.main.temp;

  document.querySelector("#current-temperature").innerHTML =
    Math.round(celsiusTemperature);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  feelsLikeTemperature = Math.round(response.data.main.feels_like);
  document.querySelector(
    "#currently-feels-like"
  ).innerHTML = `${feelsLikeTemperature}°`;
  document.querySelector("#current-time").innerHTML = formatDate(
    response.data.dt * 1000
  );

  getForecast(response.data.coord);
}

function getForecast(coordinates) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=999c20f99932bf48ce2906868ec3c37f&&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  let feelsLike = document.querySelector("#currently-feels-like");
  feelsLike.innerHTML = Math.round((feelsLikeTemperature * 9) / 5 + 32);

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  let feelsLike = document.querySelector("#currently-feels-like");
  feelsLike.innerHTML = Math.round(feelsLikeTemperature);
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = '<div class="row">';
  let days = ["thurs", "fri", "sat", "sun", "mon", "tues"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `         
    <div class="col-2">
                <div class="weather-forecast-date">${day}</div>
                <img
                  src="https://openweathermap.org/img/wn/10d@2x.png"
                  alt="rainy"
                  width="90"
                />
                <div class="weather-forecast-temperatures">
                  <span class="weather-forecast-temperature-max"> 18° </span>
                  <span class="weather-forecast-temperature-min"> 12° </span>
                </div>
              </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let celsiusTemperature = null;
let feelsLikeTemperature = null;

let fahrenheitLink = document.querySelector("#degrees-fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#degrees-celsius");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let changeCityForm = document.querySelector("#change-city-form");
changeCityForm.addEventListener("submit", changeCity);

searchCity("Toronto");
