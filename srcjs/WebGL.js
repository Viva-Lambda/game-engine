"use strict";

var gGL = null;

function glBaslat() {
    var gl_canvas = document.getElementById("GLCanvas");
    gGL = gl_canvas.getContext("webgl") ||
        gl_canvas.getContext("webgl2");
    if (gGL !== null) {
        // gl var onu çalistiralim
        gGL.clearColor(0.4, 0.4, 0.3, 1.0);
        //
        kareBufferBaslat();
        ciziciBaslat("NoktaCizici", "RenkVerici");
    } else {
    }
}

function kareCiz() {
    // ekrani temizle
    gGL.clear(gGL.COLOR_BUFFER_BIT);
    //
    gGL.useProgram(gBasitCizer);

    //
    gGL.enableVertexAttribArray(gCizerKordinatKonumu);

    // cizme talimati
    gGL.drawArrays(gGL.TRIANGLE_STRIP, 0, 4);
}

function glCiz() {
    glBaslat();
    kareCiz();
}
