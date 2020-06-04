//basic THREEJS Setup
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
scene.add(camera);
var renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setClearColor( 0xffffff, 0.0 );
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
camera.position.z = 15;

var _testMesh;
var _normalMat = new THREE.MeshNormalMaterial();
 _normalMat.visible = false;
var texCube = new THREE.TextureLoader().load( 'Assets/matCap4.jpg' );
var matCapCube = new THREE.MeshMatcapMaterial({matcap:texCube});
matCapCube.visible = false;
var _redMat = new THREE.MeshBasicMaterial({color:0xff0000});
var _testGeo = new THREE.CubeGeometry( 5, 5, 5);
var _spacingX = 20;
var _spacingY = 10;
var isActive = false;
var countDiv = document.querySelector('h1');
var countString = "39811";
var numbIsDisp = false;
 var _cubesArray = [];

//UI
var datGUI = new dat.GUI();
var guiControls = new function () {
  this.cameraPosX = camera.position.x;
  this.cameraPosY = camera.position.y;
  this.cameraPosZ = camera.position.z;
  this.spacingX = 20;
}

var cameraPosition = datGUI.addFolder('CameraPos');

cameraPosition.add(guiControls, 'cameraPosX', -50, 100 ).onChange(function(value) {
  camera.position.x = value;
});
cameraPosition.add(guiControls, 'cameraPosY', -50, 100 ).onChange(function(value) {
  camera.position.y = value;
});
cameraPosition.add(guiControls, 'cameraPosZ', -50, 100 ).onChange(function(value) {
  camera.position.z = value;
});

datGUI.add(guiControls, 'spacingX', 0, 50).onChange(function(value) {
  _spacingX = value;
})



window.addEventListener("DOMContentLoaded", (event) => {
  init();
});

// instanceObjAlongSpline();
function init() {

  _testMesh = new THREE.Mesh(_testGeo, _normalMat);
  // scene.add(_testMesh);
  generateCubes();
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

function cubeDisp() {
  if(isActive === false) {
    countDiv.style.color= "red";
    matCapCube.visible = true;
    isActive = true;
  } else {
    isActive = false;
    countDiv.style.color= "white";
    matCapCube.visible =false;

  }

}


function dispNumber () {
   countDiv.innerHTML="39811";
   numbIsDisp = true;
   // matCapCube.visible = true;
}

function dispCountry () {
   countDiv.innerHTML="United Kingdom";
   numbIsDisp = false;
   // matCapCube.visible = false;
}
function generateCubes() {
  var numberOfDigits = countString.length;

  for(var i = 0; i<numberOfDigits; i++) {
    var number = parseInt(countString[i]);
    var _rowCubes = [];
    for(var j = 0; j < number; j++) {
      var cubeGeo = new THREE.CubeGeometry(12-i, 12-i, 12-i);
      var cube = new THREE.Mesh(cubeGeo, matCapCube);
      cube.position.z = j*(i+ _spacingY) ;
      cube.position.x = i*_spacingX;
      scene.add(cube);
      _rowCubes[j] = cube;

    }
    _cubesArray[i] = _rowCubes;
  }

  console.log(_cubesArray);
}
