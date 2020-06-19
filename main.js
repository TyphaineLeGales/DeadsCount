let number = 0;
let systemSelectedStr = "linearAnimation";
let numberHeader = document.querySelector('h1.numberHeader');
const countDiv = document.querySelector('h1.count');
const progressBar = document.getElementById('progress');
var arrows = document.querySelectorAll('button.arrow');

let _unitArray = [];
var clock = new THREE.Clock(); //units a second
var dt = 0;

const _OPACITYTHRESHOLDIN = 0.1;
const _OPACITYTHRESHOLDOUT = 0.9;

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
  console.log(scene);
}


function render () {
  dt += clock.getDelta();
  if(systemSelectedStr === "linearAnimation") {
    linearAnimationRender(dt, scene, camera, guiControls.number, guiControls.speed, progressBar, countDiv);
  } else if(systemSelectedStr === "clickInteraction") {
    clickInteractionRender(dt, scene, camera, guiControls.number, guiControls.speed);
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

function opacityEase(f, obj) {

  if(f < _OPACITYTHRESHOLDIN) {
    obj.material.opacity =  mapRange(f, 0,_OPACITYTHRESHOLDIN, 0, 1);
  } else if (f > _OPACITYTHRESHOLDOUT) {
    obj.material.opacity = mapRange(f,_OPACITYTHRESHOLDOUT,1, 1, 0);
  } else {
    obj.material.opacity = 1;
  }
}


function resetScene() {
  for( var i = scene.children.length - 1; i >= 0; i--) {
    if(scene.children[i].type != "PerspectiveCamera") {
      scene.remove(scene.children[i]);
    }
  }

  camera.position.set(0,0,10);
  camera.rotation.set(0, 0,0);

  countDiv.innerHTML = 0;

  var progress = document.querySelectorAll('div.progressBar');
  progress.forEach(function(e){
      e.style.display = "none";
  } );

  arrows.forEach(function(e){
      e.style.display = "none";
  } );

  dt = 0;
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

 var progress = document.querySelectorAll('div.progressBar');

  if(value) {
    systemSelectedStr = "linearAnimation";
    resetScene();
    linearAnimationInit();
    progress.forEach(function(e){
      e.style.display = "block";
    } );

    guiControls.cubeFractal = false;
    guiControls.clickInteraction = false;
    guiControls.scrollInteraction = false;
  } else {
    systemSelectedStr = "";
    resetScene();
    //porgress bar display none
  }
})

typeOfVis.add(guiControls, "cubeFractal").listen().onChange(function(value){
  if(value) {
    systemSelectedStr = "cubeFractal";
    guiControls.linearAnimation = false;
    guiControls.clickInteraction = false;
    guiControls.scrollInteraction = false;
  }else {
    systemSelectedStr = "";
  }
})

typeOfVis.add(guiControls, "clickInteraction").listen().onChange(function(value){
  if(value) {
    systemSelectedStr = "clickInteraction";
    resetScene();
    clickInteractionInit(scene, guiControls.number);
    arrows.forEach(function(e) {
      e.style.display = "block";
    })

    guiControls.linearAnimation = false;
    guiControls.cubeFractal = false;
    guiControls.scrollInteraction = false;
  }else {
    systemSelectedStr = "";
    resetScene();
  }
})

typeOfVis.add(guiControls, "scrollInteraction").listen().onChange(function(value){
  if(value) {
    systemSelectedStr = "scrollInteraction";
    guiControls.linearAnimation = false;
    guiControls.cubeFractal = false;
    guiControls.clickInteraction = false;
  }else {
    systemSelectedStr = "";
  }
})

datGUI.add(guiControls, 'speed', 1, 10, 1);

datGUI.add(guiControls, 'number').min(0).step(1).onChange(function(value) {

  // header.innerHTML = value;
  // number = value;
  numberHeader.innerHTML = value;

})



