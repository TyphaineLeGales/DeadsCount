let number = 0;
let systemSelectedStr = "";
const countDiv = document.querySelector('h1.count');
const progressBar = document.getElementById('progress');
var arrows = document.querySelectorAll('button.arrow');
var scrollContainer = document.getElementById('scrollableContainer');
var GUIContainer = document.getElementById('guiContainer');
scrollContainer.addEventListener('scroll', onContainerScroll, false);
var about = document.querySelector('p.about');
let _maxScroll;
let orbitControlIsEnabled = false;

let _unitArray = [];
var clock = new THREE.Clock(); //units a second
var dt = 0;

const _OPACITYTHRESHOLDIN = 0.1;
const _OPACITYTHRESHOLDOUT = 0.9;

var scene, camera, controls, renderer ;

window.addEventListener( 'resize', onWindowResize, false );
window.addEventListener("DOMContentLoaded", (event) => {
  init();
  render();
});

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000 );
  scene.add(camera);
  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enabled = false;
  document.body.appendChild( renderer.domElement );
  var backgroundTexBlack = new THREE.TextureLoader().load( 'Assets/gradientB&W.jpg' );
  scene.background = backgroundTexBlack;
  scrollContainer.style.display="none";
}


function render () {

  dt = clock.getDelta();
  if(systemSelectedStr != "") {
    if(systemSelectedStr === "linearAnimation") {
      linearAnimationRender(dt, scene, camera, guiControls.number, guiControls.speed, progressBar, countDiv);
    } else if(systemSelectedStr === "clickInteraction") {
      clickInteractionRender(dt, scene, camera, guiControls.number, guiControls.speed, countDiv);
    } else if(systemSelectedStr === "scrollInteraction") {
      scrollInteractionRender(guiControls.number, countDiv);
    } else if(systemSelectedStr === "cubeFractal") {
      cubeFractalRender(guiControls.speed, countDiv);
    }
    //text
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
      scene.children[i].children = [];
      scene.remove(scene.children[i]);
    }
  }

  camera.position.set(0,0,0);
  camera.rotation.set(0, 0,0);
  controls.enabled = false;
  countDiv.innerHTML = 0;
  _unitArray = [];

  var progress = document.querySelectorAll('div.progressBar');
  progress.forEach(function(e){
      e.style.display = "none";
  } );

  arrows.forEach(function(e){
      e.style.display = "none";
  } );

  scrollContainer.style.display = "none";

}

//UI
var datGUI = new dat.GUI();
GUIContainer.appendChild(datGUI.domElement);
var guiControls = new function () {
  this.number = 593;
  this.linearAnimation = false;
  this.particlesScatter = false;
  this.cubeFractal = false;
  this.clickInteraction = false;
  this.scrollInteraction = false;
  this.speed = 0.1;
  this.showAbout = false;

}
var title = datGUI.addFolder("WHO'S COUNTING ?");
title.add(guiControls, 'number').min(0).step(1).onChange(function(value) {
    if(systemSelectedStr === "clickInteraction") {
      updateGridOfCubes(scene, value.toString(), countDiv);
      // console.log(value.toString())
    } else if (systemSelectedStr === "cubeFractal") {
      resetCubeFractal();
       cubeFractalInit(value);

    } else if(systemSelectedStr === "particlesScatter") {
      resetScene();
      controls.enabled = true;
      particleScatterReset(value);
    } else if(systemSelectedStr === "linearAnimation") {
      resetScene();
      var progress = document.querySelectorAll('div.progressBar');
      progress.forEach(function(e){
      e.style.display = "block";
    } );
      linearAnimationInit();

    }
})


var typeOfVis = title.addFolder('Type Of Visualization');


typeOfVis.add(guiControls, "linearAnimation").listen().onChange(function(value){

 var progress = document.querySelectorAll('div.progressBar');

  if(value) {
    systemSelectedStr = "linearAnimation";
    resetScene();
    linearAnimationInit();
    progress.forEach(function(e){
      e.style.display = "block";
    } );

    guiControls.particlesScatter = false;
    guiControls.cubeFractal = false;
    guiControls.clickInteraction = false;
    guiControls.scrollInteraction = false;
  } else {
    systemSelectedStr = "";
    resetScene();
    //porgress bar display none
  }
})

typeOfVis.add(guiControls, "particlesScatter").listen().onChange(function(value) {
  if(value) {
    systemSelectedStr = "particlesScatter";
    resetScene();
    controls.enabled = true;
    countDiv.innerHTML = guiControls.number;
    particleScatterInit(guiControls.number);

    guiControls.cubeFractal = false;
    guiControls.linearAnimation = false;
    guiControls.clickInteraction = false;
    guiControls.scrollInteraction = false;
  } else {
    controls.enabled = false;
    resetScene();
    systemSelectedStr = "";
  }

})

typeOfVis.add(guiControls, "cubeFractal").listen().onChange(function(value){
  if(value) {
    systemSelectedStr = "cubeFractal";
    guiControls.particlesScatter = false;
    guiControls.linearAnimation = false;
    guiControls.clickInteraction = false;
    guiControls.scrollInteraction = false;
    resetCubeFractal();
    resetScene();
    controls.enabled = true;
    cubeFractalInit(guiControls.number);
  }else {

    controls.enabled = false;
    resetCubeFractal(value);
    resetScene();
    systemSelectedStr = "";
  }
})

typeOfVis.add(guiControls, "clickInteraction").listen().onChange(function(value){
  if(value) {
    guiControls.particlesScatter = false;
    guiControls.linearAnimation = false;
    guiControls.cubeFractal = false;
    guiControls.scrollInteraction = false;
    systemSelectedStr = "clickInteraction";
    resetScene();
    resetCountClickInteraction();
    clickInteractionInit(scene, guiControls.number);
    arrows.forEach(function(e) {
      e.style.display = "block";
    })

  }else {
    systemSelectedStr = "";
    resetScene();
  }
})

typeOfVis.add(guiControls, "scrollInteraction").listen().onChange(function(value){
  if(value) {
    systemSelectedStr = "scrollInteraction";
    resetScene();
    scrollInteractionResetSpline();
    scrollContainer.style.display = "block";
    _maxScroll = (scrollContainer.scrollHeight-scrollContainer.offsetHeight);
    scrollInteractionInit(camera, scrollContainer);

    guiControls.particlesScatter = false;
    guiControls.linearAnimation = false;
    guiControls.cubeFractal = false;
    guiControls.clickInteraction = false;
  }else {
    systemSelectedStr = "";
    resetScene();
    scrollInteractionResetSpline();
    scrollContainer.style.display = "none";
  }
})

typeOfVis.open();

var animSpeed = title.addFolder('Animation Speed');
animSpeed.add(guiControls, 'speed', 0.1, 20, 0.1);
animSpeed.open();

var about = title.addFolder('Project Story');
about.add(guiControls, 'showAbout').onChange(function(value) {
  if(value) {
    // about.style.
  }
});

about.open();





