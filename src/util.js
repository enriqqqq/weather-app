function convertTo12HourFormat(time) {
  const [hour, minute] = time.split(':');
  parseInt(hour, 10);

  const period = hour < 12 ? 'AM' : 'PM';

  // if hour is 0, then write 12
  const hour12 = hour % 12 || 12;

  const time12 = `${hour12}:${minute} ${period}`;
  return time12;
}

// get day based on date
function convertToDay(date, abbreviation = false) {
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const dateObj = new Date(date);

  // e.g Mon, Tue, Wed
  if (abbreviation) {
    return daysOfWeek[dateObj.getDay()].slice(0, 3);
  }

  // e.g Monday, Tuesday
  return daysOfWeek[dateObj.getDay()];
}

// Function to convert Celsius to Fahrenheit and round to 1 decimal place
function celsiusToFahrenheit(celsius) {
  const fahrenheit = (celsius * 9) / 5 + 32;
  return fahrenheit.toFixed(1); // Round to 1 decimal place
}

// Function to convert Fahrenheit to Celsius and round to 1 decimal place
function fahrenheitToCelsius(fahrenheit) {
  const celsius = ((fahrenheit - 32) * 5) / 9;
  return celsius.toFixed(1); // Round to 1 decimal place
}

// Function to convert kilometers per hour (kph) to miles per hour (mph)
function kphToMph(kph) {
  const mph = kph * 0.621371;
  return mph.toFixed(1); // Round to 1 decimal place
}

// Function to convert miles per hour (mph) to kilometers per hour (kph)
function mphToKph(mph) {
  const kph = mph / 0.621371;
  return kph.toFixed(1); // Round to 1 decimal place
}

export {
  convertTo12HourFormat,
  convertToDay,
  celsiusToFahrenheit,
  fahrenheitToCelsius,
  mphToKph,
  kphToMph,
};
