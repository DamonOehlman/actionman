var eve = require('eve');
var actionman = require('../../');

// listen for events 
eve.on('myapp.missile.fire', function(evt) {
  console.log('firing the missile captain');
});

// tell actionman to map events intercepted at a document level 
actionman('myapp');