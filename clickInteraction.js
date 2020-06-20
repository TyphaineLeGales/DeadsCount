
var geo = new THREE.BoxGeometry(1, 1, 1);
var _posCubeGroup = new THREE.Vector3(5, -1, -25);

var _animNext = false;
var _animPrev = false;

var _animTimer = 0;
var _cubeGroupClickInteraction = new THREE.Object3D();
var _cubesArrayClickInteraction = [];
var currIndex = 0;
var _offsetPositionStart = -13;
var _animationCubeTime = 2;
var _XposAnim = 10;
var _count = 0;
var _t = 0;
var texCube = new THREE.TextureLoader().load( 'Assets/matCap4.jpg' );

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

  _cubeGroupClickInteraction.rotation.x = mouseX* .0003;
  _cubeGroupClickInteraction.rotation.y = ( - mouseY * .0003)-20;

  console.log(mouseX, mouseY);

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
      _cubeGroupClickInteraction.add(mesh);
      mesh.position.set(i*spacing, scaleY/2, j*spacing);
      mesh.userData.initialXPos = i*spacing;
      _cubesArrayClickInteraction.push(mesh);
    }

    scene.add(_cubeGroupClickInteraction);
    unit *= 0.1;
  }
  currIndex = _cubesArrayClickInteraction.length-1;

  _cubeGroupClickInteraction.position.copy(_posCubeGroup);
  _cubeGroupClickInteraction.rotation.y = -20;

}

function updateGridOfCubes(scene, str, count) {

  deleteCubes();
  generateCubes(scene, str);
  currIndex = _cubesArrayClickInteraction.length-1;
  _count = 0;
  count.innerHTML = _count;
}

function resetCountClickInteraction () {
  currIndex = _cubesArrayClickInteraction.length-1;
  _count = 0;
  count.innerHTML = _count;
}

function deleteCubes() {
  _cubesArrayClickInteraction = [];
 _cubeGroupClickInteraction.children = [];

}

function animNavNext (dt, speed, count) {
  _t += dt;
   var currUnit = _cubesArrayClickInteraction[currIndex];
    _animTimer = _t*speed;
    currUnit.position.x = mapRange(_animTimer, 0, _animationCubeTime, currUnit.userData.initialXPos,currUnit.userData.initialXPos+_XposAnim);
    currUnit.material.opacity = mapRange(_animTimer, 0, _animationCubeTime, 1, 0 );

    if(_animTimer >_animationCubeTime) {
      _animNext = false;
      _animTimer = 0;
      _t = 0;
      _count += _cubesArrayClickInteraction[currIndex].userData.unit;
      count.innerHTML = _count;
      currIndex -= 1;
    }
}

function animNavPrev(dt, speed, count) {
  _t += dt;
   var currUnit = _cubesArrayClickInteraction[currIndex];
    _animTimer =_t*speed;
    currUnit.position.x = mapRange(_animTimer, 0, _animationCubeTime ,currUnit.userData.initialXPos+_XposAnim, currUnit.userData.initialXPos);
    currUnit.material.opacity = mapRange(_animTimer, 0, _animationCubeTime, 0, 1 );

    if(_animTimer > _animationCubeTime) {
      _animPrev = false;
      _animTimer = 0;
      _t = 0;
      _count -= _cubesArrayClickInteraction[currIndex].userData.unit;
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
    if(currIndex <_cubesArrayClickInteraction.length-1) {
      currIndex += 1;
      _animPrev = true;
    }
  }
}

function onDocumentMouseMove( event ) {
    mouseX = ( event.clientX - windowHalfX );
    mouseY = ( event.clientY - windowHalfY );
}
