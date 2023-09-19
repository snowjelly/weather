import getWeatherData from "./api";

function getLocationWeatherData() {
  if (JSON.parse(localStorage.getItem("locationWeatherData")) === null) {
    localStorage.setItem("locationWeatherData", JSON.stringify([]));
  }

  return JSON.parse(localStorage.getItem("locationWeatherData"));
}

function isError(obj) {
  return Object.prototype.toString.call(obj) === "[object Error]";
}

function saveFavoriteWeatherData(weatherData) {
  localStorage.setItem("favorite", JSON.stringify(weatherData));
}

function getFavoriteWeatherData() {
  const data = JSON.parse(localStorage.getItem("favorite"));
  return data;
}

async function saveLocationWeatherData() {
  const locationName = document.querySelector("#location").value;
  const array = getLocationWeatherData();
  const data = await getWeatherData(locationName);
  const newEntry = (currentValue) => currentValue.name !== data.name;

  console.log(locationName, array, data);

  if (array.every(newEntry) === false) throw new Error("No duplicate entries");
  if (isError(data)) throw new Error("Invalid location");

  array.push(data);
  localStorage.setItem("locationWeatherData", JSON.stringify(array));
  saveFavoriteWeatherData(data);
  console.log(data);
  return array;
}

async function reloadFavWeatherData() {
  const favWeatherDataQuery = getFavoriteWeatherData().name;
  const reloadedFavWeatherData = await getWeatherData(favWeatherDataQuery);
  saveFavoriteWeatherData(reloadedFavWeatherData);
  return reloadedFavWeatherData;
}

export {
  saveLocationWeatherData,
  saveFavoriteWeatherData,
  getLocationWeatherData,
  getFavoriteWeatherData,
  reloadFavWeatherData,
};
