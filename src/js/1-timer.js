import flatpickr from "flatpickr";
import izitoast from "izitoast";
import "flatpickr/dist/flatpickr.min.css";
import "izitoast/dist/css/iziToast.min.css";

const dateInput = document.querySelector("input");
const startBtn = document.querySelector("button");
startBtn.disabled = true;
startBtn.addEventListener("click", onButtonClick);
var daysValue = document.querySelector('.value[data-days]');
var hoursValue = document.querySelector('.value[data-hours]');
var minutesValue = document.querySelector('.value[data-minutes]');
var secondsValue = document.querySelector('.value[data-seconds]');

let selectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      if (selectedDates[0] > Date.now()) {
          startBtn.disabled = false;
          selectedDate = selectedDates[0];
        } else {
            startBtn.disabled = true;
            izitoast.error({
                message: "Please choose a date in the future"
            });
        }
    },
};

flatpickr("#datetime-picker", options);

function onButtonClick(e) {
    dateInput.disabled = true;
    startBtn.disabled = true;

    const intervalId = setInterval(() => {
        let timeLeft = convertMs(selectedDate - Date.now());
        if ((timeLeft.days + timeLeft.hours + timeLeft.minutes + timeLeft.seconds) === 0) {
            clearInterval(intervalId);
            dateInput.disabled = false;
        }
        updateClockFace(timeLeft);
    }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
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

  return { days, hours, minutes, seconds };
}

function updateClockFace({ days, hours, minutes, seconds }) {
    secondsValue.innerHTML = String(seconds).padStart(2, "0");
    minutesValue.innerHTML = String(minutes).padStart(2, "0");
    hoursValue.innerHTML = String(hours).padStart(2, "0");
    daysValue.innerHTML = String(days).padStart(2, "0");
}

// console.log(updateClockFace(convertMs(2000))); // {days: 0, hours: 0, minutes: 0, seconds: 2}