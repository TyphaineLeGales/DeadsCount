//Basic setup
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//Orbit Control
controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.campingFactor = 0.25;
controls.enableZoom = true;
camera.position.z = 10;

var geometry = new THREE.SphereGeometry( 5, 8, 8);
var texture = new THREE.TextureLoader().load( "Assets/map.jpg" );
texture.minFilter = THREE.NearestFilter;
var material = new THREE.MeshBasicMaterial( { map: texture} );
var globe = new THREE.Mesh( geometry, material );
globe.name = "globe";
scene.add( globe );

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();


createDots();
animate();


window.addEventListener( 'resize', onWindowResize, false );
window.addEventListener( 'mousemove', onMouseMove, false );
window.addEventListener( 'click', onClick, false );

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function onMouseMove(event) {
  // calculate mouse position in normalized device coordinates
  // (-1 to +1) for both components
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

function onClick() {
  raycaster.setFromCamera( mouse, camera );

  // calculate objects intersecting the picking ray
  var intersects = raycaster.intersectObjects( scene.children );

  for ( var i = 0; i < intersects.length; i++ ) {
    if( intersects[ i ].object.name != "globe") {
      intersects[ i ].object.material.color.set(0x0000ff);
    }
    console.log(intersects[i]);

  }

}
function animate () {
  requestAnimationFrame( animate );
  renderer.render( scene, camera );
};


function createDots () {
  for (var i = 0; i <geometry.vertices.length; i++)
  {
      var materialInstance = new THREE.MeshBasicMaterial({color: 0xff0000});
      materialInstance.side = THREE.DoubleSide;
      var geometryIntance = new THREE.CircleGeometry(0.2, 16);
      var v = geometry.vertices[i];
      var pos = new THREE.Vector3(v.x, v.y, v.z);
      var circle = new THREE.Mesh(geometryIntance,materialInstance);
      circle.position.copy(pos);
      circle.lookAt(globe.position);
      scene.add(circle);
  }
}
