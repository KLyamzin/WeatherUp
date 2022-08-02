import "./unitslider.css";
import "./main.css";
import * as handle from "./handleinput.js";
import * as apiRequest from "./api_requests";
import { apiAddress } from "./api";

// Default units
let units = "imperial";
let savedLocation;

/* Search by input value on form submit */
const locationInputForm = document.querySelector("[data-location-form]");

locationInputForm.addEventListener("submit", (e) => {
  const locationInput = document.querySelector("[data-location-input]").value;
  e.preventDefault();

  // send the input value to the function
  let location = locationForApi(locationInput);

  // Call the function to get the location weather
  resolveWeatherData(location, units);
  savedLocation = location;
});

// Takes input zip or city name and returns appropriate location
function locationForApi(locationInput) {
  let locationForApi = handle.location(locationInput);
  return locationForApi;
}

// function to call the API methods and return data
async function resolveWeatherData(location, units) {
  const coordinates = await apiRequest.initialApiRequest(
    location,
    apiAddress,
    units
  );
  console.log(coordinates);
}

/* Change to units using the toggle*/
const toggleSwitch = document.querySelector("[data-unit-toggle]");
toggleSwitch.addEventListener("change", (e) => {
  e.stopImmediatePropagation();
  units = handle.unitsToggle(e);
  resolveWeatherData(savedLocation, units);
  //   console.log(units);
});
