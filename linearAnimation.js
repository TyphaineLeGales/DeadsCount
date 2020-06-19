const _MAXOBJ = 10;
var _straightPath = [];
let totalCount = 0;
const _OPACITYTHRESHOLDIN = 0.1;
const _OPACITYTHRESHOLDOUT = 0.9;
var _progressWidth;

function linearAnimationInit() {

  createObj();
  straightPath();
  _splinePath = new Spline(_straightPath);
  camera.position.x = -1.2;
  camera.position.y = 2.3;
  camera.position.z = 7.3;
  camera.rotation.x = -18.175*0.01;
  camera.rotation.y = -13.189*0.01;
}

function linearAnimationRender(scene, camera, maxCount, speed, progressBar, count) {

  if(totalCount < maxCount) {
    _f = (dt*speed)%1;

    //progressBar
    _progressWidth = mapRange(totalCount, 0,maxCount, 0, 50);
    progressBar.style.width = _progressWidth + "%";

    for(var i = 0; i<_unitArray.length; i++) {
      var obj = _unitArray[i];
      obj.userData.f = ((_f + obj.userData.offset))%1;
      _splinePath.setObjectPath(obj, obj.userData.f);
      obj.lookAt(camera.position);
      opacityEase(obj.userData.f, obj);
      if(obj.userData.f< obj.userData.prevF ) {
        totalCount += 1;
      }
      obj.userData.prevF = obj.userData.f;
    }
  }
  count.innerHTML = totalCount;
}

function createObj() {
 for(var i = 0; i<_MAXOBJ; i++) {
  var redMat = new THREE.MeshBasicMaterial({color:0xff0000, transparent:true});
  redMat.needsUpdate = true;
  redMat.opacity = 0;
  var startPos = new THREE.Vector3(-5, 0, 0);
  var obj = new THREE.Mesh(new THREE.CircleGeometry(0.2, 32), redMat);
  obj.userData.offset = i*0.1;
  obj.userData.f = 0;
  obj.userData.number = i;
  obj.userData.prevF = 0;
  obj.position.copy(startPos);
  scene.add(obj);
  _unitArray.push(obj);

  }
}

function straightPath () {
  var vec3Array = [];
  for(var i = 0; i < 10; i++) {
    var point = new THREE.Vector3(i-5, 0, 0);
    _straightPath.push(i-5, 0, 0)
    vec3Array.push(point);
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

