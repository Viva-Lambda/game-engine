"use strict";

var gBasitCizer = null;

function ciziciYukleDerle(id, ciziciTipi) {
    var ciziciMetni, ciziciKaynagi, derlenenCizici;

    //
    ciziciMetni = document.getElementById(id);
    ciziciKaynagi = ciziciMetni.firstChild.textContent;
    //
    derlenenCizici = gGL.createShader(ciziciTipi);

    //
    gGL.shaderSource(derlenenCizici, ciziciKaynagi);
    gGL.compileShader(derlenenCizici);

    // hata kontrolu
    if (!gGL.getShaderParameter(derlenenCizici, gGL.COMPILE_STATUS)) {
        //
        alert("Cizici derlenemedi: " + gGL.getShaderInfoLog(derlenenCizici));
    }
    return derlenenCizici;
}

function ciziciBaslat() {
    //
    var noktaCizici = ciziciYukleDerle(noktaCiziciId, gGL.VERTEX_SHADER);
    var renklendirici = ciziciYukleDerle(renklendiriciId, gGL.FRAGMENT_SHADER);

    // cizer olustur
    gBasitCizer = gGL.createProgram();
    gGL.attachShader(gBasitCizer, noktaCizici);
    gGL.attachShader(gBasitCizer, renklendirici);
    gGL.linkProgram(gBasitCizer);

    // hata kontrol
    if (!gGL.getProgramParameter(gBasitCizer, gGL.LINK_STATUS)) {
        alert("Cizici linklemede hata olustu");
    }

    // attribute yerini alalim
    gCizerKordinatKonumu = gGL.getAttribLocation(gBasitCizer,
        "kareKoordinati");

    //
    gGL.bindBuffer(gGL.ARRAY_BUFFER, gKareNoktaBuffer);

    gGL.vertexAttribPointer(gCizerKordinatKonumu,
        3, gGL.FLOAT, false,
        0,
        0);
}
