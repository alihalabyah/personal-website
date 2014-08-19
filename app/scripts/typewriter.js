(function(window, document) {
  'use strict';

  var TypeWriter = TypeWriter || function (selector, opts) {
    if(!selector) throw new Error('An selector must be specified');
    if(!opts.text) throw new Error('TypeWriter needs text to type');

    var options = {
      element: document.querySelector(selector),
      text: opts.text,
      words: opts.words || false,
      interval: opts.interval || 'human',
      lowerBound: opts.lowerBound || 30,
      upperBound: opts.upperBound || 200
    },
    randomIntFromInterval = function(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    isNumber = function(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    },
    getIntervalSpeed = function () {
      if(isNumber(options.interval))
        return options.interval;

      return randomIntFromInterval(options.lowerBound, options.upperBound);
    },
    typeByLettersConstantInterval = function (cb) {
      var numberOfLetters = options.text.length,
          currentPosition = 0;

      var interval = window.setInterval(function () {
        if(currentPosition === numberOfLetters){
          window.clearInterval(interval);
          cb && cb.call(window);
        } else {
          options.element.innerHTML += options.text[currentPosition];
          currentPosition++;
        }
      }, getIntervalSpeed.call() )
    },
    typeByLettersRandomisedInterval = function (cb) {
      var numberOfLetters = options.text.length,
          currentPosition = 0;

      repeat(numberOfLetters, currentPosition, cb);

    },
    repeat = function (numberOfLetters, currentPosition, cb) {
      if(numberOfLetters === 0)
        return cb && cb.call(window);

      var interval = getIntervalSpeed.call(),
          timer;

      options.element.innerHTML += options.text[currentPosition];

      timer = setTimeout(function () {
        numberOfLetters--; currentPosition++;
        repeat(numberOfLetters, currentPosition, cb);
      }, interval);
    },
    typeByWords = function (cb) {
      var words = options.text.split(' '),
          numberOfWords = words.length,
          currentPosition = 0;

      var interval = window.setInterval(function () {
        if(currentPosition === numberOfWords){
          window.clearInterval(interval);
          cb && cb.call(window);
        } else {
          options.element.innerHTML += (words[currentPosition] + ' ');
          currentPosition++;
        }
      }, getIntervalSpeed.call() )
    }

    this.type = function (cb) {
      options.words ? typeByWords(cb) :
          isNumber(options.interval) ? typeByLettersConstantInterval(cb) :
                                       typeByLettersRandomisedInterval(cb);
    };

  };

  this.TypeWriter = TypeWriter;

}).call(this, window, document)