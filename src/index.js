import getWeatherData from "./api";

const form = document.querySelector("form");
const showNavBtn = document.querySelector(".hamburger");
const nav = document.querySelector("nav");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getWeatherData(document.querySelector("#location").value);
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
