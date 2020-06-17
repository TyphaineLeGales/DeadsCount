
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
controls.enableRotate = true;
camera.position.z = 27;
camera.position.y = -9.6;
camera.position.x = 0;

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
var countDiv = document.querySelector('h1.count');
var countString = "406913";
var numberOfDigits = countString.length;
var numbIsDisp = false;
var _cubesArray = [];
var _minSize = 10;
var _cubeGroup = new THREE.Group();
var _thousandIsDone = false;
var _offsetTimer = 0;
var _animCubeOffset = 5;
var _cubeCounter = 0;
var _userHasClicked = false;
var _blockThousand = false;
var _bigCubes = [];
var _bigCubesDone = false;
var _dispCount = 0;


// var header = document.querySelector('h1');
// header.addEventListener('click', function () {
//   _userHasClicked = true;
//  });

//UI
// var datGUI = new dat.GUI();
// var guiControls = new function () {
//   this.cameraPosX = camera.position.x;
//   this.cameraPosY = camera.position.y;
//   this.cameraPosZ = camera.position.z;
//   this.cameraRotationX = camera.rotation.x;
//   this.cameraRotationY = camera.rotation.y;
//   this.cameraRotationZ = camera.rotation.z;
// }


//Background
var backgroundTexSky = new THREE.TextureLoader().load( 'Assets/skyTest2.jpg' );
var backgroundTexBlack = new THREE.TextureLoader().load( 'Assets/gradientB&W.jpg' );
scene.background = backgroundTexBlack;

// var cameraPosition = datGUI.addFolder('CameraPos');

// cameraPosition.add(guiControls, 'cameraPosX', -200, 100 ).onChange(function(value) {
//   camera.position.x = value;
// });
// cameraPosition.add(guiControls, 'cameraPosY', -200, 100 ).onChange(function(value) {
//   camera.position.y = value;
// });
// cameraPosition.add(guiControls, 'cameraPosZ', -100, 100 ).onChange(function(value) {
//   camera.position.z = value;
// });

// var cameraRotation = datGUI.addFolder('CameraRotation');

// cameraRotation.add(guiControls, 'cameraRotationX', -200, 1000 ).onChange(function(value) {
//   camera.position.x = value;
// });

// cameraRotation.add(guiControls, 'cameraRotationY', -200, 1000 ).onChange(function(value) {
//   camera.position.y = value;
// });

// cameraRotation.add(guiControls, 'cameraRotationZ', -1000, 1000 ).onChange(function(value) {
//   camera.position.z = value;
// });

var mat = new THREE.MeshMatcapMaterial({matcap:texCube});

window.addEventListener("DOMContentLoaded", (event) => {
  init();
  // window.addEventListener('mousemove', e => {
  // var mouseX = e.clientX;
  // var mouseY = e.clientY;
  // var offsetX = mapRange(e.clientX, 0,  window.innerWidth, -0.2, 0.2 );
  // var offsetY = mapRange(e.clientY, 0,  window.innerHeight, -0.2, 0.2 );
  // camera.position.y += offsetY;
  // camera.position.x += offsetX;
  // });
});

function init() {
  scene.add(_cubeGroup);
  generateThousandCubes();
  render();
}

