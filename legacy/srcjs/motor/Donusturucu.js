"use strict";
// objeleri dondur, buyult kuçult yer degistir vs

function Donustur() {
    this.konum = vec2.fromValues(0, 0);
    this.boyut = vec2.fromValues(1, 1);
    this.radyan = 0.0;
}

Donustur.prototype.konumKoy = function(x, y) {
    this.konum = vec2.fromValues(x, y);
    console.log(this.konum);
};
Donustur.prototype.konumXKoy = function(x) {
    this.konum[0] = x;
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
    console.log(this.boyut);
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

Donustur.prototype.radyanKoy = function(r) {
    this.radyan = r;
    while (this.radyan > (2 * Math.PI)) {
        this.radyan -= (2 * Math.PI);
    }
};
Donustur.prototype.dereceKoy = function(d) {
    this.radyanKoy(d * Math.PI / 180.0);
};
Donustur.prototype.modelMatAl = function() {
    var modelMat = mat4.create();
    console.log(this.konum);
    mat4.translate(modelMat, modelMat, vec3.fromValues(this.konumXAl(),
        this.konumYAl(),
        0.0));
    console.log(this.radyan);
    mat4.rotateZ(modelMat, modelMat, this.radyan);
    console.log(this.boyut);
    mat4.scale(modelMat, modelMat, vec3.fromValues(this.boyutXAl(),
        this.boyutYAl(),
        1.0));
    console.log("modelmat al matrisi");
    console.log(modelMat);
    return modelMat;
};
