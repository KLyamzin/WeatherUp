import { updateApp } from "./index.js";

const toggleSwitch = document.querySelector("[data-unit-toggle]");
let unitsHandler = "imperial";
const locationInput = document.querySelector("[data-location-input]");
// gets location input
const locationHandler = () => {
  locationInput.onkeydown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      console.log("submit");
    }
  };
};

// gets the input from the units toggle switch and returns imperial or metric
toggleSwitch.addEventListener("change", (e) => {
  e.stopImmediatePropagation();
  if (e.target.checked) {
    unitsHandler = "metric";
  }
  if (!e.target.checked) {
    unitsHandler = "imperial";
  }
  updateApp();
});

export { locationHandler, unitsHandler };