function render() {
  dt += clock.getDelta();
  _offsetTimer += dt;

  // thousand units
  if(_thousandIsDone != true) {
    for(var i = 0; i <  _cubesArray.length; i++) {
      if(_offsetTimer > _animCubeOffset) {
       _cubeGroup.add( _cubesArray[_cubeCounter]);
       _dispCount += _cubesArray[_cubeCounter].userData.unit;
       countDiv.innerHTML = _dispCount;
        _cubeCounter += 1;
        _offsetTimer = 0;
        // camera.rotation.x += 0.01;
      }
    }
  }

    _cubeGroup.rotation.y -= 0.001;
    _cubeGroup.rotation.x += 0.001;

    if(_cubeGroup.children.length === _cubesArray.length) {
      _thousandIsDone = true;
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

function repositionCubesOffset () {

}

function dispNumber () {
   countDiv.innerHTML="39811";
   numbIsDisp = true;
}

function dispCountry () {
   countDiv.innerHTML="UK";
   numbIsDisp = false;
}

function generateThousandCubes () {
  var scale = 1;
  var spacing = 1.1;
  var cubeSize = 10;
  var cubeGeoUnits = new THREE.CubeGeometry(scale, scale, scale);
  var cubeGeoThousands = new THREE.CubeGeometry(scale*cubeSize, scale*cubeSize, scale*cubeSize);
  var Geometr

  var numberOfDigits = countString.length;
  var units = countString[numberOfDigits-1];
  var tens = countString[numberOfDigits-2];
  var hundreds = countString[numberOfDigits-3];
  var thousands = countString[numberOfDigits-4];
  var tenThousands = countString[numberOfDigits-5];
  var hundredThousands = countString[numberOfDigits-6];
  var offsetHundreds = scale* spacing;
  var offsetThousands = scale* spacing*cubeSize + cubeSize;


  //HUNDREDS
   for(let i = 0; i<hundreds; i++) {
    for(let j = 0; j< cubeSize; j++) {
      for(let k = 0; k < cubeSize; k++) {
        var cube = new THREE.Mesh(cubeGeoUnits, mat);
        cube.userData.unit = 1;
        cube.position.x = (j- cubeSize/2)* offsetHundreds;
        cube.position.y = (i  - cubeSize*2)* offsetHundreds;
        cube.position.z = (k- cubeSize/2)* offsetHundreds;
        _cubesArray.push(cube);
      }
    }
  }

  //TENS
  for(let j = 0;j<tens;j++) {
    for(let k = 0; k<cubeSize; k++) {
      var cube = new THREE.Mesh(cubeGeoUnits, mat);
        cube.userData.unit = 1;
        cube.position.x = (j- cubeSize/2)* offsetHundreds;
        cube.position.y = (hundreds-cubeSize*2)* offsetHundreds;
        cube.position.z = (k- cubeSize/2)* offsetHundreds;
        _cubesArray.push(cube);
    }
  }

//UNITS
  for(let k = 0; k<units; k++) {
    var cube = new THREE.Mesh(cubeGeoUnits, mat);
    cube.userData.unit = 1;
    cube.position.x = (tens- cubeSize/2)* offsetHundreds;
    cube.position.y =( hundreds-cubeSize*2)* offsetHundreds;
    cube.position.z = (k - cubeSize/2)* offsetHundreds;
    _cubesArray.push(cube);
  }


   for(let i = 0; i< hundredThousands; i++) {
    for(let j= 0; j < cubeSize; j++) {
      for(let k= 0; k < cubeSize; k++) {
        var cube = new THREE.Mesh(cubeGeoThousands, mat);
        cube.userData.unit = 1000;
        cube.position.x = j*offsetThousands;
        cube.position.y = i*offsetThousands;
        cube.position.z = k*offsetThousands ;
        _cubesArray.push(cube);
      }
    }
  }

  for(let j = 0; j< tenThousands; j++) {
    for(let k= 0; k < cubeSize; k++) {
    var cube = new THREE.Mesh(cubeGeoThousands, mat);
    cube.userData.unit = 1000;
    cube.position.x = j*offsetThousands;
    cube.position.y = hundredThousands*offsetThousands;
    cube.position.z = k*offsetThousands;
    _cubesArray.push(cube);
    }
  }

  for(let k = 0; k< thousands; k++) {
    var cube = new THREE.Mesh(cubeGeoThousands, mat);
    cube.userData.unit = 1000;
    cube.position.x = tenThousands*offsetThousands;
    cube.position.y = hundredThousands*offsetThousands;
    cube.position.z = k*offsetThousands;
    _cubesArray.push(cube);
  }
}


function mapRange(value, a, b, c, d) {
  value = (value - a) / (b - a);
  return c + value*(d-c);
}
