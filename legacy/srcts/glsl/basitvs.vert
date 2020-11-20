attribute vec3 kareKoordinati;
uniform mat4 uModelDonustur;
void main() { gl_Position = uModelDonustur * vec4(kareKoordinati, 1.0); }
