import getWeatherData from "./api";
import {
  getLocationWeatherData,
  saveLocationWeatherData,
} from "./localStorage";

const form = document.querySelector("form");
const showNavBtn = document.querySelector(".hamburger");
const nav = document.querySelector("nav");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  // so basically i need to grab the weather data in an async function
  // await it then save it, then i can getthe data and log it
  saveLocationWeatherData();
});

showNavBtn.addEventListener("click", (e) => {
  if (nav.getAttribute("visible") === null) {
    nav.setAttribute("visible", "");
  } else {
    nav.setAttribute("closing", "");
    nav.addEventListener(
      "animationend",
      (e) => {
        nav.removeAttribute("visible");
        nav.removeAttribute("closing", "");
      },
      { once: true },
    );
  }
});
