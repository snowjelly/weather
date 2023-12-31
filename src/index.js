import { format, lightFormat } from "date-fns";
import getWeatherData from "./api";
import {
  getFavoriteWeatherData,
  getLocationWeatherData,
  reloadFavWeatherData,
  saveFavoriteWeatherData,
  saveLocationWeatherData,
  updateLocationWeatherData,
} from "./localStorage";

const form = document.querySelector("form");
const showNavBtn = document.querySelector(".hamburger");
const nav = document.querySelector("nav");
const errorDiv = document.querySelector("#error");

function findLocationByName(name) {
  const locationList = getLocationWeatherData();
  for (let i = 0; i < locationList.length; i += 1) {
    if (locationList[i].name === name) {
      return i;
    }
  }
  return null;
}

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

function showForm() {
  const enterDataForm = document.querySelector("#enter-data");
  enterDataForm.removeAttribute("invisible");
}

function getReadableDate(date) {
  const fullDate = date.slice("0", "10");
  const time = date.slice("10");
  const yyyy = fullDate.slice("0", "4");
  const mm = fullDate.slice("5", "7") - 1;
  const dd = fullDate.slice("8");
  return format(new Date(yyyy, mm, dd), `MMMM d,${time}`);
}

function iconSrcStringExtractor(src) {
  return `https://${src.slice(2)}`;
}

function getLocationQueryString(e) {
  const favWeatherQuery =
    e.currentTarget.children[0].children[0].textContent.split(", ")[0];
  return favWeatherQuery;
}

function renderStoredLocationList() {
  const locationList = getLocationWeatherData();
  const locationListDiv = document.querySelector(".location-list");
  locationListDiv.innerHTML = "";
  console.log(locationList);

  for (let i = 0; i < locationList.length; i += 1) {
    const location = document.createElement("div");
    location.classList.add("location-list-item");
    location.innerHTML = `
    <div class="list-info">
      <div class="list-name">${locationList[i].name}, ${
        locationList[i].current.location.region
      }</div>
      <div class="list-last-updated">${getReadableDate(
        locationList[i].current.current.last_updated,
      )}</div>
    </div>
    <div class="list-temp-container">
      <div class="list-temp">${Math.floor(
        locationList[i].current.current.temp_f,
      )} °</div>
      <img src="${iconSrcStringExtractor(
        locationList[i].current.current.condition.icon,
      )}"></img>
    </div>
    <svg class="trash" data-id="${i}" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path data-id="${i}" d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
    `;
    locationListDiv.appendChild(location);
  }
}

async function renderBgColor() {
  const favWeatherData = await reloadFavWeatherData();
  const condition = favWeatherData.current.current.condition.text;
  const content = document.querySelector(".content");
  if (condition === "Sunny") {
    content.setAttribute("bg-color", "sunny");
  } else if (condition === "Partly cloudy") {
    content.setAttribute("bg-color", "partly-cloudy");
  } else if (condition === "Overcast") {
    content.setAttribute("bg-color", "overcast");
  } else if (condition === "Clear") {
    content.setAttribute("bg-color", "clear");
  }
}

async function renderHourly(day) {
  const renderDay = document.querySelector(`.${day}`);
  if (renderDay.children.length !== 0) {
    renderDay.innerHTML = "";
  }
  const favWeatherData = await reloadFavWeatherData();
  const currentTime = favWeatherData.current.current.last_updated.slice(11, 13);
  for (let i = Math.floor(currentTime); i < 24; i += 1) {
    const renderHour = document.createElement("div");
    renderHour.classList = `time-${day}`;
    renderHour.innerHTML = `
      <div class="time">${i}:00</div>
      <div class="condition-icon">
        <img src="${iconSrcStringExtractor(
          favWeatherData[day].hour[i].condition.icon,
        )}"></img>
      </div>
      <p class="temp">${Math.round(favWeatherData[day].hour[i].temp_f)}°</p>
    `;
    renderDay.appendChild(renderHour);
  }
}

