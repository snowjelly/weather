import getWeatherData from "./api";

const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getWeatherData(document.querySelector("#location").value);
});
