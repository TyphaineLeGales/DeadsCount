
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
var geo = new THREE.BoxGeometry(1, 1, 1);

var clock = new THREE.Clock(); //units a second
var dt = 0;
var _animTimer = 0;
var _placeholderString = "406913";
var _cubeGroup = new THREE.Group();
var _cubesArray = [];
var currIndex = 0;
var _animationCubeTime = 2;
var _offsetPositionStart = -12.5;
var _animNext = false;
var _animPrev= false;

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
  dt = clock.getDelta();

  if(_animNext === true) {
    animNavNext(dt);
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
  var scaleY = 1;

  for(var i =0; i < length; i++) {

    var currNum = parseInt(_placeholderString[i]);
    for(var j = 0; j < currNum; j++) {
      var mat = new THREE.MeshMatcapMaterial({matcap:texCube, transparent: true});
      mat.needsUpdate = true;
      var mesh = new THREE.Mesh(geo, mat);
      scaleY = length-i;
      mesh.scale.y += scaleY;
      mesh.position.set(_offsetPositionStart, scaleY/2, 0);
      mesh.visible = false;
      scene.add(mesh);
      _cubesArray.push(mesh);
    }
  }
}

function animNavNext (dt) {
   var currUnit = _cubesArray[currIndex];
    _animTimer += dt;
    currUnit.position.x += 0.1;
    currUnit.material.opacity = mapRange(_animTimer, 0, _animationCubeTime, 0, 1 );

    if(_cubesArray[currIndex-1]) {
      var prevUnit = _cubesArray[currIndex-1];
      prevUnit.position.x += 0.1;
      prevUnit.material.opacity = mapRange(_animTimer,0, _animationCubeTime,1, 0);
    }

    if(_animTimer > _animationCubeTime) {
      _animNext = false;
      _animTimer = 0;
    }
}


function next () {
  if(currIndex < _cubesArray.length-1) {
    currIndex += 1;
    _cubesArray[currIndex].visible = true;
    _animNext = true;
  }
  console.log(currIndex);

}

function prev () {
  if(currIndex > 0) {
    currIndex -= 1;
    _cubesArray[currIndex].visible = true;
    _animPrev = true;
  }
  console.log(currIndex);
}

function mapRange(value, a, b, c, d) {
  value = (value - a) / (b - a);
  return c + value*(d-c);
}
