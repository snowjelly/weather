import getWeatherData from "./api";
import {
  getFavoriteWeatherData,
  getLocationWeatherData,
  saveFavoriteWeatherData,
  saveLocationWeatherData,
} from "./localStorage";

const form = document.querySelector("form");
const showNavBtn = document.querySelector(".hamburger");
const nav = document.querySelector("nav");
const errorDiv = document.querySelector("#error");

function displayFormError(err) {
  errorDiv.textContent = err;
  form.classList.add("error");
}

function removeErrors() {
  errorDiv.textContent = "";
  form.classList.remove("error");
}

function removeForm() {
  const enterDataForm = document.querySelector("#enter-data");
  enterDataForm.setAttribute("invisible", "");
}

async function renderStage2() {
  const weatherHeader = document.querySelector(".weather-header");
  const degreeHeader = document.querySelector(".degrees h1");
  const favWeatherQuery = getFavoriteWeatherData().name;
  const favWeatherData = await getWeatherData(favWeatherQuery);
  favWeatherData.favorite = true;
  saveFavoriteWeatherData(favWeatherData);
  const tempF = favWeatherData.current.current.temp_f;
  const high = favWeatherData.today.day.maxtemp_f;
  const low = favWeatherData.today.day.mintemp_f;
  const feelsLike = favWeatherData.current.current.feelslike_f;
  const condition = document.querySelector("div.condition");
  const location = document.querySelector(".location");
  const highDiv = document.querySelector("#high");
  const lowDiv = document.querySelector("#low");
  const feelsLikeDiv = document.querySelector(".feels-like");
  degreeHeader.textContent = `${tempF} °`;
  condition.textContent = favWeatherData.current.current.condition.text;
  location.textContent = favWeatherData.name;
  highDiv.textContent = high;
  lowDiv.textContent = low;
  feelsLikeDiv.textContent = `Feels like ${feelsLike}°`;

  showNavBtn.setAttribute("visible", "");
  weatherHeader.setAttribute("visible", "");
  console.log(favWeatherData);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  removeErrors();
  saveLocationWeatherData()
    .catch((err) => displayFormError(err))
    .then((val) => {
      if (val !== undefined) {
        console.log("stage2");
        removeForm();
        renderStage2();
      }
    });
});

showNavBtn.addEventListener("click", () => {
  if (nav.getAttribute("visible") === null) {
    nav.setAttribute("visible", "");
  } else {
    nav.setAttribute("closing", "");
    nav.addEventListener(
      "animationend",
      () => {
        nav.removeAttribute("visible");
        nav.removeAttribute("closing", "");
      },
      { once: true },
    );
  }
});

function renderWeatherList() {
  const weatherDataArray = getLocationWeatherData();

  for (let i = 0; i < weatherDataArray.length; i += 1) {
    const parentUl = document.querySelector("#list-locations");
    parentUl.innerHTML = `
    <li>${weatherDataArray[i].name}</li>
  `;
  }
}

export { renderStage2, removeForm };
