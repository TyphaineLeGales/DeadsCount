
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
controls.enableZoom = true;
// controls.enableKeys = false;
// controls.enablePan = false;
// controls.enableRotate = false;
camera.position.z = 10;
camera.position.y = 2.5;

var texCube = new THREE.TextureLoader().load( 'Assets/matCap4.jpg' );
var geo = new THREE.BoxGeometry(1, 1, 1);

var clock = new THREE.Clock(); //units a second
var dt = 0;
var _animTimer = 0;
var _placeholderString = "406913";
var _cubeGroup = new THREE.Group();
var _cubesArray = [];
var currIndex = 0;
var _animationCubeTime = 2;
var _offsetPositionStart = -13;
var _animNext = false;
var _animPrev= false;
var _count = 0;

//Background
var backgroundTexBlack = new THREE.TextureLoader().load( 'Assets/gradientB&W.jpg' );
scene.background = backgroundTexBlack;

var countContainer = document.querySelector('h1.count');



window.addEventListener("DOMContentLoaded", (event) => {
  init();
});

function init() {

  generateCubes();
  render();
}

function render() {
  dt = clock.getDelta();

  if(_animNext === true && _animPrev === false) {
    animNavNext(dt);
  }

  if(_animPrev === true && _animNext === false ) {
    animNavPrev(dt);
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

function generateCubes () {
  var length = _placeholderString.length;
  var spacing = 2;
  var scaleY = 10;
  var unit = Math.pow(10, length-1);
  for(var i =0; i < length; i++) {
    var currNum = parseInt(_placeholderString[i]);
    for(var j = 0; j < currNum; j++) {
      var mat = new THREE.MeshMatcapMaterial({matcap:texCube, transparent: true});
      mat.needsUpdate = true;
      var mesh = new THREE.Mesh(geo, mat);
      mesh.userData.unit = unit;
      scaleY = length-i;
      mesh.scale.y = scaleY;
      mesh.position.set(_offsetPositionStart-i*spacing, scaleY/2, j*spacing);
      // mesh.visible = false;
      _cubesArray.push(mesh);
      _cubeGroup.add(mesh);
    }

    scene.add(_cubeGroup);
    unit *= 0.1;
  }
  currIndex = _cubesArray.length;
}

function animNavNext (dt) {
  // console.log(currIndex);
   var currUnit = _cubesArray[currIndex];
    _animTimer += dt;
    var t = mapRange(_animTimer, 0, _animationCubeTime, 0, 1 );
    // currUnit.position.x  = mapRange(_animTimer, 0, _animationCubeTime, _offsetPositionStart, 0 );
    currUnit.position.x -= 0.1;
    currUnit.material.opacity = mapRange(_animTimer, 0, _animationCubeTime, 1, 0 );

    // if(_cubesArray[currIndex+1]) {
    //   var prevUnit = _cubesArray[currIndex-1];
    //   prevUnit.position.x += 0.1;
    //   prevUnit.material.opacity = mapRange(_animTimer,0, _animationCubeTime,1, 0);
    // }

    if(_animTimer > _animationCubeTime) {
      _animNext = false;
      _animTimer = 0;
    }
}

function animNavPrev(dt) {
   var currUnit = _cubesArray[currIndex];
    _animTimer += dt;
    currUnit.position.x += 0.1;
    currUnit.material.opacity = mapRange(_animTimer, 0, _animationCubeTime, 0, 1 );

    // if(_cubesArray[currIndex] !=0) {
    //   var prevUnit = _cubesArray[currIndex+1];
    //   prevUnit.position.x -= 0.1;
    //   prevUnit.material.opacity = mapRange(_animTimer,0, _animationCubeTime,1, 0);
    // }

    if(_animTimer > _animationCubeTime) {
      _animPrev = false;
      _animTimer = 0;
    }
}


function next () {
  console.log(currIndex);
  if(_animNext === false && _animPrev === false) {

    if(currIndex >= 1) {
      console.log("next is called");
      currIndex -= 1;
      _animNext = true;
      _count += _cubesArray[currIndex].userData.unit;
      _cubesArray[currIndex].visible = true;
    }
  }
  countContainer.innerHTML = _count;
}

function prev () {
  console.log(currIndex);
  if(_animNext === false && _animPrev === false) {
    if(currIndex <=_cubesArray.length) {
      currIndex += 1;
      _count -= _cubesArray[currIndex].userData.unit;
      _cubesArray[currIndex].visible = true;
      _animPrev = true;
    }
  }
  countContainer.innerHTML = _count;
}

function mapRange(value, a, b, c, d) {
  value = (value - a) / (b - a);
  return c + value*(d-c);
}

function ease (t) {
    sqt = t * t;
    return sqt / (2*(sqt-t)+1);
}

//UI
var datGUI = new dat.GUI();
var guiControls = new function () {
  this.cubesPosX = _cubeGroup.position.x;
  this.cubesPosY = _cubeGroup.position.y;
  this.cubesPosZ = _cubeGroup.position.z;
  this.cubesRotationX = _cubeGroup.rotation.x;
  this.cubesRotationY = _cubeGroup.rotation.y;
  this.cubesRotationZ = _cubeGroup.rotation.z;
  this.cameraPosX = camera.position.x;
  this.cameraPosY = camera.position.y;
  this.cameraPosZ = camera.position.z;
  this.cameraRotationX = camera.rotation.x;
  this.cameraRotationY = camera.rotation.y;
  this.cameraRotationZ = camera.rotation.z;
}

var cubesPosition = datGUI.addFolder('CubesPos');

cubesPosition.add(guiControls, 'cubesPosX', -200, 100 ).onChange(function(value) {
  _cubeGroup.position.x = value;
});
cubesPosition.add(guiControls, 'cubesPosY', -200, 100 ).onChange(function(value) {
  _cubeGroup.position.y = value;
});
cubesPosition.add(guiControls, 'cubesPosZ', -100, 100 ).onChange(function(value) {
  _cubeGroup.position.z = value;
});

var cubesRotation = datGUI.addFolder('CubesRotation');

cubesRotation.add(guiControls, 'cubesRotationX', -200, 1000 ).onChange(function(value) {
  _cubeGroup.position.x = value;
});

cubesRotation.add(guiControls, 'cubesRotationY', -200, 1000 ).onChange(function(value) {
  _cubeGroup.position.y = value;
});

cubesRotation.add(guiControls, 'cubesRotationZ', -1000, 1000 ).onChange(function(value) {
  _cubeGroup.position.z = value;
});

var cameraPosition = datGUI.addFolder('CameraPos');

cameraPosition.add(guiControls, 'cameraPosX', -200, 100 ).onChange(function(value) {
  camera.position.x = value;
});
cameraPosition.add(guiControls, 'cameraPosY', -200, 100 ).onChange(function(value) {
  camera.position.y = value;
});
cameraPosition.add(guiControls, 'cameraPosZ', -100, 100 ).onChange(function(value) {
  camera.position.z = value;
});

var cameraRotation = datGUI.addFolder('CameraRotation');

cameraRotation.add(guiControls, 'cameraRotationX', -30, 0 ).onChange(function(value) {
  camera.position.x = value;
});

cameraRotation.add(guiControls, 'cameraRotationY', -3, 0 ).onChange(function(value) {
  camera.position.y = value;
});

cameraRotation.add(guiControls, 'cameraRotationZ', -30, 0 ).onChange(function(value) {
  camera.position.z = value;
});
