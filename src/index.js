import "./unitslider.css";
import "./main.css";
import { updateApp } from "./handleinput.js";

// const apiRequest = async (inputLocation, units, appid) => {
//   const sentRequest = await fetch(
//     `https://api.openweathermap.org/data/2.5/weather?${inputLocation}&appid=${appid}&units=${units}`
//   );
//   const gotRequest = await sentRequest.json();
//   console.log(gotRequest);
//   if (sentRequest.status === 404) {
//     window.alert(`Error: ${gotRequest.message}`);
//   }
// };
// function updateApp() {
//   apiRequest(locationHandler, unitsHandler, apiAddress);
// }
// updateApp();
// export { updateApp };

/* Search by input value */
const locationInputForm = document.querySelector("[data-location-form]");
locationInputForm.addEventListener("submit", (e) => {
  updateApp(e);
});
/* Change to units */
const toggleSwitch = document.querySelector("[data-unit-toggle]");
toggleSwitch.addEventListener("change", (e) => {
  updateApp(e);
});

window.onload = updateApp.apiRequest();
