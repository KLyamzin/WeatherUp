/* Initial API request to get the coordinates  */
const initialApiRequest = async (location, appid, units) => {
  const request = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?${location}&appid=${appid}&units=${units}`
  );
  const answer = await request.json();
  return answer;
};

export { initialApiRequest };
