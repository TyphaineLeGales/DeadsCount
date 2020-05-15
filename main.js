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
geometry.computeVertexNormals();
console.log(geometry.faces[0].vertexNormals);
var texture = new THREE.TextureLoader().load( "Assets/map.jpg" );
texture.minFilter = THREE.NearestFilter;
var material = new THREE.MeshBasicMaterial( { map: texture} );
var globe = new THREE.Mesh( geometry, material );
globe.name = "globe";
scene.add( globe );
// globe.computeVertexNormals();
// var helper = new VertexNormalsHelper( globe, 2, 0x00ff00, 1 );
// scene.add(helper);

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

  if(intersects[0]) {

    var clickedObj = intersects[ 0 ].object;
    if( clickedObj.name != "globe") {
      if( clickedObj.userData.state != "isActive") {
        clickedObj.material.color.set(0x0000ff);
        clickedObj.userData.state = "isActive";
        createInstances(clickedObj);

      } else {
        //toggle debug
        intersects[ 0 ].object.material.color.set(0xff0000);

        //delete instances
        deleteInstances(clickedObj);
        intersects[0].object.userData.state = "";
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
  for (var k= 0; k <geometry.vertices.length; k++)
  {
      var materialInstance = new THREE.MeshBasicMaterial({color: 0xff0000});
      materialInstance.side = THREE.DoubleSide;
      var dotGeo = new THREE.CircleGeometry(0.2, 16);
      var v = geometry.vertices[k];
      var pos = new THREE.Vector3(v.x, v.y, v.z);
      var circle = new THREE.Mesh(dotGeo,materialInstance);
      circle.position.copy(pos);
      circle.lookAt(globe.position);
      circle.userData.quantity = k*5;

      //compute vertice normal and store it as userData
      // for(var i = 0, l = geometry.faces.length; i < l; i ++) {
      //   var face = geometry.faces[i];
      //   for ( var j = 0, jl = face.vertexNormals.length; j < jl; j ++ ) {

      //     var normal = face.vertexNormals[ j ];
      //     circle.userData.vertNorm =  new THREE.Vector3();
      //     circle.userData.vertNorm.copy( normal ).applyMatrix3( _normalMatrix ).normalize()
      //   }
      // }


      scene.add(circle);
  }
}

function createInstances (dot) {
  var dotGeo = new THREE.CircleGeometry(0.2, 16);
   // _instMat = new THREE.ShaderMaterial( { uniforms:uniforms, vertexShader: document.getElementById( 'vertexShader' ).textContent, fragmentShader: document.getElementById( 'fragmentShader' ).textContent,flatShading: true});
   _instMat = new THREE.MeshBasicMaterial( {color : 0xff0000});
   _instMat.side = THREE.DoubleSide;
   _instMat.needsUpdate = true


  for(var i = 0; i < dot.userData.quantity; i += 1) {
        var dotInst = new THREE.Mesh(dotGeo, _instMat);
        scene.add(dotInst);
        dotInst.position.copy(dot.position).multiplyScalar( i/guiControls.instanceSpacing);
        dotInst.lookAt(globe.position);
  }
}

function deleteInstances (dot) {
  var dotInstances = dot.children;
  var instAmount = dotInstances.length;
  for(var i = 0; i <  instAmount; i++) {
    dot.remove(dotInstances[0]);
  }
}

