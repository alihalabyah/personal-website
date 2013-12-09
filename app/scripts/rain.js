var rain = [],
    droplets = [];

window.requestAnimationFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };

var canvas = document.getElementById('rain'),
    context = canvas.getContext('2d');
    canvas.height = 450,
    canvas.width = 750;

var probabilityOfRain = 0.5,
    dropWidth = 1,
    forces = {
      gravity: 0.5,
      wind: 0.3
    };

/**
*
* Vector class
*
**/
var Vector = function (x, y) {
  if(!(this instanceof Vector)) return new Vector(x, y);

  this.x = x || 0;
  this.y = y || 0;
};

Vector.prototype.add = function (vector) {
  this.x += vector.x;
  this.y += vector.y;

  return this;
};

Vector.prototype.clone = function() {
  return new Vector(this.x, this.y);
}

/**
*
* Rain class
*
**/
var Rain = function () {
  if(!(this instanceof Rain)) return new Rain();

  this.position = new Vector(Math.random () * canvas.width, 0);
  this.velocity = new Vector();
  this.previous = this.position;
};

Rain.prototype.update = function () {
  this.velocity.y += forces.gravity;
  this.velocity.x += forces.wind;

  this.previous = this.position.clone();
  this.position.add(this.velocity);
};

Rain.prototype.draw = function () {
  // switch context to the path
  context.beginPath();
  context.moveTo(this.position.x, this.position.y);
  context.lineTo(this.previous.x, this.previous.y);
  context.stroke();
}

/**
*
* Droplet Class
*
**/

var Droplet = function (x, y) {
  if(!(this instanceof Droplet)) return new Droplet(x, y);

  // we want an arc motion to simulate contact with the ground
  var bounce = Math.random() * 20, // Math.ceil(Math.random() * 10),
      angle = Math.PI + Math.random() * Math.PI; // Math.random() * (2 * Math.PI);

  this.position = new Vector(x, y);
  this.velocity = new Vector(Math.cos(angle) * (bounce / 2), Math.sin(angle) * bounce);
}

Droplet.prototype.update = function () {
  this.velocity.y += forces.gravity;

  this.velocity.y *= 0.9;
  this.velocity.x *= 0.9;

  this.position.add(this.velocity);
}

Droplet.prototype.draw = function () {
  context.beginPath();
  context.arc(this.position.x, this.position.y, 1, 0, 2 * Math.PI);
  context.fill();
}

/**
*
* General Update
*
**/
var update = function () {
  var counter,
      raindrop,
      numDrops;

  // clear the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  counter = rain.length;
  // redraw or remove rain objects..
  while (counter--) {
    // get the Rain object from list
    raindrop = rain[counter];
    raindrop.update();

    if (raindrop.position.y > canvas.height) {
      // we want between 3 and 7 droplets per raindrop..
      numDrops = Math.ceil(Math.random() * (7 - 3 + 1) + 3);

      while (numDrops--) {
        droplets.push(new Droplet(raindrop.position.x, canvas.height));
      }

      // the raindrop is no longer visible so remove from the list
      rain.splice(counter, 1);
    }

    raindrop.draw();

  }

  // redraw or remove droplets..
  counter = droplets.length;
  while (counter--) {
    // fetch the droplet
    var droplet = droplets[counter];
    droplet.update();
    droplet.draw();

    if (droplet.position.y > canvas.height) droplets.splice(counter, 1);
  }

  // keep drawing more rain..
  if(Math.random() < probabilityOfRain) rain.push(new Rain());

  // keep animating
  requestAnimationFrame(update);
}

var init = function (){
  context.lineWidth = dropWidth;
  context.fillStyle = 'rgba(0,0,0,1)';
  context.strokeStyle = 'rgba(0,0,0,1)';

  update();
}

init();



