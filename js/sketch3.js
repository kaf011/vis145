var movers = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  // num = windowWidth / 680 * 9;
  for (var i = 0; i < 20; i++) {
    movers[i] = new Mover(random(3, 10), random(10, windowWidth), random(10, windowHeight));
  }
}


function draw() {
  background(247, 244, 227);
  for (var i = 0; i < 20; i++) {
    // cursor hover
    var d = dist(movers[i].position.x, movers[i].position.y, mouseX, mouseY);
    if (d <= movers[i].mass * 16) {
      fill(movers[i].color.r, movers[i].color.g, movers[i].color.b);
      movers[i].position.x += random(-5, 5);
      movers[i].position.y += random(-5, 5);
      if (mouseIsPressed) {
        movers[i].position.x = mouseX;
        movers[i].position.y = mouseY;
        var mm = int(random(1, 13));
        var dd = int(random(1, 28));
        var yy = int(random(2021, 2100));
        var str = 'Playing the scent created on ' + mm + "/" + dd + "/" + yy + "...";
        $("p").html(str);
      }
    } else {
      fill(193, 188, 168, 127);
      // if (mouseIsPressed) {
      //   reset();
      // }
    }
    // Update and display

    movers[i].display();
  }

}



function Mover(m, x, y) {
  this.mass = m;
  this.position = createVector(x, y);
  this.color = {
    r: random(150, 255),
    g: random(150, 255),
    b: random(150, 255)
  }
  // this.author = names[int(random(0, names.length))];
}

Mover.prototype.display = function() {
  // stroke(0);
  // strokeWeight(2);
  noStroke();

  ellipse(this.position.x, this.position.y, this.mass * 16, this.mass * 16);
};

var toggleClicked = 0;

var recordButton = document.getElementById('record');
recordButton.addEventListener('click', function() {
  if (toggleClicked == 0) {

    $("h3").html("Recording...");

    $(".record").text("End");
    toggleClicked = 1;
  } else if (toggleClicked == 1) {
    $("h3").html("Your smell has been archived.");
    $(".record").text("Post your smell to Scent Pool");
    toggleClicked = 2;
  } else {
    $("h3").html("Done!");
    $(".record").text("Record New Smell");
    toggleClicked = 0;
  }


  $("p").html(" ");
});