import {
  celsiusToFahrenheit,
  fahrenheitToCelsius,
  mphToKph,
  kphToMph,
  convertToDay,
  convertTo12HourFormat,
} from './util';

import cloudyImg from './images/cloudy.png';
import foggyImg from './images/foggy.png';
import rainyImg from './images/rainy.png';
import snowyImg from './images/snowy.jpg';
import sunnyImg from './images/sunny.png';
import thunderstormImg from './images/thunderstorm.jpg';
import defaultImg from './images/default.jpeg';

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

  let image;
  // change background
  switch (data.code) {
    // sunny background
    case 1000:
      image = sunnyImg;
      break;

    // cloudy background
    case 1003:
    case 1006:
    case 1009:
      image = cloudyImg;
      break;

    // foggy background
    case 1030:
    case 1135:
    case 1147:
      image = foggyImg;
      break;

    // rainy background
    case 1063:
    case 1150:
    case 1153:
    case 1168:
    case 1171:
    case 1180:
    case 1183:
    case 1186:
    case 1189:
    case 1192:
    case 1195:
    case 1198:
    case 1201:
    case 1240:
      image = rainyImg;
      break;

    // snowy background
    case 1066:
    case 1069:
    case 1072:
    case 1114:
    case 1117:
    case 1204:
    case 1207:
    case 1210:
    case 1213:
    case 1216:
    case 1219:
    case 1222:
    case 1225:
    case 1237:
    case 1243:
    case 1249:
    case 1252:
    case 1255:
    case 1258:
    case 1261:
    case 1264:
      image = snowyImg;
      break;

    // thunderstorm background
    case 1087:
    case 1273:
    case 1276:
    case 1279:
    case 1282:
      image = thunderstormImg;
      break;

    default:
      image = defaultImg;
  }

  document.body.style.backgroundImage = `url(${image})`;
}

function loadForecast(forecastArray, state) {
  if (state.isDaily) {
    forecastArray.forEach((forecastItem) => {
      let maxTemp;
      let minTemp;

      if (state.isMetric) {
        maxTemp = forecastItem.day.maxtemp_c;
        minTemp = forecastItem.day.mintemp_c;
      } else {
        maxTemp = forecastItem.day.maxtemp_f;
        minTemp = forecastItem.day.mintemp_f;
      }

      const html = `
        <div class="forecast-item">
            <p class="subtitle">${convertToDay(forecastItem.date, true)}</p>
            <img class="data-icon" src="${
              forecastItem.day.condition.icon
            }" alt=""/>
            <div class="max-min-temp">
                <p class="subtitle max">${maxTemp}°</p>
                <p class="subtitle">${minTemp}°</p>
            </div>
        </div>`;

      state.HTMLforecastContainer.insertAdjacentHTML('beforeend', html);
    });
  } else {
    const hourArray = forecastArray[0].hour;

    let temp;
    hourArray.forEach((hourItem) => {
      if (state.isMetric) {
        temp = hourItem.temp_c;
      } else {
        temp = hourItem.temp_f;
      }

      const [, time] = hourItem.time.split(' ');

      const html = `
        <div class="forecast-item">
          <p class="subtitle">${convertTo12HourFormat(time)}</p>
          <img class="data-icon" src="${hourItem.condition.icon}" alt=""/>
          <div class="subtitle max">${temp}°</div>
        </div>
      `;
      state.HTMLforecastContainer.insertAdjacentHTML('beforeend', html);
    });
  }
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

function clearContainer(parentDiv) {
  while (parentDiv.firstChild) {
    parentDiv.removeChild(parentDiv.firstChild);
  }
}

export { updateView, loadForecast, updateUnits, clearContainer };
