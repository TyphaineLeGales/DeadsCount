var _splinePoints = [-71.12163543701172,5.02753353118896,-92.73057556152344,
-57.63454818725586,5.46526622772217,-103.41516876220703,
-44.14746475219727,5.90299892425537,-114.09976196289062,
-30.85867881774902,6.43158388137817,-125.01026153564453,
-18.26026344299316,7.27646923065186,-136.70726013183594,
-5.66184854507446,8.1213550567627,-148.40425109863281,
6.93656635284424,8.96623992919922,-160.10124206542969,
19.53498077392578,9.81112575531006,-171.79824829101562,
32.13339614868164,10.65601062774658,-183.4952392578125,
43.89553833007812,11.8939790725708,-195.97969055175781,
55.36755752563477,13.26831817626953,-208.73735046386719,
66.83957672119141,14.64265632629395,-221.4949951171875,
78.08285522460938,16.11579132080078,-234.42544555664062,
88.14347839355469,18.09972381591797,-248.2493896484375,
98.14423370361328,20.10665321350098,-262.10797119140625,
106.44537353515625,22.76638793945312,-276.949462890625,
113.43633270263672,25.86625099182129,-292.3292236328125,
117.45195007324219,29.84817886352539,-308.53118896484375,
115.93793487548828,35.01448440551758,-324.7244873046875,
106.92606353759766,40.88778305053711,-337.88552856445312,
92.85060882568359,46.33066940307617,-345.95254516601562,
76.87869262695312,50.84041213989258,-350.44784545898438,
60.53459930419922,54.75594711303711,-354.07342529296875,
43.8389892578125,57.8859748840332,-356.81463623046875,
26.8155517578125,59.88905334472656,-358.37786865234375,
9.71811389923096,61.33060073852539,-359.42300415039062,
-7.47487592697144,62.04703521728516,-359.79904174804688,
-24.66872406005859,61.63607025146484,-359.36148071289062,
-41.85690307617188,61.00577545166016,-358.79217529296875,
-58.92237854003906,58.99988174438477,-357.79238891601562,
-75.98785400390625,56.99398803710938,-356.79257202148438,
-92.9337158203125,54.08856964111328,-356.26556396484375,
-109.77952575683594,50.63924026489258,-356.37896728515625,
-126.28607940673828,46.50578689575195,-358.67010498046875,
-141.01034545898438,42.19512557983398,-366.04934692382812,
-148.53195190429688,39.77813720703125,-380.9512939453125,
-147.17204284667969,40.41795349121094,-397.84793090820312,
-137.26625061035156,44.01903915405273,-411.23016357421875,
-123.91019439697266,48.81230163574219,-420.8692626953125,
-109.33174133300781,54.04507064819336,-428.33169555664062,
-94.24299621582031,59.47858428955078,-434.58151245117188,
-79.08060455322266,65.03131103515625,-440.53121948242188,
-63.83505630493164,70.71865081787109,-446.14199829101562,
-48.58950805664062,76.40599060058594,-451.7528076171875,
-33.34395980834961,82.09333038330078,-457.36358642578125,
-18.09841346740723,87.78067016601562,-462.97439575195312,
-2.85286402702332,93.46800994873047,-468.58517456054688,
11.83425521850586,99.17920684814453,-475.41650390625,
25.67309379577637,104.85101318359375,-483.89498901367188,
37.62512588500977,110.19422149658203,-494.98593139648438,
45.79697418212891,114.61344146728516,-509.30001831054688,
46.72544097900391,116.82493591308594,-526.1802978515625,
41.90700912475586,117.43695068359375,-542.67449951171875,
36.01383972167969,118.427734375,-558.7930908203125,
27.16994094848633,121.29772186279297,-573.1357421875,
13.83610343933105,128.72129821777344,-572.71551513671875,
6.53896760940552,134.75184631347656,-558.4759521484375];

let _unitConvert = 0.01;
var _splinePath;
var _splineObj;
var curve;
let _heightOffsetCurve = 0.45;
let _unitArray = [];
const _MAXOBJ = 10;
const _OPACITYTHRESHOLDIN = 0.1;
const _OPACITYTHRESHOLDOUT = 0.9;
const _ADD_OFFSET = 10;
let objectCounter = _MAXOBJ;
let _globalScrollAmount = 0;
var _prevOffsetTop = 0;
var _currOffsetTop = 0;
let _loopCounter = 0;
let _maxLoop = 5;
let _prevF =0;
let _currT =0;
let totalCount = 0;
let _speed = 2;
var model;
var _maxCount = 593;
var progress = document.getElementById('progress');
var _progressWidth;
let scrollContainer = document.getElementById('scrollableContainer');
scrollContainer.addEventListener('scroll', onContainerScroll, false);
let _maxScroll = (scrollContainer.scrollHeight-scrollContainer.offsetHeight);
let _f;
var _straightPath = [];
var numberHeader = document.querySelector('h1.numberHeader');

