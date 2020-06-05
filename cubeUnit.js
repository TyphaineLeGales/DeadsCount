//basic THREEJS Setup
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 10000 );
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
camera.position.z = 600;
camera.position.y = 230;
camera.position.x = 839;

var _testMesh;
var _normalMat = new THREE.MeshNormalMaterial();
 _normalMat.visible = false;
var texCube = new THREE.TextureLoader().load( 'Assets/matCap_3.jpg' );
var matCapCube = new THREE.MeshMatcapMaterial({matcap:texCube});
matCapCube.visible = false;
var _redMat = new THREE.MeshBasicMaterial({color:0xff0000});
var _testGeo = new THREE.CubeGeometry( 5, 5, 5);
var _spacingX = 205;
var _spacingY = 324;
var isActive = false;
var countDiv = document.querySelector('h1');
var countString = "39811";
var numberOfDigits = countString.length;
var numbIsDisp = false;
var _cubesArray = [];
var _minSize = 10;
var _cubeGroup = new THREE.Group();
var _speed = 1;

//UI
var datGUI = new dat.GUI();
var guiControls = new function () {
  this.cameraPosX = camera.position.x;
  this.cameraPosY = camera.position.y;
  this.cameraPosZ = camera.position.z;
  this.spacingX = 250;
  this.spacingY = 315;
  this.cameraRotationX = camera.rotation.x;
  this.cameraRotationY = camera.rotation.y;
  this.cameraRotationZ = camera.rotation.z;
  this.speed = 0.1;
}

var cameraPosition = datGUI.addFolder('CameraPos');

cameraPosition.add(guiControls, 'cameraPosX', -200, 1000 ).onChange(function(value) {
  camera.position.x = value;
});
cameraPosition.add(guiControls, 'cameraPosY', -200, 1000 ).onChange(function(value) {
  camera.position.y = value;
});
cameraPosition.add(guiControls, 'cameraPosZ', -1000, 1000 ).onChange(function(value) {
  camera.position.z = value;
});

var cameraRotation = datGUI.addFolder('CameraRotation');

cameraRotation.add(guiControls, 'cameraRotationX', -200, 1000 ).onChange(function(value) {
  camera.position.x = value;
});

cameraRotation.add(guiControls, 'cameraRotationY', -200, 1000 ).onChange(function(value) {
  camera.position.y = value;
});

cameraRotation.add(guiControls, 'cameraRotationZ', -1000, 1000 ).onChange(function(value) {
  camera.position.z = value;
});

datGUI.add(guiControls, 'spacingX', 0, 1000).onChange(function(value) {
  _spacingX = value;
  positionCubes();
})

datGUI.add(guiControls, 'spacingY', 0, 1000).onChange(function(value) {
  _spacingY = value;
  positionCubes();
})

datGUI.add(guiControls, 'speed', 0, 0.1).onChange(function(value) {
  _speed = value;
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
  rotationAnim();
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

function rotationAnim () {
  _cubeGroup.rotation.x += _speed;
  _cubeGroup.rotation.y += _speed;
  _cubeGroup.rotation.z += _speed;
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
var scaleFactor = 10;
  for(var i = 0; i<numberOfDigits; i++) {
    var number = parseInt(countString[i]);
    var _rowCubes = [];
    for(var j = 0; j < number; j++) {
      var scale = _minSize + (numberOfDigits*50) - (i*50);
      // console.log(scaleFactor);
      var cubeGeo = new THREE.CubeGeometry(scale, scale, scale);
      var cube = new THREE.Mesh(cubeGeo, matCapCube);
      cube.position.z = -(j*(i+ _spacingY)) ;
      cube.position.x = i*_spacingX;
      _cubeGroup.add(cube);
      _rowCubes[j] = cube;

    }
    _cubesArray[i] = _rowCubes;
    scaleFactor *= 10;
  }
  scene.add(_cubeGroup);
}

function positionCubes () {
  for(var i = 0; i<_cubesArray.length; i++) {
    var number = parseInt(countString[i]);
    for(var j = 0; j < _cubesArray[i].length; j++) {
      var cube = _cubesArray[i][j];
      cube.position.z = -( j*(i+ _spacingY)) ;
      cube.position.x = i*_spacingX;
    }
  }

}
