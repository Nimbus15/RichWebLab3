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
    containerElement.innerText = "0:0:0";

    const countdownContainerElement = document.getElementById("countdown-container");

    containerElement.appendChild(inputElement);
    containerElement.appendChild(buttonElement);
    countdownContainerElement.appendChild(containerElement);

    fromEvent(buttonElement, "click").pipe(tap(()=> {
        //console.log("button clicked");
        const totalSeconds = inputElement.value;
        console.log(totalSeconds);
    })).subscribe();
}

//Turn totalSeconds into "hours, minutes, seconds" object
function getCountDownValues(totalSeconds){
  
}

