const {
  of,
  fromEvent,
  tap,
  timer
} = rxjs;

createAnElement();
function createAnElement(){
    const inputElement = document.createElement("input");
    inputElement.type = "number";
    inputElement.value = 0;

    const buttonElement = document.createElement("button");
    buttonElement.innerText = "Start Countdown";

    const containerElement = document.createElement("div");
    containerElement.innerText = getCountDownText({
      hours: 0,
      minutes: 0,
      seconds: 0,
    });

    const countdownContainerElement = document.getElementById("countdown-container");

    containerElement.appendChild(inputElement);
    containerElement.appendChild(buttonElement);
    countdownContainerElement.appendChild(containerElement);

    fromEvent(buttonElement, "click").pipe(tap(() => {
      console.log("button clicked");
      const totalSeconds = inputElement.value;
      const hoursMinutesSecondsObject= getCountDownValues(totalSeconds);
      let countdown = totalSeconds;
      setInterval(()=> {  
          // EVERY SECONDS REDUCE THE VALUE
          // DISPLAY THE VALUE
        
          getCountDownValues(countdown);
          console.log(getCountDownText(getCountDownValues(countdown)));
          containerElement.innerText = getCountDownText(getCountDownValues(countdown));
          countdown--;
         
      }, 1000)
  })).subscribe();
}

// Format an countdown object to a countdown string
function getCountDownText(countdown){
  const hours = `${countdown.hours < 10 ? "0" : ""}${countdown.hours}`;
  const minutes = `${countdown.minutes < 10 ? "0" : ""}${
    countdown.minutes
  }`;
  const seconds = `${countdown.seconds < 10 ? "0" : ""}${
    countdown.seconds
  }`;

  return `${hours}:${minutes}:${seconds}`;
}       

//Turn totalSeconds into "hours, minutes, seconds" object
function getCountDownValues(totalSeconds){
    const result = { hours: 0, minutes: 0, seconds: 0 };

    if (totalSeconds >= 1) {
    let secondsForCalculation = totalSeconds;

    result.hours = secondsForCalculation / 3600;
    result.hours = result.hours >= 1 ? parseInt(result.hours) : 0;
    secondsForCalculation = secondsForCalculation - result.hours * 3600;

    //MINUTES

    result.minutes = secondsForCalculation / 60;
    result.minutes = result.minutes >= 1 ? parseInt(result.minutes) : 0;
    secondsForCalculation = secondsForCalculation - result.minutes * 60;

    //SECONDS

    result.seconds = secondsForCalculation;
  }
  return result
}
