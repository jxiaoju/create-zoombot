
let init=require('./init');
let { zoom, webhook } = init();

zoom.model.deleteTable(function(err) {
  if (err) {
    console.log('Error deleting table: ', err);
  } else {
    console.log('Table has been deleted');
  }
});

webhook.model.deleteTable(function(err) {
  if (err) {
    console.log('Error deleting table: ', err);
  } else {
    console.log('Table has been deleted');
  }
});
