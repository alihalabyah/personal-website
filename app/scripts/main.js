console.log('\'Allo \'Allo!');

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