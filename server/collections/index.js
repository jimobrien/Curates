(function() {
  'use strict';
  var collectionController = require('./collectionController');

  module.exports = function(app) {

    app.get('/', collectionController.fetchAll);
    app.get('/:id', collectionController.fetchOne);
    app.post('/', collectionController.addCollection);
    app.put('/:id', collectionController.editCollection);
    app.patch('/:id', collectionController.editCollection);
    app.delete('/:id', collectionController.removeCollection);

  };
})();