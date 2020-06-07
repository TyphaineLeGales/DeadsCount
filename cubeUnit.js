
//basic THREEJS Setup
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000000 );
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
camera.position.z = 21;
camera.position.y = 6;
camera.position.x = 7;

var clock = new THREE.Clock(); //units a second
var dt = 0;
var _t;

var _testMesh;
var _normalMat = new THREE.MeshNormalMaterial();
 _normalMat.visible = false;
var texCube = new THREE.TextureLoader().load( 'Assets/matCap4.jpg' );

var _redMat = new THREE.MeshBasicMaterial({color:0xff0000});
var _testGeo = new THREE.CubeGeometry( 5, 5, 5);
var isActive = false;
var countDiv = document.querySelector('h1');
var countString = "39811";
var numberOfDigits = countString.length;
var numbIsDisp = false;
var _cubesArray = [];
var _minSize = 10;
var _cubeGroup = new THREE.Group();
var _thousandIsDone = false;
var _offsetTimer = 0;
var _animCubeOffset = 3;
var _cubeCounter = 0;

//UI
var datGUI = new dat.GUI();
var guiControls = new function () {
  this.cameraPosX = camera.position.x;
  this.cameraPosY = camera.position.y;
  this.cameraPosZ = camera.position.z;
  this.cameraRotationX = camera.rotation.x;
  this.cameraRotationY = camera.rotation.y;
  this.cameraRotationZ = camera.rotation.z;
}

// function sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }
//Background
var backgroundTexSky = new THREE.TextureLoader().load( 'Assets/skyTest2.jpg' );
var backgroundTexBlack = new THREE.TextureLoader().load( 'Assets/gradientB&W.jpg' );
scene.background = backgroundTexBlack;

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


window.addEventListener("DOMContentLoaded", (event) => {
  init();
});

function init() {

  generateThousandCubes();
  render();
}

function render() {
  dt += clock.getDelta();
  _offsetTimer += dt;
  for(var i = 0; i <  _cubesArray.length; i++) {

    if(_offsetTimer > _animCubeOffset) {
     scene.add( _cubesArray[_cubeCounter]);
      _cubeCounter += 1;
      _offsetTimer = 0;
    }
  }
  requestAnimationFrame( render );
  renderer.render(scene, camera);

}

window.addEventListener( 'resize', onWindowResize, false );


function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}


function dispNumber () {
   countDiv.innerHTML="39811";
   numbIsDisp = true;
   // matCapCube.visible = true;
}

function dispCountry () {
   countDiv.innerHTML="UK";
   numbIsDisp = false;
   // matCapCube.visible = false;
}

function generateThousandCubes () {
  var scale = 1;
  var spacing = 1.2;
  var cubeGeo = new THREE.CubeGeometry(scale, scale, scale);
  var mat = new THREE.MeshMatcapMaterial({matcap:texCube});
   for(let i = 0; i<10; i++) {
    for(let j = 0; j< 10; j++) {
      for(let k = 0; k < 10; k++) {

        var cube = new THREE.Mesh(cubeGeo, mat);
        cube.position.x = j* scale* spacing;
        cube.position.y = i* scale*spacing;
        cube.position.z = k* scale*spacing;
        _cubesArray.push(cube);
        camera.position.y += 0.01;
      }
    }
   }
}
