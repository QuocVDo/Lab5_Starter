// expose.js

window.addEventListener('DOMContentLoaded', init);
var jsConfetti = new JSConfetti();

function init() {

  const button = document.querySelector('button');
  button.addEventListener('click',playSound);

  const hornPicture = document.querySelector('#horn-select');
  hornPicture.addEventListener('change', changeHorn);
  
  var volumeSlider = document.querySelector('#volume');
  volumeSlider.addEventListener('input', updateSlider);


}

//play sound
function playSound() {
  let hornSound = document.querySelector(".hidden");
  hornSound.volume = document.querySelector('#volume').value / 100;
  hornSound.play();

  if (document.querySelector('#horn-select').value =='party-horn' && document.querySelector('#volume').value!= 0) {
    jsConfetti.addConfetti();
  }
}

//select the horn
function changeHorn() {
  
  switch (this.value) { 
    case 'air-horn':
      document.querySelector("img").src="assets/images/air-horn.svg";
      document.querySelector(".hidden").src="assets/audio/air-horn.mp3";
      break;
    
    case 'car-horn':
      document.querySelector("img").src="assets/images/car-horn.svg";
      document.querySelector(".hidden").src="assets/audio/car-horn.mp3";
      break;

    case 'party-horn':
      document.querySelector("img").src="assets/images/party-horn.svg";
      document.querySelector(".hidden").src="assets/audio/party-horn.mp3";
      break;
  }
}

function updateSlider() {
  if (this.value == 0) {
    document.querySelector('#volume-controls > img').src="assets/icons/volume-level-0.svg";
  }

  else if(this.value >= 1 && this.value < 33) {
    document.querySelector('#volume-controls > img').src="assets/icons/volume-level-1.svg";
  }

  else if(this.value >= 33 && this.value < 67) {
    document.querySelector('#volume-controls > img').src="assets/icons/volume-level-2.svg";
  }

  else if(this.value >= 67) {
    document.querySelector('#volume-controls > img').src="assets/icons/volume-level-3.svg";
  }
  
}