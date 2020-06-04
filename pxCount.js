//basic THREEJS Setup
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
scene.add(camera);
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

window.addEventListener("DOMContentLoaded", (event) => {
    init();
  });

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

var _material;
var  uniforms = {
                u_countValue: { type: "f", value: null }, // Time in seconds since load
                u_resolution: { type: "v2", value: new THREE.Vector2() }, // Canvas size
                u_mouse: { type: "v2", value: new THREE.Vector2() } // mouse position in screen pixels
            };
uniforms.u_resolution.value.x = renderer.domElement.width;
uniforms.u_resolution.value.y = renderer.domElement.height;



// instanceObjAlongSpline();
function init() {
  var _testGeo = new THREE.CubeGeometry( 5, 5, 5);
  var _testMat = new THREE.MeshNormalMaterial();

 _material = new THREE.ShaderMaterial( { uniforms:uniforms, vertexShader: document.getElementById( 'vertexShader' ).textContent, fragmentShader: document.getElementById( 'fragmentShader' ).textContent});
  var textureHeight = 256;
  var textureWidth = 256;
  maxCount = textureHeight*textureWidth;

  var uvCoord = new Float32Array(maxCount * 2);
    for (var i = 0, i2 = 0; i < maxCount; i++) {
       let u = ((i%textureWidth)+0.5)/textureWidth;
       let v = (Math.floor(i/textureWidth)+0.5)/textureHeight;
        uvCoord[i2 + 0] = u;
        uvCoord[i2 + 1] = v;
        i2+=2;
    }

  var _testMesh = new THREE.Mesh(_testGeo, _material);
  scene.add(_testMesh);

  render();
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
    uniforms.u_resolution.value.x = renderer.domElement.width;
    uniforms.u_resolution.value.y = renderer.domElement.height;
}
