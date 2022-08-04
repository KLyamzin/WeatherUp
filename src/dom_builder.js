import lottie from "lottie-web";
import animationData from "./assets/61114-clear-day.json";

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
  constructor(data) {
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
  }
  print() {
    console.log(this.name, this.temp, this.feels_like, this.description);
  }
}

let weatherData;

const passData = (data) => {
  console.log(data);

  weatherData = new Weather(data);
  weatherData.print();
};

export { passData };
