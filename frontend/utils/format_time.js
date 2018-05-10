export const formatTime = timestamp => {
  const months = [
    '',
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];


  const [n, year, month, day, hour, minute, second] =
  (/(\w+)-(\w+)-(\w+)T(\w+):(\w+):(\w+)/).exec(timestamp);

  const format_year = parseInt(year);
  const format_month = months[parseInt(month)];
  const format_day = parseInt(day);
  const format_hour = parseInt(hour);
  const format_minute = parseInt(minute);
  const format_second = parseInt(second);

  return `${format_month} ${format_day}`;
};
