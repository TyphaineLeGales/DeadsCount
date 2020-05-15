void main() {
  vec4 p = vec4( position, 1. );
  //modelViewMatrix  =  position of mesh within our scene
  // projectionMatrix = camera's relationship to the model within the scene
  //gl_Position gives the ultimate rendered posiiton of the vertex inside our scene

  vec4 modelViewPosition = modelViewMatrix * p;
  gl_Position = projectionMatrix * modelViewPosition;

}

