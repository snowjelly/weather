import format from "date-fns/format";

async function getCurrentWeatherData(location) {
  try {
    const data = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=ac4e73479652417887b194005233107&q=${location}&aqi=no`,
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
    const today = format(new Date(), `dd`);
    const yesterday = today - 1;
    const yesterdayFull = format(new Date(), `yyyy-MM-${yesterday}`);
    console.log(yesterdayFull);
    return today;
    // const data = await fetch(``);
  } catch (err) {
    console.log(err);
    return err;
  }
}

getYesterdaysWeatherData("");

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
  console.log(parsedData);
  return parsedData;
});
