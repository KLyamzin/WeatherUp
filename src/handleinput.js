import { updateApp } from "./index.js";
const locationHandler = () => {
  return "q=orlando";
};

// gets the input from the units toggle switch and returns imperial or metric
const unitsHandler = () => {
  const toggleSwitch = document.querySelector("[data-unit-toggle]");
  let unit = "imperial";
  toggleSwitch.addEventListener("change", (e) => {
    if (e.target.checked) {
      unit = "metric";
    }
    if (!e.target.checked) {
      unit = "imperial";
    }
    console.log("After toggle switch:", unit);
    updateApp();
  });
  return unit;
};
export { unitsHandler, locationHandler };
