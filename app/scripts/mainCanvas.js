var container;
      var camera, scene, renderer, group, particle;
      var mouseX = 0,
          mouseY = 0,
          $canvasContainer = $('#canvasWrap');

      var windowHalfX = window.innerWidth / 2,
          windowHalfY = $canvasContainer.innerHeight() / 2;

      init();
      animate();

      function init() {

        container = document.createElement( 'div' );
        $canvasContainer[0].appendChild( container );

        camera = new THREE.PerspectiveCamera( 75, window.innerWidth / $canvasContainer.innerHeight(), 1, 3000 );
        camera.position.z = 250;

        scene = new THREE.Scene();

        var PI2 = Math.PI * 2;
        var program = function ( context ) {

          context.beginPath();

          // make weird shapes here
          context.arc( 0, 0, 0.5, 0, PI2, true );

          context.fill();

        }

        group = new THREE.Object3D();
        scene.add( group );

        for ( var i = 0; i < 900; i++ ) {

          var material = new THREE.SpriteCanvasMaterial( {
            color: 0x44bec1,
            program: program
          } );

          particle = new THREE.Sprite( material );
          particle.position.x = Math.random() * 2000 - 1000;
          particle.position.y = Math.random() * 2000 - 1000;
          particle.position.z = Math.random() * 2000 - 1000;
          particle.scale.x = particle.scale.y = Math.random() * 20 + 10;
          group.add( particle );
        }

        renderer = new THREE.CanvasRenderer();
        renderer.setSize( window.innerWidth, $canvasContainer.innerHeight() );
        container.appendChild( renderer.domElement );

        document.addEventListener( 'mousemove', onDocumentMouseMove, false );
        document.addEventListener( 'touchstart', onDocumentTouchStart, false );
        document.addEventListener( 'touchmove', onDocumentTouchMove, false );

        //

        window.addEventListener( 'resize', onWindowResize, false );

      }

      function onWindowResize() {

        windowHalfX = window.innerWidth / 2;
        windowHalfY = $canvasContainer.innerHeight() / 2;

        camera.aspect = window.innerWidth / $canvasContainer.innerHeight();
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, $canvasContainer.innerHeight() );

      }

      //

      function onDocumentMouseMove( event ) {

        mouseX = event.clientX - windowHalfX;
        mouseY = event.clientY - windowHalfY;
      }

      function onDocumentTouchStart( event ) {

        if ( event.touches.length === 1 ) {

          event.preventDefault();

          mouseX = event.touches[ 0 ].pageX - windowHalfX;
          mouseY = event.touches[ 0 ].pageY - windowHalfY;

        }

      }

      function onDocumentTouchMove( event ) {

        if ( event.touches.length === 1 ) {

          event.preventDefault();

          mouseX = event.touches[ 0 ].pageX - windowHalfX;
          mouseY = event.touches[ 0 ].pageY - windowHalfY;

        }

      }

      //

      function animate() {

        requestAnimationFrame( animate );

        render();

      }

      function render() {

        camera.position.x += ( mouseX - camera.position.x ) * 0.01;
        camera.position.y += ( - mouseY - camera.position.y ) * 0.01;
        camera.lookAt( scene.position );

        group.rotation.x += 0.001;
        group.rotation.y += 0.001;

        renderer.render( scene, camera );

      }
