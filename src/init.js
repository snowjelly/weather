import { removeForm, renderStage2 } from ".";
import { getFavoriteWeatherData } from "./localStorage";

function openHamburgerMenu() {
  document.querySelector("nav").setAttribute("visible", "");
}

if (getFavoriteWeatherData() !== null) {
  removeForm();
  renderStage2();
}
