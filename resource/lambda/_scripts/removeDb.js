let nodepath=require('path');
let fs=require('fs-extra');
const { spawn } = require('child_process');

const ls = spawn('sls', ['dynamodb', 'remove']);
ls.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });
ls.stdout.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });
  
ls.on('close', (code) => {
   fs.removeSync(nodepath.resolve('.dynamodb'));
});