// import { fromPairs, reject } from 'lodash';
import Notiflix from 'notiflix';

const refs = {
  buttontEl: document.querySelector('button'),
  formEl: document.querySelector('.form'),
  amountEl: document.querySelector('input[name = "amount"]'),
  delayEl: document.querySelector('input[name = "delay"]'),
  stepEl: document.querySelector('input[name = "step"]'),
};

refs.formEl.addEventListener('submit', onFormSubmit);
//
function onFormSubmit(event) {
  event.preventDefault();
  let amountValue = Number(refs.amountEl.value);
  let delayValue = Number(refs.delayEl.value);
  let stepValue = Number(refs.stepEl.value);

  for (let amountNumber = 1; amountNumber <= amountValue; amountNumber += 1) {
    createPromise(amountNumber, delayValue)
      .then((position, delay) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch((position, delay) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    delayValue += stepValue;
  }
}

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
}
