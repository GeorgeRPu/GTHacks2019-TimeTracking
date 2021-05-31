import dayjs from 'dayjs';

function dateString(date) {
    return date.format("YYYY-MM-DD");
}

function dayOfWeek(date) {
    return date.format("ddd");
}

function timeString(date) {
    return date.format("HH:mm A");
}

function durationString(date1, date2) {
    const duration = durationBetween(date1, date2);
    return duration.hours() + " hours " + duration.minutes() + " minutes"
}

function durationBetween(date1, date2) {
    return dayjs.duration(date2.diff(date1));
}

export {dateString, dayOfWeek, timeString, durationString, durationBetween};
