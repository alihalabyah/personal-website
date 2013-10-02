var about = function() { console.log('about route'); },
    contact = function() { console.log('contact route'); }

var routes = {
    '/about': about,
    '/contact': contact
};

var router = Router(routes);

router.configure({
   html5history: true
});

router.init();

var $projects = $(".project");
var $topborder = $('.top-border');
var color = Math.floor(Math.random() * 255);
var first, last, css;

$(function() {

    $(document).ready(function() {

        $('body').addClass('ready');

        $(".project").each(function(i) {
           // stagger the animations 0.25 seconds apart
           css = 'animation-delay: ' + ((i + 3) / 4) + 's;';
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

            css = 'background: hsl(' + hue + ',75%,65%); color:hsl(' + hue + ',65%,55%);';
            $(this).attr("style", css);
        });

        css = 'background: linear-gradient(90deg, hsl(' + first + ',65%,65%), hsl(' + last + ',65%,65%)) hsl(' + first + ',65%,65%) repeat;';
        $topborder.attr("style", css);

    });

});



