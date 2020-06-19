var texCube = new THREE.TextureLoader().load( '../Assets/matCap4.jpg' );
var geo = new THREE.BoxGeometry(1, 1, 1);
var _cubeGroup = new THREE.Object3D();
var _posCubeGroup = new THREE.Vector3(2, -1, -19);
var _cubesArray = [];

function clickInteractionInit(scene,number) {
  var str = number.toString();
  // console.log(str);
  generateCubes(scene, str);

}

function clickInteractionRender() {

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
