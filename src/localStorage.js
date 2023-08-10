import getWeatherData from "./api";

function getLocationWeatherData() {
  if (JSON.parse(localStorage.getItem("locationWeatherData")) === null) {
    localStorage.setItem("locationWeatherData", JSON.stringify([]));
  }

  return JSON.parse(localStorage.getItem("locationWeatherData"));
}

async function saveLocationWeatherData() {
  const locationName = document.querySelector("#location").value;
  const array = getLocationWeatherData();
  const newEntry = (currentValue) => currentValue.name !== locationName;
  if (array.every(newEntry) === false)
    throw new Error(
      "New entries cannot have the save name as an existing entry",
    );
  const data = await getWeatherData(locationName);
  array.push(data);
  localStorage.setItem("locationWeatherData", JSON.stringify(array));
  return array;
}

export { saveLocationWeatherData, getLocationWeatherData };
