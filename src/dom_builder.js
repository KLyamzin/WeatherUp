import lottie from "lottie-web";
import animationData from "./assets/61114-clear-day.json";
import "./icofont/icofont.min.css";

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
    } = data);
    this.unit = unit;
  }
  print() {
    console.log(
      this.name,
      this.temp,
      this.feels_like,
      this.description,
      this.unit
    );
  }
  displayCurrentWeather() {
    const currentWeather = document.querySelector("[data-current-weather]");
    const date = Object.assign(document.createElement("span"), {});
    const time = Object.assign(document.createElement("span"), {});
    const temp = Object.assign(document.createElement("span"), {
      innerText: this.temp,
    });
    const feels_like = Object.assign(document.createElement("span"), {
      innerText: this.feels_like,
    });
    const description = Object.assign(document.createElement("span"), {
      innerText: this.description,
    });
    const temp_max = Object.assign(document.createElement("span"), {
      innerText: this.temp_max,
    });
    const temp_min = Object.assign(document.createElement("span"), {
      innerText: this.temp_min,
    });

    // icons
    const tempMaxIcon = Object.assign(document.createElement("i"), {
      id: "temp-max-icon",
      class: "temp-max-icon",
    });
    const tempMinIcon = Object.assign(document.createElement("i"), {
      id: "temp-min-icon",
      class: "temp-min-icon",
    });
    const icon = Object.assign(document.createElement("i"), {
      id: "weather-icon",
      classList: "weather-icon icofont-sun-alt",
    });

    // div elements
    const iconDateTimeDiv = Object.assign(document.createElement("div"), {
      class: "icon-date-time",
    });
    const allTempsDiv = Object.assign(document.createElement("div"), {
      class: "all-temps",
    });

    // Append everything
    iconDateTimeDiv.append(icon, time, date);
    allTempsDiv.append(
      tempMaxIcon,
      temp_max,
      tempMinIcon,
      temp_min,
      temp,
      feels_like
    );
    currentWeather.append(iconDateTimeDiv, allTempsDiv, description);
  }
}

const passData = (data, unit) => {
  const weatherData = new Weather(data, unit);
  weatherData.print();
  weatherData.displayCurrentWeather();
};

export { passData };
