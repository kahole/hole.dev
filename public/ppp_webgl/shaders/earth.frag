uniform vec3 grassBaseColor; 
uniform float time;
varying vec3 vPosition; 
varying vec2 vUv;

#if NUM_DIR_LIGHTS > 0
struct DirectionalLight {
  vec3 direction;
  vec3 color;
  int shadow;
  float shadowBias;
  float shadowRadius;
  vec2 shadowMapSize;
};
uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
#endif
varying vec3 vNormal; 

// perlin water functions

float random(float x) {
  return fract(sin(x) * 10000.);
}

float noise(vec2 p) {
  return random(p.x + p.y * 10000.);
}

vec2 sw(vec2 p) { return vec2(floor(p.x), floor(p.y)); }
vec2 se(vec2 p) { return vec2(ceil(p.x), floor(p.y)); }
vec2 nw(vec2 p) { return vec2(floor(p.x), ceil(p.y)); }
vec2 ne(vec2 p) { return vec2(ceil(p.x), ceil(p.y)); }

float smoothNoise(vec2 p) {

  vec2 interp = smoothstep(0., 1., fract(p));
  float s = mix(noise(sw(p)), noise(se(p)), interp.x);
  float n = mix(noise(nw(p)), noise(ne(p)), interp.x);
  return mix(s, n, interp.y);
}

float fractalNoise(vec2 p) {

  float x = 0.;
  x += smoothNoise(p      );
  x += smoothNoise(p * 2. ) / 2.;
  x += smoothNoise(p * 4. ) / 4.;
  x += smoothNoise(p * 8. ) / 8.;
  x += smoothNoise(p * 16.) / 16.;
  x /= 1. + 1./2. + 1./4. + 1./8. + 1./16.;
  return x;
}

float movingNoise(vec2 p) {
  float x = fractalNoise(p + time);
  float y = fractalNoise(p + time);
  return fractalNoise(p + vec2(x, y));   
}

// call this for water noise function
float nestedNoise(vec2 p) {
  float x = movingNoise(p);
  float y = movingNoise(p + 100.);
  return movingNoise(p + vec2(x, y));
}

void main() {

  vec3 color;

  // Light
  highp vec3 ambientLight = vec3(0.7, 0.7, 0.7);
  highp float directional = max(dot(vNormal.xyz, normalize(directionalLights[0].direction)), 0.0);
  vec3 vLighting = ambientLight + (directionalLights[0].color * directional);

  if (vPosition.y > 45.0) {
    color = vec3(0.9, 0.9, 0.9);
  }
  // snow to grass transiation
  else if (vPosition.y > 43.0) {
    color = mix(grassBaseColor, vec3(0.9, 0.9, 0.9), (vPosition.y-43.0)/2.0);
  }
  // River
  else if (vPosition.y > 14.0+5.0*sin(vPosition.x*vPosition.z/1000.0)
           && vPosition.y < 28.0+5.0*sin(vPosition.x*vPosition.z/1000.0+5.0)) {
    //gl_FragColor = vec4(vec3(0.0, 0.498, mod(time, 20.0)/20.0) * vLighting, 1.0);
    // gl_FragColor = vec4(vec3(0.0, 0.498, 0.75 + (mod(mod(time, 20.0)/20.0 + vUv.x, 1.0) / 4.0)) * vLighting, 1.0);
    vec2 run = vec2(0.0, sin(vUv.y));
    float n = nestedNoise(run * 10.);
    /* color = mix(vec3(.4, .6, 1.), vec3(.1, .2, 1.), n); */
    color = mix(vec3(.4, .6, 1.), vec3(.0, .0, 7.), n);
  }
  else if (vPosition.y < -28.0) {
    color = vec3(0.92, 0.78, 0.68);
  }
  // grass to desert transiation
  else if (vPosition.y < -22.0) {
    color = mix(vec3(0.92, 0.78, 0.68), grassBaseColor, (vPosition.y+28.0)/6.0);
  }
  else {
    color = grassBaseColor;
  }

  gl_FragColor = vec4(color * vLighting, 1.0);
}