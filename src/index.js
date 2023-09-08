import {
  getFavoriteWeatherData,
  getLocationWeatherData,
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

function renderStage2() {
  const weatherHeader = document.querySelector(".weather-header");
  const degreeHeader = document.querySelector(".degrees h1");
  const favWeatherData = getFavoriteWeatherData();
  const tempF = favWeatherData.current.current.temp_f;
  degreeHeader.textContent = `${tempF} °`;
  showNavBtn.setAttribute("visible", "");
  weatherHeader.setAttribute("visible", "");
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
