var particles;


function particleScatterInit(number) {
  var geometry = new THREE.Geometry();
  geometry.verticesNeedUpdate = true;


  var distance = 100;
  camera.position.z = 700;

  for (var i = 0; i < number; i++) {

    var vertex = new THREE.Vector3();

    var theta = THREE.Math.randFloatSpread(360);
    var phi = THREE.Math.randFloatSpread(360);

    vertex.x = distance * Math.sin(theta) * Math.cos(phi);
    vertex.y = distance * Math.sin(theta) * Math.sin(phi);
    vertex.z = distance * Math.cos(theta);

    geometry.vertices.push(vertex);
  }


    particles = new THREE.Points(geometry, new THREE.PointsMaterial({color:0xff0000}));
    particles.boundingSphere = 50;
        //var particles = new THREE.Mesh(geometry, sphereMaterial);
    scene.add(particles);
}

function particleScatterReset (number) {
  scene.remove(particles);
  particleScatterInit(number);

}


// function particleScatterInit(number) {
//    camera.position.z = 150;

//   var sprite = new THREE.TextureLoader().load("Asset/circleSprite.png");

//   positions = new Float32Array( number * 3 );

//   for (var i = 0, i3=0; i < number; i++) {

//     var vertex = new THREE.Vector3();

//     var theta = THREE.Math.randFloatSpread(360);
//     var phi = THREE.Math.randFloatSpread(360);

//     positions[i3+0] = distance * Math.sin(theta) * Math.cos(phi);
//     positions[i3+1] = distance * Math.sin(theta) * Math.sin(phi);
//     positions[i3+2] = distance * Math.cos(theta);

//     geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
//     geometry.attributes.position.needsUpdate = true
//     i3+=3;
//   }
//   // material = new THREE.PointsMaterial({size: 35, map:sprite, transparency:true, alphaTest:0.5});
//   // material.needsUpdate = true;
//   material = new THREE.PointsMaterial({color: 0xff0000});
//   particles = new THREE.Points(geometry, material);
//   particles.boundingSphere = 30;
//         //var particles = new THREE.Mesh(geometry, sphereMaterial);
//   scene.add(particles);
// }

