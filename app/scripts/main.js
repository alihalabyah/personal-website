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

var $section = $("section");
var $projects = $(".projects");
var color = Math.floor(Math.random() * 210);

$(".project").each(function(i) {
   // stagger the animations 0.2 seconds apart
   var css = 'animation-delay:' + ((i + 6) / 8) + 's;';
   $(this).attr("style", css);
});

$(".projects h2").each(function(i) {
    var hue = color + (i * 10);
    var css = 'background:hsl(' + hue + ',65%,65%); color:hsl(' + hue + ',45%,55%);';
    $(this).attr("style", css);
});

$(function() {
    $(window).load(function() {


                $(".filter").click(function() {
                    var filter = $(this).text();

                    $(".filter").removeClass("active-filter");

                    $(".filter:contains(" + filter + ")").addClass("active-filter");

                    if ($section.hasClass("filter-" + filter)) {
                        console.log("match!");
                        $(".filter").removeClass("active-filter");
                        $section.removeClass();
                    }
                    else {
                        $section.removeClass().addClass("filtering filter-" + filter);
                    }
                });

                $("h1").click(function(){
                    $(".filter").removeClass("active-filter");
                    $section.removeClass();
                });
            });
});