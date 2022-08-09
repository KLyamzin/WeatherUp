import lottie from "lottie-web";
import animationData from "./assets/61114-clear-day.json";
import "./icofont/icofont.min.css";

const mainDiv = document.getElementById("main");
const currentWeather = Object.assign(document.createElement("div"), {
  classList: "currentWeather",
});
const currentConditions = Object.assign(document.createElement("div"), {
  classList: "currentConditions",
});
const errorDiv = document.getElementById("error-message");

// the sun animation in the header
const animation = lottie.loadAnimation({
  container: document.getElementById("animation"),
  renderer: "svg",
  autoplay: true,
  loop: true,
  animationData,
});
animation.setSpeed(0.2);
animation.goToAndPlay(0, true);

class Weather {
  constructor(data, unit) {
    ({
      name: this.name,
      visibility: this.visibility,
      main: {
        temp: this.temp,
        feels_like: this.feels_like,
        temp_max: this.temp_max,
        temp_min: this.temp_min,
        pressure: this.pressure,
        humidity: this.humidity,
      },
      weather: {
        0: {
          description: this.description,
          icon: this.icon,
          id: this.weather_id,
        },
      },
      sys: {
        country: this.country,
        sunrise: this.sunrise,
        sunset: this.sunset,
      },
      wind: { deg: this.degree, speed: this.speed },
    } = data);
    this.unit = unit;
  }
}

// Returns current date like 'Sunday, August 7'
const getDate = () => {
  const date = new Date();
  const options = {
    weekday: "long",
    // year: "numeric",
    month: "long",
    day: "numeric",
  };
  const todayDate = date.toLocaleDateString("en-US", options);
  return todayDate;
};

// Returns current time like '01:44pm'
const getTime = (data) => {
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  let time;
  if (!data) {
    time = new Date();
  } else {
    time = new Date(data * 1000);
  }
  const currentTime = time
    .toLocaleTimeString("en-US", options)
    .toLowerCase()
    .split(" ")
    .join("");
  return currentTime;
};

// Converts hPa to inHg
const pressureUnitType = (data) => {
  let unitType = (data * 0.02953).toFixed(2);
  return unitType;
};

// Converts between "m/s" "mph"
const speedUnitType = (data) => {
  let unitType = data === "metric" ? "m/s" : "mph";
  return unitType;
};

const getWeatherIcon = (code) => {
  const icon = {
    "icofont-sun": "01d",
    "icofont-night": "01n",
    "icofont-full-sunny": "02d",
    "icofont-full-night": "02n",
    "icofont-clouds": ["03d", "03n"],
    "icofont-cloudy": ["04d", "04n"],
    "icofont-rainy": ["09d", "09n"],
    "icofont-rainy-sunny": "10d",
    "icofont-rainy-night": "10n",
    "icofont-rainy-thunder": ["11d", "11n"],
    "icofont-snow-flake": ["13d", "13n"],
    "icofont-align-center": ["50d", "50n"],
  };
  for (const prop in icon) {
    if (icon[prop].includes(code)) return prop;
  }
};

const displayCurrentWeather = (weatherData) => {
  mainDiv.innerHTML = "";
  currentWeather.innerHTML = "";
  const date = Object.assign(document.createElement("span"), {
    id: "date",
    classList: "date",
    innerText: `${getDate()}`,
  });
  const time = Object.assign(document.createElement("span"), {
    id: "time",
    classList: "time",
    innerText: `at ${getTime()}`,
  });
  const temp = Object.assign(document.createElement("span"), {
    id: "temp",
    classList: "temp",
    innerText: `${Math.round(weatherData.temp)}°`,
  });
  const feels_like = Object.assign(document.createElement("span"), {
    id: "temp-f",
    classList: "temp-f",
    innerText: `Feels like ${Math.round(weatherData.feels_like)}°`,
  });
  const description = Object.assign(document.createElement("span"), {
    id: "description",
    classList: "description",
    innerText: weatherData.description.toUpperCase(),
  });
  const temp_max = Object.assign(document.createElement("span"), {
    id: "temp-m",
    classList: "temp-m",
    innerText: `${Math.round(weatherData.temp_max)}°`,
  });
  const temp_min = Object.assign(document.createElement("span"), {
    id: "temp-m",
    classList: "temp-m",
    innerText: `${Math.round(weatherData.temp_min)}°`,
  });

  // icons
  const tempMaxIcon = Object.assign(document.createElement("i"), {
    id: "temp-icon",
    classList: "temp-icon icofont-bubble-up",
  });
  const tempMinIcon = Object.assign(document.createElement("i"), {
    id: "temp-icon",
    classList: "temp-icon icofont-bubble-down",
  });
  const icon = Object.assign(document.createElement("i"), {
    id: "weather-icon",
    classList: `${getWeatherIcon(weatherData.icon)}`,
  });

  // div elements
  const iconDateTimeDiv = Object.assign(document.createElement("div"), {
    classList: "icon-date-time",
  });
  const allTempsDiv = Object.assign(document.createElement("div"), {
    classList: "all-temps",
  });
  const mTempsDiv = Object.assign(document.createElement("div"), {
    classList: "m-temps",
  });
  const maxTempDiv = Object.assign(document.createElement("div"), {
    classList: "max-temp",
  });
  const minTempDiv = Object.assign(document.createElement("div"), {
    classList: "min-temp",
  });

  const dateTimeDiv = document.createElement("div");

  // Append max and min temps
  maxTempDiv.append(tempMaxIcon, temp_max);
  minTempDiv.append(tempMinIcon, temp_min);
  mTempsDiv.append(maxTempDiv, minTempDiv);
  // append everything else
  dateTimeDiv.append(date, time);
  iconDateTimeDiv.append(icon, dateTimeDiv);
  allTempsDiv.append(mTempsDiv, temp);
  currentWeather.append(iconDateTimeDiv, description, allTempsDiv, feels_like);
  mainDiv.append(currentWeather, currentConditions);
};

