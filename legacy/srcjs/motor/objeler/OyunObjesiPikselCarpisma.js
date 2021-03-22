"use strict";

OyunObjesi.prototype.piksellerDegdiMi = function(oteki, carpmaYeri) {
    //
    let carptiMi = false;
    let cizilebilir = this.cizilebilirAl();
    let otekiCizilebilir = oteki.cizilebilirAl();
    let k1 = typeof cizilebilir.piksellerDegdiMi === "function";
    let k2 = typeof otekiCizilebilir.piksellerDegdiMi === "function";
    if (k1 && k2) {
        let oKutu2d = oteki.kutu2dAl();
        if (oKutu2d.carpmaDurumuAl(this.kutu2dAl())) {
            cizilebilir.pikselleriKoy();
            otekiCizilebilir.pikselleriKoy();
            carptiMi = cizilebilir.piksellerDegdiMi(otekiCizilebilir,
                carpmaYeri);
        }
    }
    return carptiMi;
};
