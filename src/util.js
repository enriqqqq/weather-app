function convertTo12HourFormat(time) {
  const [hour, minute] = time.split(':');
  parseInt(hour, 10);

  const period = hour < 12 ? 'AM' : 'PM';

  // if hour is 0, then write 12
  const hour12 = hour % 12 || 12;

  const time12 = `${hour12}:${minute} ${period}`;
  return time12;
}

function convertToDay(date) {
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
  return daysOfWeek[dateObj.getDay()];
}

export { convertTo12HourFormat, convertToDay };
