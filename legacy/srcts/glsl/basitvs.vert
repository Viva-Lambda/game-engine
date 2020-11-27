attribute vec3 kareKoordinati;
uniform mat4 uModelDonustur;
uniform mat4 uBakmaProj;
void main() {
  gl_Position = uBakmaProj * uModelDonustur * vec4(kareKoordinati, 1.0);
}
