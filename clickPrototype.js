
//basic THREEJS Setup
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000000 );
scene.add(camera);
var renderer = new THREE.WebGLRenderer();

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//Camera
controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.campingFactor = 0.25;
// controls.enableZoom = true;
// controls.enableKeys = false;
// controls.enablePan = false;
// controls.enableRotate = false;
camera.position.z = 10;
camera.position.y = 2.5;

var texCube = new THREE.TextureLoader().load( 'Assets/matCap4.jpg' );
var mat = new THREE.MeshMatcapMaterial({matcap:texCube});
var geo = new THREE.BoxGeometry(1, 1, 1);

var clock = new THREE.Clock(); //units a second
var dt = 0;
var _t = 0;
var _placeholderString = "406913";
var _cubeGroup = new THREE.Group();
var _cubesArray = [];
var currIndex = 0;

//Background
var backgroundTexSky = new THREE.TextureLoader().load( 'Assets/skyTest2.jpg' );
var backgroundTexBlack = new THREE.TextureLoader().load( 'Assets/gradientB&W.jpg' );
scene.background = backgroundTexBlack;

window.addEventListener("DOMContentLoaded", (event) => {
  init();
});

function init() {

  generateCubes();
  render();
}

function render() {
  // dt += clock.getDelta();
  // _t = dt%1;

  requestAnimationFrame( render );
  renderer.render(scene, camera);

}

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function generateCubes () {
  var length = _placeholderString.length;
  var spacing = 2;
  var scaleY = 1;

  for(var i =0; i < length; i++) {

    var currNum = parseInt(_placeholderString[i]);
    for(var j = 0; j < currNum; j++) {
      var mesh = new THREE.Mesh(geo, mat);
      scaleY = length-i;
      mesh.scale.y += scaleY;
      mesh.position.set(-_cubesArray.length*spacing, scaleY/2, 0);
      mesh.visible = false;
      scene.add(mesh);
      _cubesArray.push(mesh);

    }
  }
}



function next () {
  if(currIndex < _cubesArray.length) {
    _cubesArray[currIndex].visible = false;
    currIndex += 1;
    _cubesArray[currIndex].visible = true;
  }
  console.log(currIndex);

}

function prev () {
  if(currIndex > 0) {
     _cubesArray[currIndex].visible = false;
    currIndex -= 1;
    _cubesArray[currIndex].visible = true;
  }
  console.log(currIndex);
}
