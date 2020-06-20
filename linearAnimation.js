const _MAXOBJ = 10;
var _straightPath = [];
let totalCount = 0;
var _progressWidth;
var _t = 0;
var startPos = new THREE.Vector3(-5, 0, 0);

function linearAnimationInit() {
  _unitArray = [];
  totalCount = 0;
  _t = 0;
  _f = 0;
  createObjCircle();
  straightPath();
  camera.position.y = 0.5;
  camera.position.z = 7.3;
}

function linearAnimationRender(dt, scene, camera, maxCount, speed, progressBar, count) {
  _t += dt;
  if(totalCount < maxCount) {
    _f = _t*speed;

    //progressBar
    _progressWidth = mapRange(totalCount, 0,maxCount, 0, 50);
    progressBar.style.width = _progressWidth + "%";

    for(var i = 0; i<_unitArray.length; i++) {
      var obj = _unitArray[i];
      obj.userData.f = ((_f + obj.userData.offset))%1;
      // _splinePathLinear.setObjectPath(obj, obj.userData.f);
      obj.position.x = mapRange(obj.userData.f, 0,1, -5, 5);
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

function createObjCircle() {
 for(var i = 0; i<_MAXOBJ; i++) {
  var redMat = new THREE.MeshBasicMaterial({color:0xff0000, transparent:true});
  redMat.needsUpdate = true;
  redMat.opacity = 0;
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

