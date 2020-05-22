class Spline {

  constructor(array) {
    this.rawArr = array;
    this.arr = [];
    this.length = 0;
    this.pointCount = array.length / 3;
    this.prevPos = new THREE.Vector3();
    this.nextPos = new THREE.Vector3();
    this.lookAtTarget = new THREE.Vector3();
    this.init();

  }
  init () {
      let length = 0;
      let prev;
      let curr;
      for( let i= 0, len = this.pointCount; i< len; i++ ) {
          let i3 = i * 3;
          prev = curr;
          curr = new THREE.Vector3(this.rawArr[i3], this.rawArr[i3+1], this.rawArr[i3 + 2]);
          this.arr.push(curr);
          if( i>0) {
              length += prev.distanceTo(curr);
          }
      }

      this.length = length;
  }

  setPositionByFrame (vec3, f) {

      let arrayMax = this.pointCount -1;
      let prev = this.clamp(Math.floor(f), 0, arrayMax);
      let next = this.clamp(Math.ceil(f), 0, arrayMax);
      let ratio = f % 1;
      vec3.copy(this.arr[prev]);
      vec3.lerp(this.arr[next], ratio);

  }

  setPositionByTime (vec3, t) {
      let f = t * (this.pointCount - 1);
      this.setPositionByFrame(vec3, f);
  }

  setObjectPath (object, t) {
      this.setPositionByTime(object.position, t);
      let prevTime = this.clamp(t - 1/this.pointCount, 0, 1);
      let nextTime = this.clamp(t + 1/this.pointCount, 0, 1);
      this.setPositionByTime(this.prevPos, prevTime);
      this.setPositionByTime(this.nextPos, nextTime);
      this.lookAtTarget.copy(this.nextPos).sub(this.prevPos).normalize().add(object.position);
      object.lookAt(this.lookAtTarget);
  }

  clamp ( value, min, max ) {

    return Math.max( min, Math.min( max, value ) );

  }

}


