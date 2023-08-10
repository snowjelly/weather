import getWeatherData from "./api";

async function saveLocationWeatherData() {
  const data = await getWeatherData(document.querySelector("#location").value);
  console.log(data);
  localStorage.setItem("locationWeatherData", JSON.stringify(data));
}

function getLocationWeatherData() {
  const data = JSON.parse(localStorage.getItem("locationWeatherData"));
  console.log(data);
}

export { saveLocationWeatherData, getLocationWeatherData };
