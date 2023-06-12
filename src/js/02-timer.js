import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

const onInputDateEl = document.querySelector('#datetime-picker');
const buttonStartEl = document.querySelector('button[data-start]');

document.body.style.backgroundColor = '#fff2cc';

const timerValue = {
  days: document.querySelector("[data-days]"),
  hours: document.querySelector("[data-hours]"),
  minutes: document.querySelector("[data-minutes]"),
  seconds: document.querySelector("[data-seconds]")
}

let timerId = null;
const currentDate = Date.now();

// встановлюємо атрибут 'DISABLED' на кнопку START

buttonStartEl.setAttribute('disabled', 'true');


// навішуємо слухач на кнопку START і запускаємо таймер

buttonStartEl.addEventListener('click', onStartTimer);

const options = {

  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
   
    console.log(selectedDates[0]);

  //перевірка дати, щоб не була менше поточної   
    
    if (selectedDates[0] < currentDate) {

        buttonStartEl.setAttribute('disabled', true);

        window.alert("Please choose a date in the future");
          
    }
    
    else {
// прибираємо атрибут 'DISABLED' з кнопки START, якщо вибрана дата більша за  поточну
      
      buttonStartEl.removeAttribute('disabled');
      onInputDateEl.setAttribute('disable', true);
 

        
    }
    
         },
    
};
// ініціалізація бібліотеки

flatpickr(onInputDateEl, options);

//  запускаємо таймер
function onStartTimer() {

  onInputDateEl.setAttribute('disabled', true);
  buttonStartEl.setAttribute('disabled', true);
  //onInputDateEl.disabled = true;
  
timerId = setInterval(() => {
    let countdown = new Date(onInputDateEl.value) - new Date();
    
  //  console.log(countdown)
  if (countdown <= 0) {
      window.alert('I finished!!!!');
      clearInterval(timerId);
    }
    else {
      let timerData = convertMs(countdown);
        timerValue.days.textContent = addLeadingZero(timerData.days);
        timerValue.hours.textContent = addLeadingZero(timerData.hours);
        timerValue.minutes.textContent = addLeadingZero(timerData.minutes);
        timerValue.seconds.textContent = addLeadingZero(timerData.seconds);
      
  }
  
}, 1000);
  
      
}

function addLeadingZero(value) {
 return String(value).padStart(2, '0');
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
    




