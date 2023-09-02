import {
  celsiusToFahrenheit,
  fahrenheitToCelsius,
  mphToKph,
  kphToMph,
} from './util';

function updateView(data, state) {
  state.HTMLlocation.textContent = data.title;
  state.HTMLwind.textContent = data.wind;
  state.HTMLhumidity.textContent = data.humidity;
  state.HTMLcloud.textContent = data.cloud;
  state.HTMLfeelsLike.textContent = data.feelsLike;
  state.HTMLtemp.textContent = data.temp;
  state.HTMLcondition.textContent = data.text;
  state.HTMLweathericon.src = data.icon;
  state.HTMLtime.textContent = data.time;
  state.HTMLdaydate.textContent = `${data.day}, ${data.date}`;
}

function loadForecast() {
  console.log('TODO');
}

function updateUnits(state) {
  const regex = /\d+(\.\d+)?/;

  let temp = state.HTMLtemp.textContent.match(regex)[0];
  let feelsLike = state.HTMLfeelsLike.textContent.match(regex)[0];
  let wind = state.HTMLwind.textContent.match(regex)[0];

  if (state.isMetric) {
    // convert to metric
    temp = fahrenheitToCelsius(temp);
    feelsLike = fahrenheitToCelsius(feelsLike);
    wind = mphToKph(wind);
  } else {
    // convert to imperial
    temp = celsiusToFahrenheit(temp);
    feelsLike = celsiusToFahrenheit(feelsLike);
    wind = kphToMph(wind);
  }

  const tempUnit = state.isMetric ? '°C' : '°F';
  const windUnit = state.isMetric ? 'kph' : 'mph';

  // update view
  state.HTMLtemp.textContent = `${temp} ${tempUnit}`;
  state.HTMLfeelsLike.textContent = `${feelsLike} ${tempUnit}`;
  state.HTMLwind.textContent = `${wind} ${windUnit}`;
}

export { updateView, loadForecast, updateUnits };
