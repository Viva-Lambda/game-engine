attribute vec3 kareKoordinati;
attribute vec2 dokuKoordinati;

varying vec2 dokuKoord;

uniform mat4 uModelDonustur;
uniform mat4 uBakmaProj;

void main() {
  gl_Position = uBakmaProj * uModelDonustur * vec4(kareKoordinati, 1.0);

  // doku koordinati fragment shader'a aktarilir
  dokuKoord = dokuKoordinati;
}
