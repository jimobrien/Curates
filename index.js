(function() {
  'use strict';

  var mongoose = require('mongoose');
  var app = require('./server/server');
  
  // Define PORT and URL
  var url = process.env.URL || 'localhost';
  var port = process.env.PORT || 3000;

  // Start the server
  app.listen(port, url, function() {
    console.log('Listening on at ' + url + ':' + port);
  });

  // Connect to the Database
  var mongo = process.env.MONGO || 'mongodb://localhost:27017';
  mongoose.connect(mongo, function(err) {
    if (err) {
      throw err;
    }
    console.log('Successfully connected to MongoDB');
  });

})();