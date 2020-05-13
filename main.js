var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.campingFactor = 0.25;
controls.enableZoom = true;

var geometry = new THREE.SphereGeometry( 5, 32, 32 );
var texture = new THREE.TextureLoader().load( "Assets/map.jpg" );
texture.minFilter = THREE.NearestFilter;
var material = new THREE.MeshBasicMaterial( { map: texture } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 10;

var materialInstance = new THREE.MeshNormalMaterial();
var geometryIntance = new THREE.SphereGeometry(0.5, 8, 8);
// for (var i = 0; i < geometry.vertices.length; i++)
for (var i = 0; i <geometry.vertices.length; i++)
{
    var v = geometry.vertices[i];
    var pos = new THREE.Vector3(v.x, v.y, v.z);
    var sphere = new THREE.Mesh(geometryIntance,materialInstance);
    sphere.position.copy(pos);
    scene.add(sphere);
    // do stuff with v...

}

var animate = function () {
  requestAnimationFrame( animate );
  renderer.render( scene, camera );
};

animate();

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );

}
