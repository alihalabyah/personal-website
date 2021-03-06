//
// This file contains all configuration for the build process
//
module.exports = {

  build_dir: './dist',

  //
  // These will usually be files included
  // through bower. Whenever you manually add
  // a package in bower you also need to add its
  // assets (js, css, images) to these arrays
  //
  vendor: {
    js:  {
      'all': [
        './bower/modernizr/modernizr.js',
        './bower/wordyswitch/src/wordyswitch.js',
        './bower/typewriter/src/typewriter.js',
        './bower/walkway/src/walkway.js',
        './bower/typeout/typeout.min.js',
        './bower/jquery-waypoints/waypoints.js'
      ],
      'typeout': [
        './bower/typeout/typeout.min.js'
      ],
      'walkway': [
        './bower/walkway/src/walkway.js'
      ]
    },
    css: [
      './bower/normalize-css/normalize.css',
      './bower/loaders.css/loaders.css'
    ],
    assets: [
      '',
    ]
  }
}
