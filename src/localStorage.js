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

function saveFavoriteWeatherData() {
  const weatherDataArray = getLocationWeatherData();
  const favorite = weatherDataArray[0];
  favorite.favorite = true;
  localStorage.setItem("favorite", JSON.stringify(favorite));
}

async function saveLocationWeatherData() {
  const locationName = document.querySelector("#location").value;
  const array = getLocationWeatherData();
  const data = await getWeatherData(locationName);
  const newEntry = (currentValue) => currentValue.name !== data.name;
  if (array.every(newEntry) === false) throw new Error("No duplicate entries");
  if (isError(data)) throw new Error("Invalid location");
  array.push(data);
  localStorage.setItem("locationWeatherData", JSON.stringify(array));
  console.log(data);
  saveFavoriteWeatherData();
  return array;
}

export { saveLocationWeatherData, getLocationWeatherData };
