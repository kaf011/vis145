// Demonstration of multiple force acting on
// bodies (Mover class)
// Bodies experience gravity continuously
// Bodies experience fluid resistance when in "water"

// Five moving bodies
let movers = [];

// Liquid
let liquid;
var num;
let names = ["Abigail", "Amelia", "Charlotte", "Ethan", "Elijah", 'Liam', 'Declan', 'Jolene', 'Percy', 'Theodore', 'Emily', 'Olivia', 'George', 'Arlo', 'Ava', 'Daisy', 'Chloe', 'Ella', 'Erin', 'Eve', 'Holly', 'Isla', 'Jack', 'Frank', 'Jasmine', 'Leo', 'Lily', 'Lucas', 'Luna', 'Mason', 'Oscar', 'Phoebe', 'Molly', 'Sienna', 'Toby', 'Sofia', 'Darla', 'Doris', 'Jane', 'Marian', 'Lulu', 'Kath', 'Herbert', 'Jade'];

function setup() {
  createCanvas(windowWidth, 2 * windowHeight / 3);
  reset();
  num = windowWidth / 680 * 9;
  // Create liquid object
  liquid = new Liquid(0, height / 2, width, height, 0.1);
}

function draw() {
  background(247, 244, 227);


  // Draw water
  liquid.display();

  for (let i = 0; i < movers.length; i++) {

    // Is the Mover in the liquid?
    if (liquid.contains(movers[i])) {
      // Calculate drag force
      let dragForce = liquid.calculateDrag(movers[i]);
      // Apply drag force to Mover
      movers[i].applyForce(dragForce);
    }

    // Gravity is scaled by mass here!
    let gravity = createVector(0, 0.1 * movers[i].mass);
    // Apply gravity
    movers[i].applyForce(gravity);

    // cursor hover
    var d = dist(movers[i].position.x, movers[i].position.y, mouseX, mouseY);
    if (d <= movers[i].mass * 16) {
      fill(movers[i].color.r, movers[i].color.g, movers[i].color.b);
      if (mouseIsPressed) {
        console.log(i);
        movers[i].position.x = mouseX;
        movers[i].position.y = mouseY;
        var str = 'Playing the scent by ' + movers[i].author + "...";
        $("p").html(str);
      }
    } else {
      fill(255, 127);
      // if (mouseIsPressed) {
      //   reset();
      // }
    }
    // Update and display
    movers[i].update();
    movers[i].display();
    movers[i].checkEdges();
  }

}

//
// function mousePressed() {
//   for (var i = 0; i < movers.length; i++) {
//     var d = dist(movers[i].position.x, movers[i].position.y, mouseX, mouseY);
//     if (d <= movers[i].mass * 16) {
//       console.log(i);
//       fill(movers[i].color.r, movers[i].color.g, movers[i].color.b);
//       movers[i].position.x = mouseX;
//       movers[i].position.y = mouseY;
//     } else {
//       console.log(movers[i].position.x, mouseX);
//       reset();
//     }
//
//   }
// }

function hover() {
  // for (let i = 0; i < num; i++) {
  //   var d = dist(mouseX, mouseY, movers[i].x, movers[i].y);
  //   if (d <= movers[i].mass * 16) {
  //     console.log(i);
  //   }
  //
  // }
}


// Restart all the Mover objects randomly
function reset() {
  num = windowWidth / 680 * 9;
  for (var i = 0; i < num; i++) {
    movers[i] = new Mover(random(0.5, 3), 40 + i * 70, 0);
  }
}

let Liquid = function(x, y, w, h, c) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.c = c;
};

// Is the Mover in the Liquid?
Liquid.prototype.contains = function(m) {
  let l = m.position;
  return l.x > this.x && l.x < this.x + this.w &&
    l.y > this.y && l.y < this.y + this.h;
};

// Calculate drag force
Liquid.prototype.calculateDrag = function(m) {
  // Magnitude is coefficient * speed squared
  let speed = m.velocity.mag();
  let dragMagnitude = this.c * speed * speed;

  // Direction is inverse of velocity
  let dragForce = m.velocity.copy();
  dragForce.mult(-1);

  // Scale according to magnitude
  // dragForce.setMag(dragMagnitude);
  dragForce.normalize();
  dragForce.mult(dragMagnitude);
  return dragForce;
};

Liquid.prototype.display = function() {
  noStroke();
  fill(193, 188, 168);
  rect(this.x, this.y, this.w, this.h);
};

function Mover(m, x, y) {
  this.mass = m;
  this.position = createVector(x, y);
  this.velocity = createVector(0, 0);
  this.acceleration = createVector(0, 0);
  this.color = {
    r: random(160, 255),
    g: random(160, 255),
    b: random(160, 255)
  }
  this.author = names[int(random(0, names.length))];
}

// Newton's 2nd law: F = M * A
// or A = F / M
Mover.prototype.applyForce = function(force) {
  let f = p5.Vector.div(force, this.mass);
  this.acceleration.add(f);
};

Mover.prototype.update = function() {
  // Velocity changes according to acceleration
  this.velocity.add(this.acceleration);
  // position changes by velocity
  this.position.add(this.velocity);
  // We must clear acceleration each frame
  this.acceleration.mult(0);
};

Mover.prototype.display = function() {
  // stroke(0);
  // strokeWeight(2);
  noStroke();

  ellipse(this.position.x, this.position.y, this.mass * 16, this.mass * 16);
};

// Bounce off bottom of window
Mover.prototype.checkEdges = function() {
  if (this.position.y > (height - this.mass * 8)) {
    // A little dampening when hitting the bottom
    this.velocity.y *= -0.9;
    this.position.y = (height - this.mass * 8);
  }
};


var reloadButton = document.getElementById('reload');
reloadButton.addEventListener('click', function() {
  // $("h3").html("Smell More...");
  reset();
  $("p").html("");
});