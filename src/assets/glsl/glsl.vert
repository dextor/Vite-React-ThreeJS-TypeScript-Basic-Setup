// built in uniforms
// uniform mat4 modelMatrix;     // = object.matrixWorld
// uniform mat4 modelViewMatrix; // = camera.matrixWorldInverse * object.matrixWorld
// uniform mat4 projectionMatrix;// = camera.projectionMatrix
// uniform mat4 viewMatrix;      // = camera.matrixWorldInverse
// uniform mat3 normalMatrix;    // = inverse transpose of modelViewMatrix
// uniform vec3 cameraPosition;  // = camera position in world space
// custom uniforms
uniform float u_time;
uniform vec2 u_resolution;

// default vertex attributes provided by Geometry and BufferGeometry
// attribute vec3 position;
// attribute vec3 normal;
// attribute vec2 uv;

// varying vec3 pos;
// varying vec2 vUv;

// varying highp vec2 vTextureCoord;

varying vec3 vUv; 

void main() {
  vUv = position; 
  vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * modelViewPosition; 
}