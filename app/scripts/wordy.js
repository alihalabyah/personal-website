;(function ( $, window, undefined ) {

  var pluginName = 'WordySwitch',
      document = window.document,
      defaults = {
        hover: "true",
        hoverSpeed: 1000 / 3
      },
      ids = 0;

  function WordySwitch( element, options ) {
    // store both the DOM element
    // and the jQuery object
    this.element = element;
    this.$element = $( element );

    this._defaults = defaults;
    this._name = pluginName;
    this._current = 0;
    this._timerId;
    this._hoverTimerId;

    this.options = $.extend( {}, defaults, options) ;
    // calculate this on initialisation
    this.wordLength = 0;

    this.init();
  }

  WordySwitch.prototype.init = function() {
    // keep a reference to plugin scope
    self = this;

    // store all the phrases
    this.words = this.options.words;

    // if there was an initial word add it to the word list
    // and store the word length
    this.words.push( this.$element.text() );
    this.wordLength =  this.words.length;

    // set the word to replace
    this.normalTimer.call(this);

    // when hovered over replace words faster
    this.hoverTimer.bind(WordySwitch);
    this.$element.on('mouseenter', {context: this}, this.hoverTimer);

    // when mouse exits slow down the replacements a
    // and cancel the hover timer
    this.hoverExit.bind(WordySwitch);
    this.$element.on('mouseleave', {context: this}, this.hoverExit);

  }

  WordySwitch.prototype.applyStyles = function() {

  }

  WordySwitch.prototype.getCurrent = function() {
    if(self._current  >= self.wordLength)
      self._current = 0;

    return self._current;
  }

  WordySwitch.prototype.hoverTimer = function(evt) {
    console.log(this);
    var self = evt.data.context;

    // cancel the normal timer
    clearTimeout(self._timerId);

    self._hoverTimerId = setInterval(function() {
      var current = self.getCurrent();
      self.$element.text( self.options.words[current] );
      // increment the current word position
      self._current++;
    }, self.options.hoverSpeed);

  }

  WordySwitch.prototype.hoverExit = function(evt) {
    console.log(this);
    // clear the hover timer
    clearTimeout(self._hoverTimerId);

    // start normal replacement again
    self.normalTimer.call(this);
  }

  WordySwitch.prototype.normalTimer = function() {
    //
    self._timerId = setInterval(function() {
      var current = self.getCurrent();
      self.$element.text( self.options.words[current] );
      // increment the current word position
      self._current++;
    }, 2000)

  }

  $.fn[pluginName] = function( options ) {
    return this.each(function() {
      // if (!$.data(this, 'plugin_' + pluginName)) {
      //   $.data(this, 'plugin_' + pluginName, new WordySwitch( this, options ));
      // }
      new WordySwitch( this, options );
    });
  }

}(jQuery, window));
