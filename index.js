#!/usr/bin/env node

const nodepath = require('path');
// const chalk = require('chalk');
// const compareV = require('compare-versions');
const program = require('commander');
// const main = require("./index.js");
// const spawn=require('cross-spawn');
const fs = require('fs-extra');
// let cwd = process.cwd();
let packageInfo=fs.readJsonSync(nodepath.join(__dirname,'./package.json'));
let resource=require('./src/resource');
// const libCwd = nodepath.join(__dirname,"..");
program
  .version(packageInfo.version)
  .command('create [appName]')
  .option('-d,--dist <dist>','aim directory which you want to create in')
  .option('-n,--nowrap','not create a parent directory,insert files&&dirs to current dir')
  .action(function(appName, props) {
    resource.create(appName,props);
  });


program
  .command('init')
  .option('-d,--dist <dist>', 'aim directory which you want to create in')
  .action(function ( props) {
    resource.init( props);
  });


program
  .command('create-static')
  // .option('-d,--dist <dist>', 'aim directory which you want to create in')
  .action(function () {
    resource.createStatic();
  });


program.parse(process.argv);
