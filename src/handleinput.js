// import { updateApp } from "./index.js";
import { apiAddress } from "./api.js";

const updateApp = (e) => {
  // The API Call
  const apiRequest = async (location, units, appid) => {
    const sentRequest = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?${location}&appid=${appid}&units=${units}`
    );
    const gotRequest = await sentRequest.json();
    console.log(gotRequest);
    if (sentRequest.status === 404) {
      window.alert(`Error: ${gotRequest.message}`);
    }
  };

  // gets location input
  const locationHandler = () => {
    let location = `q=Washington DC`; //default location
    let locationInputText = document.querySelector(
      "[data-location-input]"
    ).value;
    const regexZip = new RegExp(
      /^((\d{5}-\d{4})|(\d{5})|([A-Z]\d[A-Z]\s\d[A-Z]\d))$/
    );
    const regexCity = new RegExp(
      /^([a-zA-Z\u0080-\u024F]+(?:(. )|-| |'))*[a-zA-Z\u0080-\u024F]*$/
    );
    e.preventDefault();
    if (locationInputText !== "") {
      if (regexZip.test(locationInputText)) {
        location = `zip=${locationInputText}`;
      } else if (regexCity.test(locationInputText)) {
        location = `q=${locationInputText}`;
      } else {
        window.alert("Please enter a valid zip code or city");
      }
      return location;
    } else {
      window.alert("Please enter a valid zip code or city");
    }
  };

  // gets the input from the units toggle switch and returns imperial or metric
  const unitsHandler = () => {
    e.stopImmediatePropagation();
    let units = "imperial";
    if (e.target.checked) {
      units = "metric";
    }
    if (!e.target.checked) {
      units = "imperial";
    }
    return units;
  };
  apiRequest(locationHandler(), unitsHandler(), apiAddress);
};
export { /* locationHandler, unitsHandler, */ updateApp };
