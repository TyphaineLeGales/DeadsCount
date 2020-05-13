var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.campingFactor = 0.25;
        controls.enableZoom = true;

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshNormalMaterial();
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

var animate = function () {
  requestAnimationFrame( animate );

  renderer.render( scene, camera );
};

animate();
