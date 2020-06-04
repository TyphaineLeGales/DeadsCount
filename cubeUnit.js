//basic THREEJS Setup
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
scene.add(camera);
var renderer = new THREE.WebGLRenderer();
renderer.setClearColor( 0xffffff, 1.0 );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//Camera
controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.campingFactor = 0.25;
controls.enableZoom = true;
camera.position.z = 10;

var _testMesh;
var _normalMat = new THREE.MeshNormalMaterial();
var _redMat = new THREE.MeshBasicMaterial({color:0xff0000});
var _testGeo = new THREE.CubeGeometry( 5, 5, 5);
var _spacingX = 8;
var _spacingY = 2;
window.addEventListener("DOMContentLoaded", (event) => {
  init();
});

// instanceObjAlongSpline();
function init() {

  _testMesh = new THREE.Mesh(_testGeo, _normalMat);
  // scene.add(_testMesh);

  render();
}

function render() {
  requestAnimationFrame( render );

  renderer.render(scene, camera);
}

window.addEventListener( 'resize', onWindowResize, false );


function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function changeMaterial() {
  _testMesh.material = _redMat;
  generateCubes();
}

function restoreMaterial() {
  _testMesh.material = _normalMat;
}

function generateCubes() {
  var countString = document.querySelector('h1').innerHTML;
  var numberOfDigits = countString.length;
  // var count = parseInt(countString, 10);
  // console.log(numberOfDigits);

  for(var i = 0; i<numberOfDigits; i++) {
    var number = parseInt(countString[i]);
    console.log(number);
    for(var j = 0; j < number; j++) {
      var cubeGeo = new THREE.CubeGeometry(i, i, i);
      var cube = new THREE.Mesh(cubeGeo, _normalMat);
      cube.position.y = j*(i+ _spacingY) ;
      cube.position.x = i*_spacingX;
      scene.add(cube);

    }
  }
}
