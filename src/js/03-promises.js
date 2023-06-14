// імпорт бібліотеки
import Notiflix from 'notiflix';
//             1-й варіант    

const formEl = document.querySelector('.form');

document.body.style.backgroundColor = '#fff2cc';

// слухач на SUBMIT форми
formEl.addEventListener('submit', onSubmitForm);

// ф-ія обробник події
function onSubmitForm(event) {

  event.preventDefault();

  const { delay, step, amount } = event.currentTarget.elements;

// перевірка  значень введених в поля форми
  
  if (delay.value < 0 || step.value < 0 || amount.value < 0) {
    Notiflix.Notify.warning(`❗ Please enter a positive number`);
  }
  else {
    for (let i = 0; i < amount.value; i++) {
      let position = i + 1;
      const delays = Number(delay.value) + step.value * i;
//
      createPromise(position, delays)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${delay}ms`
          );
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(
            `❌ Rejected promise ${position} in ${delay}ms`
          );
       });
   }
  }

  event.currentTarget.reset();
}
// ф-ія створення промісів

function createPromise(position, delay) {

  return new Promise((resolve, reject) => {

    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
     if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
   }, delay);
  });
}



