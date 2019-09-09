varying vec3 vNormal; 
varying vec3 vPosition; 
varying vec2 vUv;

void main() {
  vPosition = position;
  vUv = uv;
  
  //vNormal = vec3(0.0, 1.0, 0.0);
  vNormal = normalize(normalMatrix * normal);
  
  float height = position.z + sin(position.x/9.0)*2.0;
  
  vec4 modelViewPosition = modelViewMatrix * vec4(vec3(position.x, position.y, height), 1.0);
  gl_Position = projectionMatrix * modelViewPosition;
}