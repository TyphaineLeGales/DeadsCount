// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/QHEQuoIKgNE
let pg;
let c;

var circles;
let backgroundImg;

function preload() {
  img = loadImage('assets/laDefense.jpg');
}

function setup() {
  createCanvas(640, 360);
  circles = [];

  pg = createGraphics(900, 600);
  pg.background(0);
  pg.textFont('helvetica');
  pg.textSize(300);
  pg.fill(255);
  pg.text('239', 50, height/1.2);
  image(pg, 0, 0);
}

function draw() {
  frameRate(60);

  var total = 10;
  var count = 0;
  var attempts = 0;

  while (count < total) {
    var newC = newCircle();
    if (newC !== null) {
      circles.push(newC);
      count++;
    }
    attempts++;
    if (attempts > 500) {
      noLoop();
      console.log('finished');
      break;
    }
  }

  for (var i = 0; i < circles.length; i++) {
    var circle = circles[i];

    if (circle.growing) {
      if (circle.edges()) {
        circle.growing = false;
      } else {
        for (var j = 0; j < circles.length; j++) {
          var other = circles[j];
          if (circle !== other) {
            var d = dist(circle.x, circle.y, other.x, other.y);
            var distance = circle.r + other.r;
            if (d - 2 < distance) {
              circle.growing = false;
              break;
            }
          }
        }
      }
    }

    circle.show();
    circle.grow();
  }
}

function detectColor(pointX, pointY) {
  c = pg.get(pointX, pointY);
  //if color is white

  if(c[2] === 255) {
    return true;
  } else {
    return false;
  }
}

function newCircle() {
  var x = random(width);
  var y = random(height);
  state = detectColor(x, y);
  console.log(state);
  var valid = true;
    for (var i = 0; i < circles.length; i++) {
      var circle = circles[i];
      var d = dist(x, y, circle.x, circle.y);
      if (d < circle.r) {
        valid = false;
        break;
      }
    }
    if (valid && state === true) {
      return new Circle(x, y);
    } else {
      return null;
    }
}
