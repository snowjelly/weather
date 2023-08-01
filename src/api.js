import format from "date-fns/format";

const API_KEY = "ac4e73479652417887b194005233107";

function getToday() {
  return new Date();
}

function getYesterday() {
  const today = new Date(getToday());
  today.setDate(today.getDate() - 1);
  const yesterday = new Date(today);
  return format(new Date(yesterday), "yyyy-MM-dd");
}

async function getCurrentWeatherData(location) {
  try {
    const data = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}&aqi=no`,
    );
    const dataJSON = await data.json();
    return dataJSON;
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function getYesterdaysWeatherData(location) {
  try {
    const data = await fetch(
      `https://api.weatherapi.com/v1/history.json?key=${API_KEY}&q=${location}&dt=${getYesterday()}`,
    );
    const dataJSON = await data.json();
    const yesterday = dataJSON.forecast.forecastday[0];
    return yesterday;
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function getForecastWeatherData(location) {
  try {
    const data = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=3&aqi=no&alerts=no`,
    );
    const dataJSON = await data.json();
    const today = dataJSON.forecast.forecastday[0];
    const tomorrow = dataJSON.forecast.forecastday[1];
    const parsedData = {
      today,
      tomorrow,
    };
    return parsedData;
  } catch (err) {
    console.log(err);
    return err;
  }
}

const currentWeatherData = getCurrentWeatherData("London").then((data) => {
  const celcius = data.current.temp_c;
  const fahrenheit = data.current.temp_f;
  const windMph = data.current.wind_mph;
  const conditionText = data.current.condition.text;
  const { humidity } = data.current;
  const lastUpdated = data.current.last_updated;
  const parsedData = {
    celcius,
    fahrenheit,
    data,
    windMph,
    conditionText,
    humidity,
    lastUpdated,
  };
  return parsedData;
});

console.log(getYesterdaysWeatherData("London"));