const displayCurrentConditions = (weatherData) => {
  currentConditions.innerHTML = "";
  // Create the div
  const pressure = document.createElement("div");
  const humidity = document.createElement("div");
  const degree = document.createElement("div");
  const speed = document.createElement("div");
  const sunrise = document.createElement("div");
  const sunset = document.createElement("div");

  // Create the icons
  const pressureIcon = Object.assign(document.createElement("i"), {
    classList: "icofont-speed-meter",
  });
  const humidityIcon = Object.assign(document.createElement("i"), {
    classList: "icofont-water-drop",
  });
  const degreeIcon = Object.assign(document.createElement("i"), {
    classList: "icofont-compass",
  });
  const speedIcon = Object.assign(document.createElement("i"), {
    classList: "icofont-wind",
  });
  const sunriseIcon = Object.assign(document.createElement("i"), {
    classList: "icofont-sun-rise",
  });
  const sunsetIcon = Object.assign(document.createElement("i"), {
    classList: "icofont-sun-set",
  });

  // Create the span
  const pressureInfo = Object.assign(document.createElement("span"), {
    innerText: `Pressure: ${pressureUnitType(weatherData.pressure)}inHg`,
  });
  const humidityInfo = Object.assign(document.createElement("span"), {
    innerText: `Humidity level: ${weatherData.humidity}%`,
  });
  const degreeInfo = Object.assign(document.createElement("span"), {
    innerText: `Wind degree: ${weatherData.degree}°`,
  });
  const speedInfo = Object.assign(document.createElement("span"), {
    innerText: `Wind speed: ${weatherData.speed}${speedUnitType(
      weatherData.unit
    )}`,
  });
  const sunriseInfo = Object.assign(document.createElement("span"), {
    innerText: `Sunrise is at: ${getTime(weatherData.sunrise)}`,
  });
  const sunsetInfo = Object.assign(document.createElement("span"), {
    innerText: `Sunset is at: ${getTime(weatherData.sunset)}`,
  });

  pressure.append(pressureIcon, pressureInfo);
  humidity.append(humidityIcon, humidityInfo);
  degree.append(degreeIcon, degreeInfo);
  speed.append(speedIcon, speedInfo);
  sunrise.append(sunriseIcon, sunriseInfo);
  sunset.append(sunsetIcon, sunsetInfo);
  currentConditions.append(pressure, humidity, degree, speed, sunrise, sunset);
};

const displayCityCountry = (data) => {
  const input = document.querySelector("[data-location-input]");
  // input.value = "";
  input.blur();
  input.value = `${data.name}, ${data.country}`;
};
const showError = (err) => {
  let errorText = `whoops... ${err.message.toLowerCase()}`;
  errorDiv.innerText = errorText;
  errorDiv.style.display = "block";
};
const hideError = () => {
  errorDiv.innerText = "";
  errorDiv.style.display = "none";
};

const passData = (data, unit) => {
  console.log(data);
  const weatherData = new Weather(data, unit);
  displayCurrentWeather(weatherData);
  displayCurrentConditions(weatherData);
  displayCityCountry(weatherData);
};

export { passData, showError, hideError };
