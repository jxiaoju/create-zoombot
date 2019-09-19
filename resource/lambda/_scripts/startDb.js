let nodepath=require('path');
let fs=require('fs-extra');
const { spawn } = require('child_process');

let localJons=fs.readJsonSync(nodepath.resolve('./serverless.local.json'));

let envPort=localJons.environment.dynamodbPort;
envPort=envPort?envPort:8089;

const ls = spawn('sls', ['dynamodb', 'start','--port',envPort,'--stage','local']);
ls.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });
ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });
  
ls.on('close', (code) => {
    console.log(`db start`);
  });