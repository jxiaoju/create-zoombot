var dynogels = require('dynogels');
let nodepath=require('path');
let fs=require('fs-extra');
let localJons=fs.readJsonSync(nodepath.resolve('./serverless.local.json'));
let env=localJons.environment;
let envPort=env.dynamodbPort?env.dynamodbPort:8089;
let botConfig = require('../botConfig');
let getService=require('@zoom/botbusiness/src/getService');


for(let i in env){
    process.env[i]=env[i];
}

dynogels.AWS.config.update({endpoint:`http://localhost:${envPort}`,region:env.tableRegion});

let init=()=>{
 
    let {services,models} = getService(botConfig);
    return models;
};

module.exports=init;