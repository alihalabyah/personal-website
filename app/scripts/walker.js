window.requestAnimationFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };

var canvas = document.getElementById('walker'),
  ctx = canvas.getContext('2d');
  canvas.height = 200,
  canvas.width = 500;

var PI_2 = Math.PI * 2,
    points = [],
    walker,
    mouse = {
      x: null,
      y: null
    },
    influence = false;

/**
*
* Point class
*
**/

var Point = function (x, y) {
  if(!(this instanceof Point)) return new Point(x, y);

  this.x = x || 0;
  this.y = y || 0;
};

Point.prototype.draw = function () {
  ctx.beginPath();
  ctx.arc(this.x, this.y, 1, 0, PI_2);
  ctx.fill();
}

/**
*
* Walker class
*
**/
var Walker = function () {
  if(!(this instanceof Walker)) return new Walker();

  // walker starts in the middle of the canvas
  this.position = new Point(canvas.width / 2, canvas.height / 2);

  // put initial point in the array..
  points.push(this.position);
}

Walker.prototype.update = function () {
  this.previous = this.position;

  // want values -1, 0 or 1
  var xchange = influence ? getChange('x') : Math.floor((Math.random() * 3) - 1),
      ychange = influence ? getChange('y') : Math.floor((Math.random() * 3) - 1),
      newPoint;

  /**

    TODO:
    - Make sure the path doesn't pass through the edge of the canvas

  **/

  newPoint = new Point(this.position.x += xchange, this.position.y += ychange);

  // store the new point..
  points.push(newPoint);

}

/**
*
* General update pattern
*
**/
var update = function () {

  var counter,
      point;

  walker.update();

  // clear the rectangel to draw again
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  counter = points.length;

  // redraw all stored points on walk..
  while (counter--) {
    var point = points[counter];
    point.draw();
  }

  requestAnimationFrame(update);

}

var init = function () {
  // create our walker..
  walker = new Walker();

  // add a center point for reference
  ctx.fillStyle = 'rgba(121,210,169,1)';

  // attach event handler to canvas to influence
  // direction of random path..
  canvas.addEventListener('mousemove', function (e) {
    mouse.x = e.clientX - canvas.offsetLeft;
    mouse.y = e.clientY - canvas.offsetTop;
  })

  update();
}

function getChange(axis) {
  var chance = [],
      breakpoint = axis === 'x' ? canvas.width / 2 : canvas.height / 2;
      mousePos = axis === 'x' ? mouse.x : mouse.y,
      element = 0;

  mousePos > breakpoint ? chance = [1, 1, 1, 1, 1, 1, 0, -1, -1, -1]
                     : chance = [-1, -1, -1, -1, -1, -1, 0, 1, 1, 1];
  element = Math.floor(Math.random() * 10);

  return chance[element];
}

init();

