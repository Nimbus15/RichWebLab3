//const rxjs = require('rxjs');
const {
  of,
  fromEvent,
  tap,
} = rxjs;

function createNote(locationNode, text = '') {  
    var colourPosition = 0
    const note = document.createElement('div') 
   
    //console.log(note)  
    note.classList.add('note')  
    note.innerHTML = 
    `  
    <div>  
      <button class="update">update</button>  
      <button class="delete">delete</button>  
      <button class="colour">colour</button> 
      <button class="child">child</button>
    </div>  
    <div class="main ${text ? "" : "invisible"}"></div>  
    <textarea class="main ${text ? "invisible" : ""}"></textarea>  
    `  
    const updateBtn = note.querySelector('.update')  
    const deleteBtn = note.querySelector('.delete')  
    const colourBtn = note.querySelector('.colour')  
    const childBtn = note.querySelector('.child')  
  
    const main = note.querySelector('.main')  
    const textArea = note.querySelector('textarea')  
  
  
    main.innerHTML = text
    textArea.value = text  
  

    rxjs.fromEvent(deleteBtn, 'click').pipe(rxjs.tap(() => {
      note.remove() 
      updateList()
    })).subscribe()


    rxjs.fromEvent(updateBtn, 'click').pipe(rxjs.tap(() => {
      main.classList.toggle("invisible")  
      textArea.classList.toggle("invisible")  
    })).subscribe()


    rxjs.fromEvent(colourBtn, 'click').pipe(rxjs.tap(() => {
      colourPosition = changeColour(note, colourPosition)
    })).subscribe()

    rxjs.fromEvent(childBtn, 'click').pipe(rxjs.tap(() => {
      createNote(note)
    })).subscribe()

    rxjs.fromEvent(textArea, 'input').pipe(rxjs.tap((event) => {
      var { value } = event.target  
      main.innerHTML = value
      updateList() 
    })).subscribe()
  
    
    locationNode.appendChild(note)  
  }  
  
  
  function readNote(){
    const addBtn = document.getElementById('create')  
    rxjs.fromEvent(addBtn, 'click').pipe(rxjs.tap(() => {
      createNote(document.body)
    })).subscribe()
  }
  
   //Find the elements called colour  
    //Use the colours array to cycle through the colours
    //Use the colourPosition variable to keep track of the current colour
   function changeColour(note, colourPosition){
    var colours = ["#0048BA", "#FF0A00", "#FF4000","#FFC900", "#A8FF1C", "#A8FFEF"]
    colourPosition = colourPosition < colours.length ? ++colourPosition : 0;
    note.querySelector(".main").style.background = colours[colourPosition]
    return colourPosition
   }
  
   
   function updateList() {  
    var text = document.querySelectorAll('textarea')  
    var notes = []  
    text.forEach(note => notes.push(note.value))  
  }  
  
   readNote()
   
  