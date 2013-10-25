var $projects = $(".project");
var $topborder = $('.top-border');
var $html = $('html');
var color = Math.floor(Math.random() * 255);
var first, last, css, delay;

$(function() {

    $(document).ready(function() {

        // when the document loads
        // the animations start. Waiting until the dom is
        // ready stops the .project from 'jittering' before 
        // animating
        $('body').addClass('ready');


        $projects.each(function(i) {

           // stagger the animations 0.25 seconds apart
           delay = (((i + 3) / 4) - 0.5);
           
           css = ' animation-delay: ' + delay + 's; -webkit-animation-delay: ' + delay + 's; -moz-animation-delay: ' + delay + 's; -o-animation-delay: ' + delay + 's;';
           $(this).attr("style", css);

        });

        $(".projects h2").each(function(i) {

            var hue = color + (i * 13);

            if(i === 0 || i === $projects.length - 1) {
                if(i === 0) {
                    first = hue;
                } 
                else {
                    last = hue;
                }
            }

            css = 'background: hsl(' + hue + ',95%,65%); color:hsl(' + hue + ',65%,55%);';

            $(this).attr("style", css);
        });

        css = 'background: linear-gradient(90deg, hsl(' + first + ',65%,65%), hsl(' + last + ',65%,65%)) hsl(' + first + ',65%,65%) repeat;';
        $topborder.attr("style", css);

        // check for mobile devices to remove address bar..
        if ($html.hasClass('touch')) {
            setTimeout(function(){
                // ..hide the address bar
                window.scrollTo(0, 1);
            }, 0);
        };

    });

});