scrollContainer.addEventListener('scroll', onContainerScroll, false);

let numberContainer = document.querySelector('h1.countScroll');

//basic THREEJS Setup
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000 );
scene.add(camera);
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//Camera
controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.campingFactor = 0.25;
controls.enableZoom = true;
camera.position.x = -1.2;
camera.position.y = 2.3;
camera.position.z = 7.3;
camera.rotation.x = -18.175*_unitConvert;
camera.rotation.y = -13.189*_unitConvert;

//time
var clock = new THREE.Clock(); //units a second
var dt = 0;
var t;

//UI
var datGUI = new dat.GUI();
var guiControls = new function () {
  this.hideSpline = false;
  this.speed = 1;
  this.cameraPosX = camera.position.x;
  this.cameraPosY = camera.position.y;
  this.cameraPosZ = camera.position.z;
  this.cameraRX = camera.rotation.x;
  this.cameraRY = camera.rotation.y;
  this.cameraRZ = camera.rotation.z;
  this.number = 0;
}

datGUI.add(guiControls, 'hideSpline').onChange(function(value) {
  _splineObj.visible = value;
})

// datGUI.add(guiControls, 'lineThickness', 1, 10);
datGUI.add(guiControls, 'speed', 1, 10, 1);

datGUI.add(guiControls, 'number').step(1).onChange(function(value) {

  // header.innerHTML = value;
  _maxCount = value;
  numberHeader.innerHTML = value;
 reset();
})

var cameraPosition = datGUI.addFolder('CameraPos');

cameraPosition.add(guiControls, 'cameraPosX', -5, 5 ).onChange(function(value) {
  camera.position.x = value;
});
cameraPosition.add(guiControls, 'cameraPosY', -5, 5 ).onChange(function(value) {
  camera.position.y = value;
});
cameraPosition.add(guiControls, 'cameraPosZ', -5, 10 ).onChange(function(value) {
  camera.position.z = value;
});

cameraPosition.close();
var rotationFolder = datGUI.addFolder('CameraRotation');
rotationFolder.add(guiControls, 'cameraRX', -5, 5 ).onChange(function(value) {
  camera.rotation.x = value;
});
rotationFolder.add(guiControls, 'cameraRY', -5, 5 ).onChange(function(value) {
  camera.rotation.y = value;
});
rotationFolder.add(guiControls, 'cameraRZ', -5, 10 ).onChange(function(value) {
  camera.rotation.z = value;
});

rotationFolder.close();

//MATCAP
var testMat = new THREE.MeshNormalMaterial();
var texture = new THREE.TextureLoader().load( '../Assets/matCapTest.jpg' );

var testMat2 = new THREE.MeshNormalMaterial();
var texture2 = new THREE.TextureLoader().load( '../Assets/matCap4.jpg' );
var testMatcap2 = new THREE.MeshMatcapMaterial({matcap:texture2});
var matcapModel= new THREE.MeshMatcapMaterial({matcap:texture2});

//Background
var backgroundTexSky = new THREE.TextureLoader().load( '../Assets/skyTest2.jpg' );
var backgroundTexBlack = new THREE.TextureLoader().load( '../Assets/gradientB&W.jpg' );
scene.background = backgroundTexBlack;

var circleGeo = new THREE.CircleGeometry(0.2, 32);

window.addEventListener("DOMContentLoaded", (event) => {
  init();
  render();
});

window.addEventListener( 'resize', onWindowResize, false );


function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function onContainerScroll() {
  respawn();

  _currOffsetTop = scrollContainer.scrollTop;
  if(_currOffsetTop >= _prevOffsetTop) {
    for(var i = 0; i<_MAXOBJ; i++) {
      var obj = _unitArray[i];
      //update count when object respawn
      if(obj.userData.f< obj.userData.prevF) {
        totalCount += 1;
         _progressWidth = mapRange(totalCount, 0,_maxCount, 0, 50);
         progress.style.width = _progressWidth + "%";
      }
      obj.userData.prevF = obj.userData.f;
    }
  }


   _prevOffsetTop = _currOffsetTop;
  numberContainer.innerHTML = totalCount;

  // prevOffsetTop = 0;
  // currOffsetTop = scrollContainer.scrollTop;
  // _globalScrollAmount += (currOffsetTop - prevOffsetTop) + _loopCounter*_maxScroll ;
  // prevOffsetTop = currOffsetTop;

}


function init() {
  convertScale(_splinePoints);
  flipZ(_splinePoints);
  _splinePath = new Spline(_splinePoints);
  makeSplineCurve(_splinePoints);
  createObj();
  // loadModel();
}


