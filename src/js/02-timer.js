// Importing Flatpickr
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
//Importing Notlifix
import Notiflix from 'notiflix';

const refs = {
  buttonEl: document.querySelector('button'),
  inputEl: document.querySelector('input'),
  daysQuantitySpanEl: document.querySelector('[data-days]'),
  hoursQuantitySpanEl: document.querySelector('[data-hours]'),
  minutesQuantitySpanEl: document.querySelector('[data-minutes]'),
  secondsdaysQuantitySpanEl: document.querySelector('[data-seconds]'),
  timerEl: document.querySelector('.timer'),
};

let currentDate = new Date();
//Setting disabled attribute to button "button freezing"
refs.buttonEl.setAttribute('disabled', true);
//Initialisation of endDate - selected by user
let endDate = 0;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < currentDate) {
      console.log('date is NOK');
      Notiflix.Report.failure(
        'Fatal Error',
        'Please choose a date in the future',
        'Push me to close'
      );
      // window.alert('Please choose a date in the future');
    } else {
      Notiflix.Notify.success('You are on the right track');
      refs.buttonEl.removeAttribute('disabled');
      console.log('date is OK');
      endDate = selectedDates[0].getTime();
    }
  },
};

//Flatpickr Initialising
flatpickr(' input#datetime-picker', options);
require('flatpickr/dist/themes/material_blue.css');

refs.buttonEl.addEventListener('click', onStartButtonClick);
function onStartButtonClick() {
  refs.buttonEl.setAttribute('disabled', true);
  refs.inputEl.setAttribute('disabled', true);
  console.log('click working');
  console.log(endDate);
  initializeClock(endDate);
}
//
function addLeadingZero(value) {
  // if (value.toString().length === 1) {
  //   value = `0${value}`;
  //   return value;
  // } else return value;
  return String(value).padStart(2, '0');
}
console.log(new Date());
function getTimeRemaining(endtime) {
  let dif = endtime - Date.parse(new Date());
  return dif;
}
//
function initializeClock(endtime) {
  let timeinterval = setInterval(function () {
    refs.timerEl.style.color = getRandomHexColor();

    let t = getTimeRemaining(endtime);
    const { days, hours, minutes, seconds } = convertMs(t);
    // let remainingSecondsQuantity = addLeadingZero(seconds);
    // let remainingMinutesQuantity = addLeadingZero(minutes);
    // let remainingHoursQuantity = addLeadingZero(hours);
    // let remainingDaysQuantity = addLeadingZero(days);
    refs.secondsdaysQuantitySpanEl.textContent = addLeadingZero(seconds);
    refs.minutesQuantitySpanEl.textContent = addLeadingZero(minutes);
    refs.hoursQuantitySpanEl.textContent = addLeadingZero(hours);
    refs.daysQuantitySpanEl.textContent = addLeadingZero(days);
    if (t <= 0) {
      clearInterval(timeinterval);
      refs.buttonEl.removeAttribute('disabled');
      refs.inputEl.removeAttribute('disabled');
    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  // let ms = 1661539500000 - currentDate.getTime();
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  // console.log({ days, hours, minutes, seconds });

  return { days, hours, minutes, seconds };
}
// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

refs.timerEl.style.color = getRandomHexColor();
console.log(refs.timerEl);
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
