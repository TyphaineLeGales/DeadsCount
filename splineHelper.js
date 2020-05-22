let _fromVector = new THREE.Vector3();
let _toVector = new THREE.Vector3();
let _fromQuaternion = new THREE.Quaternion();
let _toQuaternion = new THREE.Quaternion();

function setPositionByFrame (vec3, array, f) {
    let arrayMax = array.length / 3 - 1;
    let _prevScene = math.clamp(Math.floor(f), 0 , arrayMax);
    let _nextScene = math.clamp(Math.ceil(f), 0 , arrayMax);
    let _sceneRatio = f % 1;

    _fromVector.fromArray(array, _prevScene * 3);
    _toVector.fromArray(array, _nextScene * 3);
    vec3.copy(_fromVector).lerp(_toVector, _sceneRatio);

}

function setQuaternionByFrame (quaternion, array, f) {
    let arrayMax = array.length / 4 - 1;
    let _prevScene = math.clamp(Math.floor(f), 0 , arrayMax);
    let _nextScene = math.clamp(Math.ceil(f), 0 , arrayMax);
    let _sceneRatio = f % 1;

    _fromQuaternion.fromArray(array, _prevScene * 4);
    _toQuaternion.fromArray(array, _nextScene * 4);
    quaternion.copy(_fromQuaternion).slerp(_toQuaternion, _sceneRatio);
}

function setPositionByTime (vec3, array, t) {
    let f = t * (array.length / 3 - 1);
    setPositionByFrame(vec3, array, f);
}

function setQuaternionByTime (vec3, array, t) {
    let f = t * (array.length / 4 - 1);
    setQuaternionByFrame(vec3, array, f);
}

function setPositionByFrameRange (vec3, array, low, up, r) {
    let f = low + (up - low) * r;
    setPositionByFrame(vec3, array, f);
}

function setQuaternionByFrameRange (quaternion, array, low, up, r) {
    let f = low + (up - low) * r;
    setQuaternionByFrame(quaternion, array, f);
}
