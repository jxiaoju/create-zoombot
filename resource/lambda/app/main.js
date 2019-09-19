
const express = require('express');
const nodepath = require('path');
let expressApp = require('./expressApp');
let botbusiness = require('botBusiness/src/index');
// let botbusiness = require('@zoom/botBusiness/src/index');
let botConfig = require('../botConfig');
let runStatic = require('./static');

let router = express.Router();

botbusiness({botConfig,router});
runStatic(router);

router.use(express.static(nodepath.join(__dirname, '../staticBuild')));

expressApp.use(`/${process.env.app}`, router);


module.exports=expressApp;
