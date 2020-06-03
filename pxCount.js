//basic THREEJS Setup
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
scene.add(camera);
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//Camera
controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.campingFactor = 0.25;
controls.enableZoom = true;
camera.position.z = 10;

//UI
var datGUI = new dat.GUI();
var guiControls = new function () {
}


init();
render();
// instanceObjAlongSpline();
function init() {
  var _testGeo = new THREE.PlaneGeometry( 5, 5);
  var _testMat = new THREE.MeshNormalMaterial();
  var _testMesh = new THREE.Mesh(_testGeo, _testMat);
  scene.add(_testMesh);
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
    // uniforms.u_resolution.value.x = renderer.domElement.width;
    // uniforms.u_resolution.value.y = renderer.domElement.height;
}
