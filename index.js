function formatDate() {
  let currentDate = new Date();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let date = currentDate.getDate();
  let day = days[currentDate.getDay()];
  let month = months[currentDate.getMonth()];
  let year = currentDate.getFullYear();
  let hour = currentDate.getHours();

  if (hour < 10) {
    hour = `0${hour}`;
  } else {
    hour = hour + "";
  }
  let minute = currentDate.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  } else {
    minute = minute + "";
  }
  let newTime = `${hour}:${minute}`;
  let formattedDate = `${day} ${month} ${date}, ${year} | ${newTime}`;

  return formattedDate;
}

let h2 = document.querySelector("h2#current-date");
h2.innerHTML = formatDate();

function showTemparature(response) {
  let cityName = document.querySelector("h1");
  cityName.innerHTML = response.data.name;
  let celcius = Math.round(response.data.main.temp);
  let currentTemparature = document.querySelector(".main-temp");
  currentTemparature.innerHTML = `${celcius}`;
}

function searchCity(event) {
  event.preventDefault();
  let apiKey = "8f071d4d6afb831cf32e1beb0f3cdeb3";
  let unit = "metric";
  let city = document.querySelector("#search-text-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemparature);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let unit = "metric";
  let apiKey = "8f071d4d6afb831cf32e1beb0f3cdeb3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showTemparature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocationButton = document.querySelector(".btn-primary");
currentLocationButton.addEventListener("click", getCurrentLocation);
