// Takes input zip or city name and returns appropriate location
const location = (locationInput) => {
  // RegExp to match either zip or city name
  const regexZip = new RegExp(
    /^((\d{5}-\d{4})|(\d{5})|([A-Z]\d[A-Z]\s\d[A-Z]\d))$/
  );
  const regexCity = new RegExp(
    /^([a-zA-Z\u0080-\u024F]+(?:(. )|-| |'))*[a-zA-Z\u0080-\u024F]*$/
  );

  let locationForApi;

  // Remove spaces from input
  let temp = locationInput
    .replace(/(\s+$|^\s+)/g, "")
    .replace(/(,\s+)/g, ",")
    .replace(/(\s+,)/g, ",");
  /* .replace(/\s+/g, "+"); */ // replaces spaces with plus

  if (temp !== "") {
    if (regexZip.test(temp)) {
      locationForApi = `zip=${temp}`;
    } else if (regexCity.test(temp)) {
      locationForApi = `q=${temp}`;
    }
  }
  return locationForApi;
};

// gets the input from the units toggle switch and returns imperial or metric
const unitsToggle = (e) => {
  let units = "imperial";
  if (e.target.checked) {
    units = "metric";
  }
  if (!e.target.checked) {
    units = "imperial";
  }
  return units;
};

export { location, unitsToggle };
