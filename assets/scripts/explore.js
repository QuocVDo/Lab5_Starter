// explore.js

window.addEventListener('DOMContentLoaded', init);
var button = document.querySelector('button');
var message = document.querySelector('#text-to-speak');
var selectVoice = document.querySelector('#voice-select');
var speech = window.speechSynthesis;
var face = document.querySelector('img');
var voices = [];

function init() {
  button.addEventListener('click', readText);
  
  //populate voices
  populateVoices();
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoices;
  }
}

function readText() {
  //turn the message within the textbox to an utterance
  var txtToSpeak = new SpeechSynthesisUtterance(message.value);

  //Get what voice was selected
  var selectedVoice = selectVoice.options[selectVoice.selectedIndex].getAttribute('data-name');

  //if no voice was selected do nothing
  if(selectedVoice == null) {
    return;
  }
 
  //set the voice to what was selected
  for (let i = 0; i < voices.length; i++) {
    if(voices[i].name === selectedVoice) {
      txtToSpeak.voice = voices[i];
    }
  }

  
  //speak using the selected voice
  window.speechSynthesis.speak(txtToSpeak);
  
  //while speaking make the smiley face open, do it after a delay
  //to make the timing line up with the voice.
  setTimeout(changePicture, 500);

  //change the picture back when utterance is over
  txtToSpeak.addEventListener('end',function(event){
    face.src="assets/images/smiling.png";
  });


}

//changes picture to smiley face
function changePicture() {
  face.src="assets/images/smiling-open.png";
}

function populateVoices() {
  voices = window.speechSynthesis.getVoices();

  //alert(voices.length);
  for (let i = 0; i < voices.length; i++) {
    var currVoice = document.createElement('option');
    currVoice.textContent = voices[i].name + ' [' + voices[i].lang + ']';

    //alert(currVoice.textContent);

    currVoice.setAttribute('data-lang', voices[i].lang);
    currVoice.setAttribute('data-name', voices[i].name);
    selectVoice.appendChild(currVoice);
  }
}

