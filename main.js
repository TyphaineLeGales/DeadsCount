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
var _instanceSpacing = 10;
var clock = new THREE.Clock(); //units a second
var dt = 0;
var _instMat;
var _amountOfInst = 15;
var  uniforms = {
                u_time: { type: "f", value: 1.0 }, // Time in seconds since load
                u_resolution: { type: "v2", value: new THREE.Vector2() }, // Canvas size
                u_mouse: { type: "v2", value: new THREE.Vector2() } // mouse position in screen pixels
            };
uniforms.u_resolution.value.x = renderer.domElement.width;
uniforms.u_resolution.value.y = renderer.domElement.height;

var datGUI = new dat.GUI();
var guiControls = new function () {
  this.instanceSpacing = 10;
  this.amountOfInst = 15
}

datGUI.add(guiControls, 'instanceSpacing', 1, 50);
datGUI.add(guiControls, 'amountOfInst', 1, 1000);

createDots();
render();

window.addEventListener( 'resize', onWindowResize, false );
window.addEventListener( 'mousemove', onMouseMove, false );
window.addEventListener( 'click', onClick, false );

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
    uniforms.u_resolution.value.x = renderer.domElement.width;
    uniforms.u_resolution.value.y = renderer.domElement.height;
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
    var clickedObj = intersects[ i ].object;
    if( clickedObj.name != "globe") {
      if( clickedObj.userData.state != "isActive") {
        clickedObj.material.color.set(0x0000ff);
        clickedObj.userData.state = "isActive";
        createInstances(clickedObj);

      } else {
        //toggle debug
        intersects[ i ].object.material.color.set(0xff0000);

        //delete instances
        deleteInstances(clickedObj);
        intersects[i].object.userData.state = "";
      }
    }
  }

}
function render () {
  requestAnimationFrame( render );
  dt += clock.getDelta();
  // console.log(dt%1);
  uniforms.u_time.value = dt;
  renderer.render( scene, camera );
};


function createDots () {
  for (var i = 0; i <geometry.vertices.length; i++)
  {
      var materialInstance = new THREE.MeshBasicMaterial({color: 0xff0000});
      materialInstance.side = THREE.DoubleSide;
      var dotGeo = new THREE.CircleGeometry(0.2, 16);
      var v = geometry.vertices[i];
      var pos = new THREE.Vector3(v.x, v.y, v.z);
      var circle = new THREE.Mesh(dotGeo,materialInstance);
      circle.position.copy(pos);
      circle.lookAt(globe.position);
      circle.userData.quantity = i*5;
      scene.add(circle);
  }
}

function createInstances (dot) {
  var dotGeo = new THREE.CircleGeometry(0.2, 16);
   _instMat = new THREE.ShaderMaterial( { uniforms:uniforms, vertexShader: document.getElementById( 'vertexShader' ).textContent, fragmentShader: document.getElementById( 'fragmentShader' ).textContent,flatShading: true});
   _instMat.side = THREE.DoubleSide;
   _instMat.needsUpdate = true

  var dir = new THREE.Vector3();
  dir.copy(dot.position).normalize();

  for(var i = 0; i < dot.userData.quantity; i += 1) {
    var dotInst = new THREE.Mesh(dotGeo, _instMat);
    dot.add(dotInst);
    dotInst.position.x -= i/guiControls.instanceSpacing;
    dotInst.position.y -= i/guiControls.instanceSpacing;
    dotInst.position.z -= i/guiControls.instanceSpacing;
  }
}

function deleteInstances (dot) {
  var dotInstances = dot.children;
  var instAmount = dotInstances.length;
  for(var i = 0; i <  instAmount; i++) {
    dot.remove(dotInstances[0]);
  }
}

