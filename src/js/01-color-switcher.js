const startButtonEl = document.querySelector('button[data-start]');
const stopButtonEl = document.querySelector('button[data-stop]');
const colorBodyEl = document.querySelector('body');
let timerId = null;


startButtonEl.addEventListener("click", onButtonStartChangeColor);
stopButtonEl.addEventListener("click", onButtonStopChangeColor);


function onButtonStartChangeColor() {

    timerId = setInterval(setColorBody, 1000); 
    
    startButtonEl.setAttribute('disabled', 'true');
    
    }

function onButtonStopChangeColor() {

        clearInterval(timerId);
 
    startButtonEl.removeAttribute('disabled');
    
}


function setColorBody() {
    colorBodyEl.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}