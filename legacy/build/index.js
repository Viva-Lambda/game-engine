"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Oyunum_js_1 = require("./oyun/Oyunum.js");
var dugme = document.getElementById("oyunu-baslat");
function baslat() { new Oyunum_js_1.Oyunum("GLCanvas"); }
if (dugme !== null) {
    dugme.addEventListener("click", baslat, true);
}
else {
    console.log("null dugme");
}
//# sourceMappingURL=index.js.map