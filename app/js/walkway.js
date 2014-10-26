function animate() {
  var svg = new Walkway({
    selector: '#example',
    easing: 'easeInOutCubic',
    duration: 2100
  });
  svg.draw();
}

if (document.addEventListener) {
  document.addEventListener("DOMContentLoaded", animate, false);
} else {
  animate();
}
