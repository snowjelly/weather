import getWeatherData from "./api";

function getLocationWeatherData() {
  const data = JSON.parse(localStorage.getItem("locationWeatherData"));
  console.log(data);
}

async function saveLocationWeatherData() {
  const locationFormResult = document.querySelector("#location").value;
  const data = await getWeatherData(locationFormResult);
  // last updated time. add a global clock that refreshes all locationweatherdata's in the array
  const result = {
    [locationFormResult]: data,
  };
  localStorage.setItem("locationWeatherData", JSON.stringify(result));
  getLocationWeatherData();
}

export { saveLocationWeatherData, getLocationWeatherData };