function render () {
  requestAnimationFrame( render );
  if(totalCount < _maxCount) {

    _f = clamp(mapRange(scrollContainer.scrollTop, 0, _maxScroll,0,  1), 0, 1);

    for(var i = 0; i<_unitArray.length; i++) {
      var obj = _unitArray[i];
      // console.log(_f);
      obj.userData.f = ((_f*guiControls.speed+_loopCounter - obj.userData.offset))%1;
      _splinePath.setObjectPath(obj, obj.userData.f);
      opacityEase(obj.userData.f, obj);

      if(obj.userData.f === -_splinePoints[_splinePoints.length-1]*_unitConvert) {
        obj.userData.number += 1;
      }
    }
  }

  renderer.render( scene, camera );
};

function reset () {

  for(var i = 0; i<_unitArray.length; i++) {
    var obj = _unitArray[i];
    obj.userData.offset = i*0.1;
    obj.userData.f = 0;
    obj.userData.number = i;
    obj.userData.prevF = 0;
  }

  totalCount = 0;

  scrollContainer.scrollTop = 0;

}

function createObj() {
 for(var i = 0; i<_MAXOBJ; i++) {
  var matcap = new THREE.MeshMatcapMaterial({matcap:texture, transparent: true});
  matcap.needsUpdate = true;
  matcap.opacity = 0;
  var startPos = new THREE.Vector3(_splinePoints[0], _splinePoints[1], _splinePoints[2]);
  var obj = new THREE.Mesh(new THREE.CubeGeometry( 0.5, 0.5, 0.5),matcap);

  // var obj = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 2), personMat);
  obj.userData.offset = i*0.1;
  obj.userData.f = 0;
  obj.userData.number = i;
  obj.userData.prevF = 0;
  obj.position.copy(startPos);
  scene.add(obj);
  _unitArray.push(obj);

  }
}


function instanceObjAlongSpline () {
var _geo = new THREE.SphereGeometry( 0.03, 8, 8);
var _mat = new THREE.MeshBasicMaterial({color:0xffffff});

  for(var i = 0; i < _splinePoints.length-3; i+=3) {
    var instance = new THREE.Mesh(_geo, _mat);
    instance.position.x = _splinePoints[i];
    instance.position.y = _splinePoints[i+1];
    instance.position.z = _splinePoints[i+2];
    var nextPoint = new THREE.Vector3(_splinePoints[i+3], _splinePoints[i+4], _splinePoints[i+5]);
    instance.lookAt(nextPoint);
    scene.add(instance);
  }
}

function loadModel() {

 var objLoader = new THREE.OBJLoader();
        // objLoader.setMaterials(materials);
  objLoader.setPath('Assets/');
  objLoader.load('Corpse.obj', function(object){
  object.position.z =0;
  object.scale.set(1*_unitConvert,1*_unitConvert,1*_unitConvert);
  object.traverse( function ( child ) {
    if ( child instanceof THREE.Mesh ) {
      child.material = matcapModel;
    }

  } );
  model = object;
  scene.add(model);
});

}

function makeSplineCurve (array) {
  var vec3array = [];

  for(var i = 0; i < array.length; i+= 3) {
    var vecPos = new THREE.Vector3(array[i], array[i+1]-_heightOffsetCurve, array[i+2]);
    vec3array.push(vecPos);
  }
  var path = new THREE.CatmullRomCurve3( vec3array );
  var tubeGeometry = new THREE.TubeGeometry( path, 256, 0.2, 5, false );
  _splineObj = new THREE.Mesh( tubeGeometry, testMatcap2 );
  scene.add( _splineObj);

}

function respawn() {

  if(_f > 0.9){
    scrollContainer.scrollTop = 0;
    _loopCounter += 1;
  }
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

function makeLineSpline (array) {

  var vertices = new Float32Array(_splinePoints);
  var geometry = new THREE.BufferGeometry();
  geometry.addAttribute( "position", new THREE.BufferAttribute( vertices, 3 ) );
  var material = new THREE.LineBasicMaterial( { color : 0xff0000} );
  material.needsUpdate = true;
  curve = new THREE.Line( geometry, material );

  scene.add(curve);
}

function convertScale (array) {
    for(let i=0; i< array.length; i++) {
       array[i] *= _unitConvert;
    }
}

function flipZ (array) {
    for(let i=2; i< array.length; i+=3) {
       array[i] = - array[i];
    }
}

function easePath(t) {
    let easedT = t % guiControls.speed;
    easedT = 0.5 + Math.cos(Math.pow(Math.exp(-easedT), 4) * Math.PI) * 0.5;
    return easedT
}

function mapRange(value, a, b, c, d) {
  value = (value - a) / (b - a);
  return c + value*(d-c);
}

function  clamp ( value, min, max ) {

  return Math.max( min, Math.min( max, value ) );

}

