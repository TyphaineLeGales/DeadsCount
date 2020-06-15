
//basic THREEJS Setup
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000000 );
scene.add(camera);
var renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setClearColor( 0x000000, 1.0 );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//Camera
controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.campingFactor = 0.25;
controls.enableZoom = true;
// controls.enableKeys = false;
// controls.enablePan = false;
// controls.enableRotate = false;
camera.position.z = -10;


var texCube = new THREE.TextureLoader().load( 'Assets/matCap4.jpg' );
var mat = new THREE.MeshMatcapMaterial({matcap:texCube});
var geo = new THREE.BoxGeometry(1, 1, 1);

var clock = new THREE.Clock(); //units a second
var dt = 0;
var _t = 0;
var _placeholderString = "406913";
var _cubeGroup = new THREE.Group();
var _cubeArray = [];

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
  dt += clock.getDelta();
  _t = dt%1;

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

  for(var i =0; i < length; i++) {

    var currNum = parseInt(_placeholderString[i]);
    for(var j = 0; j < currNum; j++) {

      var mesh = new THREE.Mesh(geo, mat);
      // mesh.scale.set(i, i, i);
      mesh.position.set(i*spacing, j*spacing, 0);
      scene.add(mesh);
      _cubeArray.push(mesh);

    }
  }
}
