import { updateApp } from "./index.js";

const locationInputForm = document.querySelector("[data-location-form]");
const locationInput = document.querySelector("[data-location-input]");
// let locationInputText = document.querySelector("[data-location-input]").value;
let locationHandler = "q=Orlando";
const regexZip = new RegExp(
  /^((\d{5}-\d{4})|(\d{5})|([A-Z]\d[A-Z]\s\d[A-Z]\d))$/
);
const regexCity = new RegExp(
  /^([a-zA-Z\u0080-\u024F]+(?:(. )|-| |'))*[a-zA-Z\u0080-\u024F]*$/
);
// gets location input
locationInputForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let locationInputText = document.querySelector("[data-location-input]").value;
  if (regexZip.test(locationInputText)) {
    locationHandler = `zip=${locationInputText}`;
  } else if (regexCity.test(locationInputText)) {
    locationHandler = `q=${locationInputText}`;
  } else {
    window.alert("Please enter a valid zip code or city");
  }
  updateApp();
});
// gets the input from the units toggle switch and returns imperial or metric
const toggleSwitch = document.querySelector("[data-unit-toggle]");
let unitsHandler = "imperial";
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
