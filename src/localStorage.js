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

async function saveLocationWeatherData() {
  const locationName = document.querySelector("#location").value;
  const array = getLocationWeatherData();
  const newEntry = (currentValue) => currentValue.name !== locationName;
  if (array.every(newEntry) === false)
    throw new Error(
      "New entries cannot have the same name as an existing entry",
    );
  const data = await getWeatherData(locationName);
  if (isError(data)) throw new Error("Invalid location");
  array.push(data);
  localStorage.setItem("locationWeatherData", JSON.stringify(array));
  return array;
}

export { saveLocationWeatherData, getLocationWeatherData };
