$(function () {
  $('#window').terminal(function(command, term) {
      if (command !== '') {
          try {
              var result = window.eval(command);
              if (result !== undefined) {
                  term.echo(new String(result));
              }
          } catch(e) {
              term.error(new String(e));
          }
      } else {
         term.echo('');
      }
  }, {
      greetings: '\nHey there! Type explore to start your journey.\n',
      name: 'js_demo',
      height: 500,
      prompt: '> '
  });
})
