precision mediump float;

varying vec2 dokuKoord;

uniform sampler2D numuneAlici;

uniform vec4 uPikselRengi;

void main() {
  //
  // uv degeri dokudan alinir
  vec4 dokuRengi = texture2D(numuneAlici, vec2(dokuKoord.s, dokuKoord.t));

  // doku bolgesi
  vec3 dokuBolgesi = vec3(dokuRengi) * (1.0 - uPikselRengi.a) +
                     vec3(uPikselRengi) * uPikselRengi.a;
  gl_FragColor = vec4(dokuBolgesi, dokuRengi.a);
}
