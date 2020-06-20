var particles;
var geometry = new THREE.Geometry();
geometry.verticesNeedUpdate = true;
var distance = 30;

function particleScatterInit(number) {
   camera.position.z = 150;

        for (var i = 0; i < number; i++) {

            var vertex = new THREE.Vector3();

            var theta = THREE.Math.randFloatSpread(360);
            var phi = THREE.Math.randFloatSpread(360);

            vertex.x = distance * Math.sin(theta) * Math.cos(phi);
            vertex.y = distance * Math.sin(theta) * Math.sin(phi);
            vertex.z = distance * Math.cos(theta);

            geometry.vertices.push(vertex);
        }
        particles = new THREE.Points(geometry, new THREE.PointsMaterial({color: 0xff0000}));
        particles.boundingSphere = 30;
        //var particles = new THREE.Mesh(geometry, sphereMaterial);
        scene.add(particles);
}

function particleScatterReset (number) {
  geometry.vertices = [];
  for (var i = 0; i < number; i++) {

    var vertex = new THREE.Vector3();

    var theta = THREE.Math.randFloatSpread(360);
    var phi = THREE.Math.randFloatSpread(360);

    vertex.x = distance * Math.sin(theta) * Math.cos(phi);
    vertex.y = distance * Math.sin(theta) * Math.sin(phi);
    vertex.z = distance * Math.cos(theta);

    geometry.vertices.push(vertex);
  }

  geometry.verticesNeedUpdate = true;

}
