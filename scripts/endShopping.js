// dynamische steuerung des Einkaufskorbes
const btn = document.getElementById('magic-button');
const img = document.getElementById('button-img');

const gifImage = "./assets/icons/grocery.gif";
const gifDuration = 2200;

btn.addEventListener('click', () => {
  // 1. Bild zu GIF ändern
  const staticAdd = img.src;
  img.src = gifImage;
  setTimeout(() => {
    img.src = staticAdd;
  }, gifDuration);
});