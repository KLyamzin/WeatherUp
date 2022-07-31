import "./unitslider.css";
import "./main.css";
import { apiAddress } from "./api.js";
import { locationHandler, unitsHandler } from "./handleinput.js";

const apiRequest = async (inputLocation, units, appid) => {
  //   console.log(unitsHandler());
  //   console.log("Before API call:", units);
  const sentRequest = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?${inputLocation}&appid=${appid}&units=${units}`
  );
  const gotRequest = await sentRequest.json();
  console.log(gotRequest);
};
function updateApp() {
  apiRequest(locationHandler(), unitsHandler, apiAddress);
}
updateApp();
export { updateApp };
