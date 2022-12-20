// built in uniforms
// uniform mat4 viewMatrix;
// uniform vec3 cameraPosition;

// custom uniforms
uniform float u_time;
uniform vec2 u_resolution;  // size of canvas
// uniform sampler2D u_textureSampler;

varying vec3 vUv;
vec2 st;

void main() {
  st = gl_FragCoord.xy / u_resolution.xy;
  st.x *= u_resolution.x/u_resolution.y;
  st.y *= u_resolution.y/u_resolution.x;
  // Remap the space to -1. to 1.
  st = st *2.-1.;
  gl_FragColor = vec4(vUv.x, vUv.y, vUv.z, 1.);
}