function getScrollToValue(day) {
  const favWeatherData = reloadFavWeatherData();
  const currentTime = favWeatherData.current.current.last_updated.slice(11, 13);
  const hourlyTimeElements = document.querySelectorAll(`.time-${day}`);
  const scrollValue = hourlyTimeElements[Math.floor(currentTime)];

  return scrollValue;
}

async function renderStage2() {
  const content = document.querySelector(".content");
  content.setAttribute("visible", "");
  const weatherHeader = document.querySelector(".weather-header");
  const degreeHeader = document.querySelector(".degrees h1");
  document.querySelector(".loading").setAttribute("visible", "");
  const favWeatherData = await reloadFavWeatherData();
  document.querySelector(".loading").removeAttribute("visible");
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
  degreeHeader.textContent = `${Math.round(tempF)}°`;
  condition.textContent = favWeatherData.current.current.condition.text;
  location.textContent = favWeatherData.name;
  highDiv.textContent = Math.round(high);
  lowDiv.textContent = Math.round(low);
  feelsLikeDiv.textContent = `Feels like ${Math.round(feelsLike)}°`;

  renderHourly("today");
  renderHourly("tomorrow");

  showNavBtn.setAttribute("visible", "");
  weatherHeader.setAttribute("visible", "");
  renderBgColor(favWeatherData);
}

async function updateAllLocationWeatherData() {
  const locationWeatherDataArray = getLocationWeatherData();
  const promises = [];
  for (let i = 0; i < locationWeatherDataArray.length; i += 1) {
    const query = locationWeatherDataArray[i].name;
    promises.push(getWeatherData(query));
    updateLocationWeatherData(locationWeatherDataArray);
  }
  const updatedLocationWeatherDataArray = await Promise.all(promises);
  updateLocationWeatherData(updatedLocationWeatherDataArray);
}

async function changeFavorite(e) {
  const favWeatherQuery = getLocationQueryString(e);
  const weatherData = await getWeatherData(favWeatherQuery);
  const selectedLocation = findLocationByName(favWeatherQuery);
  const locationWeatherDataArray = getLocationWeatherData();
  locationWeatherDataArray[selectedLocation] = weatherData;
  updateLocationWeatherData(locationWeatherDataArray);
  console.log(weatherData);
  return weatherData;
}

function cancelForm(e) {
  e.preventDefault();
  removeForm();
  renderStage2();
}

function removeLocation(e) {
  const locationIdToRemove = e.target.dataset.id;
  const locationWeatherData = getLocationWeatherData();
  if (locationWeatherData.length === 1) {
    alert("Cannot remove remaining location");
    return;
  }
  locationWeatherData.splice(locationIdToRemove, 1);
  updateLocationWeatherData(locationWeatherData);
  renderStoredLocationList();
}

async function stage4(e) {
  if (e.target.nodeName === "path" || e.target.nodeName === "svg") {
    removeLocation(e);
    return;
  }
  const newWeatherData = await changeFavorite(e);
  saveFavoriteWeatherData(newWeatherData);
  await renderStage2();
  cancelForm(e);
}

function addLocationListEventListeners() {
  const locations = document.querySelectorAll(".location-list-item");
  for (let i = 0; i < locations.length; i += 1) {
    locations[i].addEventListener("click", stage4);
  }
}

async function renderStage3() {
  const weatherHeader = document.querySelector(".weather-header");
  const content = document.querySelector(".content");
  const locationListDiv = document.querySelector(".location-list");
  const cancelBtn = document.querySelector(".cancel-btn");

  cancelBtn.setAttribute("visible", "");
  cancelBtn.addEventListener("click", cancelForm);

  showNavBtn.removeAttribute("visible");
  weatherHeader.removeAttribute("visible");
  content.removeAttribute("visible");

  showForm();
  locationListDiv.innerHTML = "";
  document.querySelector(".loading").setAttribute("visible", "");
  await updateAllLocationWeatherData();
  document.querySelector(".loading").removeAttribute("visible");
  renderStoredLocationList();
  addLocationListEventListeners();
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
  renderStage3();
});

// render stage2 every 15 minutes
setInterval(() => {
  if (!document.querySelector(".content").getAttribute("visible")) {
    return;
  }
  renderStage2();
}, 900000);

export { renderStage2, removeForm };
