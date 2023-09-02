import getData from './api';
import { updateUnits, updateView } from './dom';
import './style.css';

const state = {
  isMetric: true,
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
};

const form = document.getElementById('search-form');
const searchBar = document.getElementById('search');
const celciusBtn = document.getElementById('celcius');
const fahrenheitBtn = document.getElementById('fahrenheit');

celciusBtn.addEventListener('click', async () => {
  if (celciusBtn.classList.contains('selected')) {
    return;
  }

  state.isMetric = true;
  celciusBtn.classList.add('selected');
  fahrenheitBtn.classList.remove('selected');
  updateUnits(state);
});

fahrenheitBtn.addEventListener('click', async () => {
  if (fahrenheitBtn.classList.contains('selected')) {
    return;
  }

  state.isMetric = false;
  celciusBtn.classList.remove('selected');
  fahrenheitBtn.classList.add('selected');
  updateUnits(state);
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = await getData(searchBar.value, state);

  if (data) {
    // clear search bar
    searchBar.value = '';

    // clear error message
    state.HTMLerror.textContent = '';

    // update data view
    updateView(data, state);
  }
});

// initial load
getData('london', state).then((data) => {
  if (data) {
    updateView(data, state);
  }
});
