import { saveLocationWeatherData } from "./localStorage";

const form = document.querySelector("form");
const showNavBtn = document.querySelector(".hamburger");
const nav = document.querySelector("nav");

function displayFormError(err) {
  const errorDiv = document.querySelector(".error");
  errorDiv.textContent = err;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  saveLocationWeatherData().catch((err) => displayFormError(err));
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
