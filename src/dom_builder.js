import lottie from "lottie-web";
import animationData from "./assets/61114-clear-day.json";

const animation = lottie.loadAnimation({
  container: document.getElementById("animation"),
  renderer: "svg",
  autoplay: true,
  loop: true,
  animationData,
});
animation.setSpeed(0.5);
animation.goToAndPlay(0, true);
