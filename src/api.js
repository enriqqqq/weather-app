// api key: 8512492edef6419aa02171515233008
import format from 'date-fns/format';
import { convertTo12HourFormat, convertToDay } from './util';

async function getData(name, state, specific = undefined) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=8512492edef6419aa02171515233008&q=${name}&days=7&alerts=no&aqi=no`,
    );

    const data = await response.json();

    // if the response is not ok
    if (response.status !== 200) {
      // pass error message to catch block
      throw data.error.message;
    }

    // construct necessary data
    const forecast = data.forecast.forecastday;
    if (specific === 'forecast') {
      return forecast;
    }

    const title = `${data.location.name}, ${data.location.country}`;

    let temp;
    let feelsLike;
    let wind;

    // get data units
    if (state.isMetric) {
      // get metric values
      temp = `${data.current.temp_c} °C`;
      feelsLike = `${data.current.feelslike_c} °C`;
      wind = `${data.current.wind_kph} kph`;
    } else {
      // get imperial values
      temp = `${data.current.temp_f} °F`;
      feelsLike = `${data.current.feelslike_f} °F`;
      wind = `${data.current.wind_mph} mph`;
    }

    const cloud = `${data.current.cloud}%`;
    const humidity = `${data.current.humidity}%`;

    const datetime = data.location.localtime; // yyyy-mm-dd hh:mm
    const [date, time] = datetime.split(' ');

    return {
      location: data.location.name,
      title,
      code: data.current.condition.code,
      text: data.current.condition.text,
      icon: data.current.condition.icon,
      temp,
      feelsLike,
      wind,
      cloud,
      humidity,
      date: format(new Date(date), 'd MMMM yyyy'),
      time: convertTo12HourFormat(time),
      day: convertToDay(date),
      forecast,
    };
  } catch (error) {
    state.HTMLerror.textContent = error;
    return undefined;
  }
}

export default getData;
