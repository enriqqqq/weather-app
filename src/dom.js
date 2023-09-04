import {
  celsiusToFahrenheit,
  fahrenheitToCelsius,
  mphToKph,
  kphToMph,
  convertToDay,
  convertTo12HourFormat,
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
