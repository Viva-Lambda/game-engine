"use strict";
// objeleri dondur, buyult kuçult yer degistir vs

function Donustur() {
    this.konum = vec2.fromValues(0, 0);
    this.boyut = vec2.fromValues(1, 1);
    this.radyan = 0.0;
}

Donustur.prototype.konumKoy = function(x, y) {
    this.konum = vec2.fromValues(x, y);
};
Donustur.prototype.konumXKoy = function(x) {
    this.konum[0] = x;
}
Donustur.prototype.konumXArti = function(x) {
    var xkonum = this.konumXAl();
    xkonum += x;
    this.konumXKoy(xkonum);
}
Donustur.prototype.konumYArti = function(x) {
    var ykonum = this.konumYAl();
    ykonum += x;
    this.konumYKoy(ykonum);
}
Donustur.prototype.konumYKoy = function(y) {
    this.konum[1] = y;
}
Donustur.prototype.konumXAl = function() {
    return this.konum[0];
}
Donustur.prototype.konumYAl = function() {
    return this.konum[1];
}

Donustur.prototype.boyutKoy = function(x, y) {
    this.boyut = vec2.fromValues(x, y);
};
Donustur.prototype.boyutXKoy = function(x) {
    this.boyut[0] = x;
};
Donustur.prototype.boyutYKoy = function(y) {
    this.boyut[1] = y;
};
Donustur.prototype.boyutXAl = function(x) {
    return this.boyut[0];
};
Donustur.prototype.boyutYAl = function(y) {
    return this.boyut[1];
};
Donustur.prototype.boyutArti = function(x) {
    var xb = this.boyutXAl();
    var yb = this.boyutYAl();
    xb += x;
    yb += x;
    this.boyutKoy(xb, yb);
}
Donustur.prototype.boyutXArti = function(x) {
    var xb = this.boyutXAl();
    xb += x;
    this.boyutXKoy(xb);
}
Donustur.prototype.boyutYArti = function(x) {
    var xb = this.boyutYAl();
    xb += x;
    this.boyutYKoy(xb);
}


Donustur.prototype.radyanKoy = function(r) {
    this.radyan = r;
    while (this.radyan > (2 * Math.PI)) {
        this.radyan -= (2 * Math.PI);
    }
};
Donustur.prototype.dereceKoy = function(d) {
    this.radyanKoy(d * Math.PI / 180.0);
};
Donustur.prototype.dereceAl = function() {
    return this.radyan * 180.0 / Math.PI;
}
Donustur.prototype.dereceArti = function(d) {
    var derece = this.dereceAl();
    derece += d;
    this.dereceKoy(derece);
}
Donustur.prototype.modelMatAl = function() {
    var modelMat = mat4.create();
    mat4.translate(modelMat, modelMat, vec3.fromValues(this.konumXAl(),
        this.konumYAl(),
        0.0));
    mat4.rotateZ(modelMat, modelMat, this.radyan);
    mat4.scale(modelMat, modelMat, vec3.fromValues(this.boyutXAl(),
        this.boyutYAl(),
        1.0));
    return modelMat;
};
