var rain = [],
    droplets = [],
    $container;

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
    canvas.height = window.innerHeight - 50,
    canvas.width = window.innerWidth;

var probabilityOfRain = 0.6,
    dropWidth = 1,
    forces = {
      gravity: 1.0,
      wind: 0.05
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

    if (droplet.position.y > canvas.height) {
      droplets.splice(counter, 1);
    }
  }

  // keep drawing more rain..
  if(Math.random() < probabilityOfRain) rain.push(new Rain());

  // keep animating
  requestAnimationFrame(update);
}

var init = function (){
  console.log('init in progress');
  context.lineWidth = dropWidth;
  context.fillStyle = 'rgba(0,0,0,1)';
  context.strokeStyle = 'rgba(0,0,0,1)';

  update();
}

init();

$(function() {

  $(document).ready(function(){
    $container = $('body');
    flash();
  })

})

function flash(){
  $container
    .animate({backgroundColor: '#f4dddc'}, 7000)
    .animate({backgroundColor: '#f3f4dc'}, 7000)
    .animate({backgroundColor: '#dcf4e0'}, 7000)
    .animate({backgroundColor: '#dcf4f3'}, 7000)
    .animate({backgroundColor: '#dce3f4'}, 7000)
    .animate({backgroundColor: '#e8dcf4'}, 7000)
    .animate({backgroundColor: '#f4dce6'}, 7000, function() { flash() });
}

(function(d){d.each(["backgroundColor","borderBottomColor","borderLeftColor","borderRightColor","borderTopColor","color","outlineColor"],function(f,e){d.fx.step[e]=function(g){if(!g.colorInit){g.start=c(g.elem,e);g.end=b(g.end);g.colorInit=true}g.elem.style[e]="rgb("+[Math.max(Math.min(parseInt((g.pos*(g.end[0]-g.start[0]))+g.start[0]),255),0),Math.max(Math.min(parseInt((g.pos*(g.end[1]-g.start[1]))+g.start[1]),255),0),Math.max(Math.min(parseInt((g.pos*(g.end[2]-g.start[2]))+g.start[2]),255),0)].join(",")+")"}});function b(f){var e;if(f&&f.constructor==Array&&f.length==3){return f}if(e=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(f)){return[parseInt(e[1]),parseInt(e[2]),parseInt(e[3])]}if(e=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(f)){return[parseFloat(e[1])*2.55,parseFloat(e[2])*2.55,parseFloat(e[3])*2.55]}if(e=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(f)){return[parseInt(e[1],16),parseInt(e[2],16),parseInt(e[3],16)]}if(e=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(f)){return[parseInt(e[1]+e[1],16),parseInt(e[2]+e[2],16),parseInt(e[3]+e[3],16)]}if(e=/rgba\(0, 0, 0, 0\)/.exec(f)){return a.transparent}return a[d.trim(f).toLowerCase()]}function c(g,e){var f;do{f=d.css(g,e);if(f!=""&&f!="transparent"||d.nodeName(g,"body")){break}e="backgroundColor"}while(g=g.parentNode);return b(f)}var a={aqua:[0,255,255],azure:[240,255,255],beige:[245,245,220],black:[0,0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgrey:[169,169,169],darkgreen:[0,100,0],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkviolet:[148,0,211],fuchsia:[255,0,255],gold:[255,215,0],green:[0,128,0],indigo:[75,0,130],khaki:[240,230,140],lightblue:[173,216,230],lightcyan:[224,255,255],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightyellow:[255,255,224],lime:[0,255,0],magenta:[255,0,255],maroon:[128,0,0],navy:[0,0,128],olive:[128,128,0],orange:[255,165,0],pink:[255,192,203],purple:[128,0,128],violet:[128,0,128],red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0],transparent:[255,255,255]}})(jQuery);



