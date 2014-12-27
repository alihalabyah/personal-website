$(function() {

  var $projects = $(".project");
  var $topborder = $('.top-border');
  var $html = $('html');
  var color = Math.floor(Math.random() * 255);
  var first, last, css, delay;

  // when the document loads
  // the animations start. Waiting until the dom is
  // ready stops the .project from 'jittering' before
  // animating
  $('body').addClass('ready');

  $projects.each(function(i) {
    // stagger the animations 0.25 seconds apart
    delay = (((i + 3) / 4) - 0.6);

    css = ' animation-delay: ' + delay + 's; -webkit-animation-delay: 0s,' + delay + 's; -moz-animation-delay: ' + delay + 's; -o-animation-delay: ' + delay + 's;';
    $(this).attr("style", css);
  });

  $(".projects h2").each(function(i) {
    var hue = color + (i * 8);

    if(i === 0 || i === $projects.length - 1) {
      i === 0 ? first = hue : last = hue;
    }

    css = 'background: hsla(' + hue + ',95%,65%,0.95); color:hsla(' + hue + ',65%,55%,0.9);';
    $(this).attr("style", css);
  });

  css = 'background: linear-gradient(105deg, hsla(' + first + ',65%,65%,0.6), hsla(' + last + ',65%,65%,0.6)) hsla(' + first + ',65%,65%,0.6) repeat;';
  $topborder.attr("style", css);

  $('.wordy').WordySwitch({
    words: ['you', 'there', 'stranger', 'friend', 'fellow human'],
    normalSpeed: 5000
  });

  // typeout
  typeout('.typeout', ['brother', 'man', 'human'])

});



