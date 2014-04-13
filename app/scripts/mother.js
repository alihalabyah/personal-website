$(function () {
  // Setup variables
  $window = $(window);
  $slide = $('.slide');
  $body = $('body');

  setTimeout(function() {
        // Resize sections
        adjustWindow();
        // Fade in sections
        $body.addClass('loaded');
    }, 300);
})


	function adjustWindow(){

		// Get window size
	    winH = $window.height();

	    // Keep minimum height 550
	    if(winH <= 550) {
			winH = 550;
		}

	    // Resize our slides
	    $slide.height(winH);

	}
