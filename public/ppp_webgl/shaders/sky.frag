uniform vec3 baseColor; 
varying vec3 vPosition;

void main() {
  float brightness = (vPosition.y + vPosition.x + vPosition.z) * 0.0001;
  gl_FragColor = vec4(vec3(baseColor.x+brightness, baseColor.y+brightness, baseColor.z), 1.0);
}