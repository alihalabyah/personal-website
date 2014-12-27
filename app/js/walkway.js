window.onload = function() {
  var svg = new Walkway({
    selector: '#example',
    easing: 'easeInOutCubic',
    duration: 2100
  });
  svg.draw();
}

