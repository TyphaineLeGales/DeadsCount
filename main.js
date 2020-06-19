let number = 0;
let systemSelectedStr = "linearAnimation";
let numberHeader = document.querySelector('h1.numberHeader');
const countDiv = document.querySelector('h1.count');
const progressBar = document.getElementById('progress');

let _unitArray = [];
var clock = new THREE.Clock(); //units a second
var dt = 0;

var scene, camera, renderer ;

window.addEventListener( 'resize', onWindowResize, false );
window.addEventListener("DOMContentLoaded", (event) => {
  init();
  render();
});

function init() {
  guiControls.linearAnimation = true;
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000 );
  scene.add(camera);
  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );
  var backgroundTexBlack = new THREE.TextureLoader().load( '../Assets/gradientB&W.jpg' );
  scene.background = backgroundTexBlack;
  //linearAnim
}


function render () {
  dt += clock.getDelta();
  if(systemSelectedStr === "linearAnimation") {
    linearAnimationRender(scene, camera, guiControls.number, guiControls.speed, progressBar);
  }
  requestAnimationFrame( render );

  renderer.render( scene, camera );
};


//utility functions

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}


function mapRange(value, a, b, c, d) {
  value = (value - a) / (b - a);
  return c + value*(d-c);
}

function  clamp ( value, min, max ) {

  return Math.max( min, Math.min( max, value ) );

}

//UI
var datGUI = new dat.GUI();
var guiControls = new function () {
  this.linearAnimation = false;
  this.cubeFractal = false;
  this.clickInteraction = false;
  this.scrollInteraction = false;
  this.number = 593;
  this.speed = 1;
}

var typeOfVis = datGUI.addFolder('typeOfVisualization');

typeOfVis.add(guiControls, "linearAnimation").listen().onChange(function(value){
  if(value) {
    systemSelectedStr = "linearAnimation";
    linearAnimationInit();
    console.log(scene);
    guiControls.cubeFractal = false;
    guiControls.clickInteraction = false;
    guiControls.scrollInteraction = false;
  }
})

typeOfVis.add(guiControls, "cubeFractal").listen().onChange(function(value){
  if(value) {
    systemSelectedStr = "cubeFractal";
    guiControls.linearAnimation = false;
    guiControls.clickInteraction = false;
    guiControls.scrollInteraction = false;
  }
})

typeOfVis.add(guiControls, "clickInteraction").listen().onChange(function(value){
  if(value) {
    systemSelectedStr = "clickInteraction";
    guiControls.linearAnimation = false;
    guiControls.cubeFractal = false;
    guiControls.scrollInteraction = false;
  }
})

typeOfVis.add(guiControls, "scrollInteraction").listen().onChange(function(value){
  if(value) {
    systemSelectedStr = "scrollInteraction";
    guiControls.linearAnimation = false;
    guiControls.cubeFractal = false;
    guiControls.clickInteraction = false;
  }
})

datGUI.add(guiControls, 'speed', 1, 10, 1);

datGUI.add(guiControls, 'number').min(0).step(1).onChange(function(value) {

  // header.innerHTML = value;
  // number = value;
  numberHeader.innerHTML = value;

})



