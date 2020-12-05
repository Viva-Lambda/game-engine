import { Oyunum } from "./oyun/Oyunum.js";
var dugme = document.getElementById("oyunu-baslat");

function baslat() {
  new Oyunum("GLCanvas");
}

if (dugme !== null) {
  dugme.addEventListener("click", baslat, true);
} else {
  console.log("null dugme");
}
