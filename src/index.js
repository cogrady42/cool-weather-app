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

  document.querySelector("#current-time").innerHTML = formatDate(
    response.data.dt * 1000
  );

  document
    .querySelector("#current-weather-icon")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  getForecast(response.data.coord);
}

function getForecast(coordinates) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=999c20f99932bf48ce2906868ec3c37f&&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["sun", "mon", "tues", "wed", "thurs", "fri", "sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = '<div class="row">';
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `         
    <div class="col-2">
    <div class="forecast-wrapper">
                <div class="weather-forecast-date">${formatDay(
                  forecastDay.dt
                )}</div>
                <img
                  src="https://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
   
                  width="84"
                />
                <div class="weather-forecast-temperatures">
                  <span class="weather-forecast-temperature-max"> ${Math.round(
                    forecastDay.temp.max
                  )}° </span>
                  <span class="weather-forecast-temperature-min"> ${Math.round(
                    forecastDay.temp.min
                  )}° </span>
                                  </div>

                </div>
              </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let changeCityForm = document.querySelector("#change-city-form");
changeCityForm.addEventListener("submit", changeCity);

searchCity("Toronto");
