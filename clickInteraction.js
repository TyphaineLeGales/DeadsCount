var texCube = new THREE.TextureLoader().load( '../Assets/matCap4.jpg' );
var geo = new THREE.BoxGeometry(1, 1, 1);
var _cubeGroup = new THREE.Object3D();
var _posCubeGroup = new THREE.Vector3(2, -1, -19);
var _cubesArray = [];

var _animNext = false;
var _animPrev = false;

var _animTimer = 0;
var _cubeGroup = new THREE.Object3D();
var _cubesArray = [];
var currIndex = 0;
var _offsetPositionStart = -13;
var _animationCubeTime = 2;
var _XposAnim = 10;
var _count = 0;
var _t = 0;

var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

window.addEventListener("mousemove", (event) => {
  onDocumentMouseMove(event);
});

function clickInteractionInit(scene,number) {
  var str = number.toString();
  generateCubes(scene, str);

}

function clickInteractionRender(dt, scene, camera, number, speed, count) {

  if(_animNext === true && _animPrev === false) {
    animNavNext(dt, speed, count);
  }

  if(_animPrev === true && _animNext === false ) {
    animNavPrev(dt, speed, count);
  }

  _cubeGroup.rotation.x = mouseX* .0003;
  _cubeGroup.rotation.y = ( - mouseY * .0003)-20;
}

function generateCubes (scene,str) {

  var length = str.length;
  var spacing = 2;
  var scaleY = 10;
  var unit = Math.pow(10, length-1);
  for(var i =0; i < length; i++) {
    var currNum = parseInt(str[i]);
    for(var j = 0; j < currNum; j++) {
      var mat = new THREE.MeshMatcapMaterial({matcap:texCube, transparent: true});
      mat.needsUpdate = true;
      var mesh = new THREE.Mesh(geo, mat);
      mesh.userData.unit = unit;
      scaleY = length-i;
      mesh.scale.y = scaleY;
      _cubeGroup.add(mesh);
      mesh.position.set(i*spacing, scaleY/2, j*spacing);
      mesh.userData.initialXPos = i*spacing;
      _cubesArray.push(mesh);
    }

    scene.add(_cubeGroup);
    unit *= 0.1;
  }
  currIndex = _cubesArray.length-1;

  _cubeGroup.position.copy(_posCubeGroup);
  _cubeGroup.rotation.y = -20;

}

function updateGridOfCubes(scene, str, count) {

  deleteCubes();
  generateCubes(scene, str);
  currIndex = _cubesArray.length-1;
  _count = 0;
  count.innerHTML = _count;
}

function deleteCubes() {
  _cubesArray = [];
 _cubeGroup.children = [];

}

function animNavNext (dt, speed, count) {
  _t += dt;
   var currUnit = _cubesArray[currIndex];
    _animTimer = _t*speed;
    currUnit.position.x = mapRange(_animTimer, 0, _animationCubeTime, currUnit.userData.initialXPos,currUnit.userData.initialXPos+_XposAnim);
    currUnit.material.opacity = mapRange(_animTimer, 0, _animationCubeTime, 1, 0 );

    if(_animTimer >_animationCubeTime) {
      _animNext = false;
      _animTimer = 0;
      _t = 0;
      _count += _cubesArray[currIndex].userData.unit;
      count.innerHTML = _count;
      currIndex -= 1;
    }
}

function animNavPrev(dt, speed, count) {
  _t += dt;
   var currUnit = _cubesArray[currIndex];
    _animTimer =_t*speed;
    currUnit.position.x = mapRange(_animTimer, 0, _animationCubeTime ,currUnit.userData.initialXPos+_XposAnim, currUnit.userData.initialXPos);
    currUnit.material.opacity = mapRange(_animTimer, 0, _animationCubeTime, 0, 1 );

    if(_animTimer > _animationCubeTime) {
      _animPrev = false;
      _animTimer = 0;
      _t = 0;
      _count -= _cubesArray[currIndex].userData.unit;
      count.innerHTML = _count;
    }
}


function next () {
  if(_animNext === false && _animPrev === false) {
    if(currIndex >= 0) {
      _animNext = true;
    }
  }
}

function prev () {

  if(_animNext === false && _animPrev === false) {
    if(currIndex <_cubesArray.length-1) {
      currIndex += 1;
      _animPrev = true;
    }
  }
}

function onDocumentMouseMove( event ) {
    mouseX = ( event.clientX - windowHalfX );
    mouseY = ( event.clientY - windowHalfY );
}
