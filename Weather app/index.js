const timeEl = document.querySelector(".time");
const dateEl = document.querySelector(".date");
const conditionEl = document.querySelector(".weather-condition");
const tempEl = document.querySelector(".temp");
const imgEl = document.querySelector(".weather-img");
const cityEl = document.querySelector(".city-name");
const searchEl = document.querySelector(".search-location");
const searchbtnEl = document.querySelector(".submit-button");
const pressureEl = document.querySelector(".pressure");
const humidityEl = document.querySelector(".humidity");
const windEl = document.querySelector(".wind");

/*Current date */
const currDate = moment().format("dddd MMM Do");
dateEl.innerHTML = currDate;
/*Current time */
var dt = new Date();
var hours = dt.getHours();
var minute = dt.getMinutes();
if (hours.toString().length == 1) hours = "0" + hours;
if (minute.toString().length == 1) minute = "0" + minute;
var time = hours + ":" + minute;
timeEl.innerHTML = time;

/* Working with API to fetch the weather */
let weather = {
  apikey: "a93629244b714ac38b8b8c54403753ab",
  fetchWeather: function (city) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apikey}`
    )
      .then((Response) => Response.json())
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    const { pressure } = data.main;
    cityEl.innerHTML = `Weather in ${name}`;
    imgEl.src = "https://openweathermap.org/img/wn/" + icon + ".png";
    conditionEl.innerText = description;
    tempEl.innerText = temp + "°C";
    humidityEl.innerText = `Humidity ${humidity}%`;
    windEl.innerText = `Wind ${speed}km/h`;
    pressureEl.innerText = `Air Pressure ${pressure}hPa`;
    document.querySelector(".main-card").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?sun)";
  },
  search: function () {
    this.fetchWeather(searchEl.value);
  },
};

/*Making search bar work , and adding event listener to the enter key.*/

searchbtnEl.addEventListener("click", function () {
  weather.search();
});

searchEl.addEventListener("keyup", function (e) {
  if (e.key == "Enter") weather.search();
});

weather.fetchWeather("Warsaw");
