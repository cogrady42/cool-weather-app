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

  let days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday"];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
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
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  let feelsLike = Math.round(response.data.main.feels_like);
  document.querySelector("#currently-feels-like").innerHTML = `${feelsLike}°`;
  document.querySelector("#current-time").innerHTML = formatDate(
    response.data.dt * 1000
  );
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function searchLocation(position) {
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndPoint}?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=999c20f99932bf48ce2906868ec3c37f&&units=metric`;
  axios.get(apiUrl).then(displayCurrentLocationWeather);
}

function displayCurrentLocationWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  let feelsLike = Math.round(response.data.main.feels_like);
  document.querySelector("#currently-feels-like").innerHTML = `${feelsLike}°`;
  document.querySelector("#current-time").innerHTML = formatDate(
    response.data.dt * 1000
  );
}

let changeCityForm = document.querySelector("#change-city-form");
changeCityForm.addEventListener("submit", changeCity);

let currentLocationSearch = document.querySelector("#current-location-search");
currentLocationSearch.addEventListener("click", getCurrentLocation);

searchCity("Toronto");
