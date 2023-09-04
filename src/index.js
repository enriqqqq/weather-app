import getData from './api';
import { loadForecast, updateUnits, updateView, clearContainer } from './dom';
import './style.css';

const state = {
  isMetric: true,
  isDaily: true,
  HTMLlocation: document.getElementById('title'),
  HTMLwind: document.getElementById('wind'),
  HTMLhumidity: document.getElementById('humidity'),
  HTMLcloud: document.getElementById('cloud'),
  HTMLfeelsLike: document.getElementById('feels-like'),
  HTMLtemp: document.getElementById('temp'),
  HTMLcondition: document.getElementById('condition'),
  HTMLerror: document.getElementById('error'),
  HTMLweathericon: document.getElementById('weather-icon'),
  HTMLtime: document.getElementById('time'),
  HTMLdaydate: document.getElementById('daydate'),
  HTMLforecastContainer: document.getElementById('container'),
};

let locationName = 'london';
const form = document.getElementById('search-form');
const searchBar = document.getElementById('search');
const celciusBtn = document.getElementById('celcius');
const fahrenheitBtn = document.getElementById('fahrenheit');
const dailyBtn = document.getElementById('daily');
const hourlyBtn = document.getElementById('hourly');

celciusBtn.addEventListener('click', async () => {
  if (celciusBtn.classList.contains('selected')) {
    return;
  }

  state.isMetric = true;
  celciusBtn.classList.add('selected');
  fahrenheitBtn.classList.remove('selected');

  // update units
  updateUnits(state);

  // update forecast
  const data = await getData(locationName, state, 'forecast');
  clearContainer(state.HTMLforecastContainer);
  loadForecast(data, state);
});

fahrenheitBtn.addEventListener('click', async () => {
  if (fahrenheitBtn.classList.contains('selected')) {
    return;
  }

  state.isMetric = false;
  celciusBtn.classList.remove('selected');
  fahrenheitBtn.classList.add('selected');

  // update units
  updateUnits(state);

  // update forecast
  const data = await getData(locationName, state, 'forecast');
  clearContainer(state.HTMLforecastContainer);
  loadForecast(data, state);
});

dailyBtn.addEventListener('click', async () => {
  if (state.isDaily) {
    return;
  }

  state.isDaily = true;

  dailyBtn.classList.add('selected');
  hourlyBtn.classList.remove('selected');

  clearContainer(state.HTMLforecastContainer);

  // get data
  const forecastArray = await getData(locationName, state, 'forecast');

  // load forecast
  loadForecast(forecastArray, state);
});

hourlyBtn.addEventListener('click', async () => {
  if (!state.isDaily) {
    return;
  }

  state.isDaily = false;

  hourlyBtn.classList.add('selected');
  dailyBtn.classList.remove('selected');

  clearContainer(state.HTMLforecastContainer);

  // get data
  const forecastArray = await getData(locationName, state, 'forecast');

  // load forecast
  loadForecast(forecastArray, state);
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = await getData(searchBar.value, state);

  if (!data) {
    return;
  }
  // clear search bar
  searchBar.value = '';

  // clear error message
  state.HTMLerror.textContent = '';

  // update data view
  updateView(data, state);

  // clear forecast container
  clearContainer(state.HTMLforecastContainer);

  // load forecast
  loadForecast(data.forecast, state);

  // save location name;
  locationName = data.location;
});

// initial load
getData(locationName, state).then((data) => {
  if (data) {
    updateView(data, state);
    loadForecast(data.forecast, state);
  }
});
