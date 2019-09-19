var dynogels = require('dynogels');
let init=require('./init');
init();

dynogels.createTables(function(err) {
  if (err) {
    console.log('Error creating tables: ', err);
  } else {
    console.log('Tables have been created');
  }
});
