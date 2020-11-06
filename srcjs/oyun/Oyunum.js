"use strict";

function Oyunum(kanvasId) {
    this.cizer = null;
    gMotor.AnaMotor.glBaslat(kanvasId);

    this.cizer = new BasitCizer("NoktaCizici", "RenkVerici");

    //
    gMotor.AnaMotor.kanvasTemizle([0, 0.7, 0.3, 1]);

    this.cizer.ciziciAktif();

    var gl = gMotor.AnaMotor.glAl();
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}
