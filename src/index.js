import { saveLocationWeatherData } from "./localStorage";

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

form.addEventListener("submit", (e) => {
  e.preventDefault();
  removeErrors();
  saveLocationWeatherData().catch((err) => displayFormError(err));
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
