// creating a Vehicle object => OOP

function Vehicle(x, y) {
  this.pos = createVector(random(width), random(height));
  this.target = createVector(x, y);
  this.vel = p5.Vector.random2D();
  this.acc = createVector();
  this.r = 5;
  this.maxspeed = 50;
  this.maxforce = 0.3;

  this.behaviours = function() {
    var arrive = this.arrive(this.target);
    this.applyForce(arrive);

    var mouse = createVector(mouseX, mouseY);
    var flee = this.flee(mouse);
    this.applyForce(flee);
  }

  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.update = function() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);
  }

  this.show = function() {
    stroke(255, 0, 0);
    strokeWeight(5);
    point(this.pos.x, this.pos.y);
  }

//creating a vector that points from the object location to the desired position
  // this.seek = function(target) {
  //   var desired = p5.Vector.sub(target, this.pos);
  //   desired.setMag(this.maxspeed);
  //   var steer = p5.Vector.sub(desired,this.vel);
  //   steer.limit(this.maxforce);
  //   return steer;
  // }
//Arrive rather than pure seek algorithm => we want the velocity to be relative
//to how far the vehicle is from the target. The further away, the faster it
//should go to reach the target and vice versa. The only variation between a seek
//and arrive method is the magnitude (= the distance of how far the vehicle is).
  this.arrive = function(target) {
    var desired = p5.Vector.sub(target, this.pos);
    var d = desired.mag();
    var speed = this.maxspeed;
    //This is the condition that creates the behaviour of the particles
    if(d<600) {
      speed = map(d, 0, 600, 0, this.maxspeed);
    }
    desired.setMag(speed);
    var steer = p5.Vector.sub(desired,this.vel);
    steer.limit(this.maxforce);
    return steer;
  }

  this.flee = function(target) {
    var desired = p5.Vector.sub(target, this.pos);
    var d = desired.mag();
    if (d<50) {
      desired.setMag(this.maxspeed);
      //changing the desired vector to the point in the opposite direction
      desired.mult(-1);
      var steer = p5.Vector.sub(desired,this.vel);
      steer.limit(this.maxforce);
      return steer;
    } else {
      return createVector(0,0);
    }
  }
}



