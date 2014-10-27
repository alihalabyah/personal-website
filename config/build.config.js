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
    js: [
      './bower/modernizr/modernizr.js',
      './bower/wordyswitch/src/wordyswitch.js',
      './bower/typewriter/TypeWriter.js',
      './bower/walkway/src/walkway.js',
      './bower/jquery-waypoints/waypoints.js'
    ],
    css: [
      './bower/normalize-css/normalize.css',
    ],
    assets: [
      '',
    ]
  }
}
