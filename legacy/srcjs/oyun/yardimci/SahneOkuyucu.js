// sahne okuyucu obje

function SahneOkuyucu(sahneYolu) {
    //
    this.sahneXml = gMotor.KaynakPlani.kaynakAl(sahneYolu);
}

SahneOkuyucu.prototype._elemanAl = function(elem) {
    //
    var el = this.sahneXml.getElementsByTagName(elem);
    if (el.length === 0) {
        //
        alert("bolum unsuru: " + el + " bulunamadi");
    }
    return el;
};

SahneOkuyucu.prototype.kameraOku = function() {
    let kamElm = this._elemanAl("Kamera");
    let mx = Number(camElm[0].getAttribute("MerkezX"));
    let my = Number(camElm[0].getAttribute("MerkezY"));
    let en = Number(camElm[0].getAttribute("En"));
    let galani = camElm[0].getAttribute("GorusAlani").split(" ");
    let arkaplan = camElm[0].getAttribute("ArkaPlanRengi").split(" ");
    for (var j = 0; j < 4; j++) {
        arkaplan[j] = Number(arkaplan[j]);
        galani[j] = Number(galani[j]);
    }
    var kamera = new Kamera(
        vec2.fromValues(mx, my),
        en,
        galani
    );
    kamera.arkaPlanRengiKoy(arkaplan);
    return kamera;
};

SahneOkuyucu.prototype.kareOkuyucu = function(kareListesi) {
    var elm = this._elemanAl("Kare");
    for (var i = 0; i < elm.length; i++) {
        let kx, ky, en, boy, aci, renk, kare;
        kx = Number(elm.item(i).attributes.getNamedItem("KonumX").value);
        ky = Number(elm.item(i).attributes.getNamedItem("KonumY").value);
        en = Number(elm.item(i).attributes.getNamedItem("En").value);
        boy = Number(elm.item(i).attributes.getNamedItem("Boy").value);
        aci = Number(elm.item(i).attributes.getNamedItem("AciDerece").value);
        renk = elm.item(i).attributes.getNamedItem("Renk").value.split(" ");
        kare = new Cizilebilir(gMotor.VarsayilanKaynaklar.tekRenkCizerAl());
        // make sure color array contains numbers
        for (var j = 0; j < 3; j++)
            renk[j] = Number(renk[j]);
        kare.renkKoy(renk);
        kare.donusturAl().konumKoy(x, y);
        kare.donusturAl().dereceKoy(aci);
        kare.donusturAl().boyutKoy(en, boy);
        kareListesi.push(kare);
    }
};
