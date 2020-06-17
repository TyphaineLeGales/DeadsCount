
//basic THREEJS Setup
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000000 );
scene.add(camera);
var renderer = new THREE.WebGLRenderer();

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//Camera
// controls = new THREE.OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true;
// controls.campingFactor = 0.25;
// controls.enableZoom = true;
// controls.enableKeys = false;
// controls.enablePan = false;
// controls.enableRotate = false;
camera.position.z = 10;
camera.position.y = 2.5;

var texCube = new THREE.TextureLoader().load( '../Assets/matCap4.jpg' );
var geo = new THREE.BoxGeometry(1, 1, 1);

var clock = new THREE.Clock(); //units a second
var dt = 0;
var _animTimer = 0;
var _placeholderString = "406913";
var _placeholderNumber = parseInt(_placeholderString);
var _cubeGroup = new THREE.Object3D();
var _cubesArray = [];
var currIndex = 0;
var _offsetPositionStart = -13;
var _animationCubeTime = 2;
var _XposAnim = 10;
var _animNext = false;
var _animPrev= false;
var _count = 0;

var target = new THREE.Vector3();
var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var _posCubeGroup = new THREE.Vector3(2, -1, -19);

//Background
var backgroundTexBlack = new THREE.TextureLoader().load( '../Assets/gradientB&W.jpg' );
scene.background = backgroundTexBlack;

var countContainer = document.querySelector('h1.count');
var header = document.querySelector('h1.numberHeader');

// window.addEventListener("mousemove", (event) => {
//   onDocumentMouseMove(event);
// });

window.addEventListener("DOMContentLoaded", (event) => {
  init();
});

function init() {

  generateCubes(_placeholderString);
  render();
}

function render() {
  dt = clock.getDelta();

  // target.x += ( mouseX - target.x ) * .02;
  // target.y += ( - mouseY - target.y ) * .02;
  // target.z = camera.position.z;

  if(_animNext === true && _animPrev === false) {
    animNavNext(dt);
  }

  if(_animPrev === true && _animNext === false ) {
    animNavPrev(dt);
  }

  // _cubeGroup.lookAt( target );

  requestAnimationFrame( render );
  renderer.render(scene, camera);

}

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function onDocumentMouseMove( event ) {
    console.log(mouseX);
    mouseX = ( event.clientX - windowHalfX );
    mouseY = ( event.clientY - windowHalfY );
}


function generateCubes (str) {

  var length = str.length;
  var spacing = 2;
  var scaleY = 10;
  var unit = Math.pow(10, length-1);
  for(var i =0; i < length; i++) {
    var currNum = parseInt(str[i]);
    for(var j = 0; j < currNum; j++) {
      var mat = new THREE.MeshMatcapMaterial({matcap:texCube, transparent: true});
      mat.needsUpdate = true;
      var mesh = new THREE.Mesh(geo, mat);
      mesh.userData.unit = unit;
      scaleY = length-i;
      mesh.scale.y = scaleY;
      _cubeGroup.add(mesh);
      mesh.position.set(i*spacing, scaleY/2, j*spacing);
      mesh.userData.initialXPos = i*spacing;
      _cubesArray.push(mesh);
    }

    scene.add(_cubeGroup);
    unit *= 0.1;
  }
  currIndex = _cubesArray.length-1;

  _cubeGroup.position.copy(_posCubeGroup);
  _cubeGroup.rotation.y = -20;


}

function deleteCubes() {
  _cubesArray = [];
 _cubeGroup.children = [];
  // var lengthOfGroup = _cubeGroup.children.length;
  // for(var i = 0; i<lengthOfGroup; i++) {
  //   _cubeGroup.remove(_cubeGroup.children[i]);
  // }
}

function updateGridOfCubes(str) {
  deleteCubes();
  generateCubes(str);
  currIndex = _cubesArray.length-1;
  _count = 0;
  countContainer.innerHTML = _count;
}

function animNavNext (dt) {

   var currUnit = _cubesArray[currIndex];
    _animTimer += dt*guiControls.animationSpeed;
    currUnit.position.x = mapRange(_animTimer, 0, _animationCubeTime, currUnit.userData.initialXPos,currUnit.userData.initialXPos+_XposAnim);
    currUnit.material.opacity = mapRange(_animTimer, 0, _animationCubeTime, 1, 0 );

    if(_animTimer > _animationCubeTime) {
      _animNext = false;
      _animTimer = 0;
      _count += _cubesArray[currIndex].userData.unit;
      countContainer.innerHTML = _count;
      currIndex -= 1;
    }
}

function animNavPrev(dt) {
   var currUnit = _cubesArray[currIndex];
    _animTimer += dt*guiControls.animationSpeed;
    currUnit.position.x = mapRange(_animTimer, 0, _animationCubeTime,currUnit.userData.initialXPos+_XposAnim, currUnit.userData.initialXPos);
    currUnit.material.opacity = mapRange(_animTimer, 0, _animationCubeTime, 0, 1 );

    if(_animTimer > _animationCubeTime) {
      _animPrev = false;
      _animTimer = 0;
      _count -= _cubesArray[currIndex].userData.unit;
      countContainer.innerHTML = _count;
    }
}


function next () {
  if(_animNext === false && _animPrev === false) {
    if(currIndex >= 0) {
      _animNext = true;
    }
  }
}

function prev () {

  if(_animNext === false && _animPrev === false) {
    if(currIndex <_cubesArray.length-1) {
      currIndex += 1;
      _animPrev = true;
    }
  }
}

function mapRange(value, a, b, c, d) {
  value = (value - a) / (b - a);
  return c + value*(d-c);
}

function ease (t) {
    sqt = t * t;
    return sqt / (2*(sqt-t)+1);
}

function lerp(a,  b,  c) {
    return a + c * (b - a);
}

function updateCubesMatrix(vec3) {
  for(var i = 0; i< _cubeGroup.children.length; i++) {
     _cubesArray[i].updateMatrix();
  }
}
//UI
var datGUI = new dat.GUI();
var guiControls = new function () {
  this.number = _placeholderNumber;
  this.animationSpeed = _animationCubeTime;

}
datGUI.add(guiControls, "animationSpeed", 1, 5);

datGUI.add(guiControls, 'number', 1, 900000000, 1).onChange(function(value) {
  header.innerHTML = value;
  updateGridOfCubes(value.toString());
  // generateCubes(value.toString());
  //deleteCubes
});



