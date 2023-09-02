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

export { updateView, loadForecast };
