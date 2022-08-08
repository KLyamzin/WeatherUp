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

// the sun animation in the header
const animation = lottie.loadAnimation({
  container: document.getElementById("animation"),
  renderer: "svg",
  autoplay: true,
  loop: true,
  animationData,
});
animation.setSpeed(0.5);
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

const displayCurrentWeather = (weatherData) => {
  mainDiv.innerHTML = "";
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
    classList: `weather-icon icofont-sun`,
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
const getTime = () => {
  const time = new Date();
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  const currentTime = time
    .toLocaleTimeString("en-US", options)
    .toLowerCase()
    .split(" ")
    .join("");
  return currentTime;
};

const displayCurrentConditions = (weatherData) => {
  // Create the div
  const pressure = document.createElement("div");
  const humidity = document.createElement("div");
  const degree = document.createElement("div");
  const speed = document.createElement("div");
  const sunrise = document.createElement("div");
  const sunset = document.createElement("div");

  // Create the icons
  const pressureIcon = Object.assign(document.createElement("i"), {
    classList: "icofont-warning-alt",
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
    innerText: `Pressure: ${weatherData.pressure}`,
  });
  const humidityInfo = Object.assign(document.createElement("span"), {
    innerText: `Humidity level: ${weatherData.humidity}`,
  });
  const degreeInfo = Object.assign(document.createElement("span"), {
    innerText: `Wind degree: ${weatherData.degree}`,
  });
  const speedInfo = Object.assign(document.createElement("span"), {
    innerText: `Wind speed: ${weatherData.speed}`,
  });
  const sunriseInfo = Object.assign(document.createElement("span"), {
    innerText: `Sunrise is at:${weatherData.sunrise}`,
  });
  const sunsetInfo = Object.assign(document.createElement("span"), {
    innerText: `Sunset is at: ${weatherData.sunset}`,
  });

  pressure.append(pressureIcon, pressureInfo);
  humidity.append(humidityIcon, humidityInfo);
  degree.append(degreeIcon, degreeInfo);
  speed.append(speedIcon, speedInfo);
  sunrise.append(sunriseIcon, sunriseInfo);
  sunset.append(sunsetIcon, sunsetInfo);
  currentConditions.append(pressure, humidity, degree, speed, sunrise, sunset);
};

const passData = (data, unit) => {
  console.log(data);
  const weatherData = new Weather(data, unit);
  displayCurrentWeather(weatherData);
  displayCurrentConditions(weatherData);
};

export { passData };
