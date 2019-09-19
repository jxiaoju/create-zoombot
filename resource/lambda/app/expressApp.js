const express = require('express');
const bodyParser = require('body-parser');
var compression = require('compression');
let expressApp = express();
let nodepath=require('path');
let hbs = require('hbs');

//login hbs
var blocks = {};

hbs.registerHelper('extend', function(name, context) {
  var block = blocks[name];
  if (!block) {
      block = blocks[name] = [];
  }
  block.push(context.fn(this));
});

hbs.registerHelper('block', function(name) {
  var val = (blocks[name] || []).join('\n');
  // clear the block
  blocks[name] = [];
  return val;
});

hbs.registerHelper('ifEquals', function(pre, next, options) {
    return (pre == next) ? options.fn(this) : options.inverse(this);
});

hbs.registerHelper('ifObject', function(item, options) {
    if(item&&(typeof item === "object")){
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });
  hbs.registerHelper('json', function(context) {
    return JSON.stringify(context);
});
//use engine
expressApp.set('view engine','hbs');
//middleware body
expressApp.use(bodyParser.json());
//login tempalte
// hbs.registerPartials(__dirname + '/views');
hbs.registerPartials(nodepath.resolve('views'));
// use gzip
expressApp.use(compression());

module.exports=expressApp;