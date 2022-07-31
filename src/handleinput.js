import { updateApp } from "./index.js";

const toggleSwitch = document.querySelector("[data-unit-toggle]");
let unitsHandler = "imperial";

// gets location input
const locationHandler = () => {
  return "q=orlando";
};

// gets the input from the units toggle switch and returns imperial or metric
// const unitsHandler = () => {
toggleSwitch.addEventListener("change", (e) => {
  e.stopImmediatePropagation();
  if (e.target.checked) {
    unitsHandler = "metric";
  }
  if (!e.target.checked) {
    unitsHandler = "imperial";
  }
  // return unit;
  updateApp();
});

// };

// export { unitsHandler, locationHandler };
export { locationHandler, unitsHandler };
