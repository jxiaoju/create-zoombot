let createModel = require('../app/db/createModel');
// let action = require('../app/db/action');
let init = require('./init');
let models = init();
let fs=require('fs-extra');
let nodepath=require('path');

let ac = async () => {
  let tables = ['zoom', 'webhook'];
  let out=[];
  for (let table of tables) {
    try {
      let info = await models[table].scan();
      for (let item of info.Items) {
        out.push({table,data:item.get()});
      }
    } catch (e) {
      console.log(e);
    }
  }
  let jsonString=JSON.stringify(out);
  fs.writeJsonSync(nodepath.join(__dirname,'data/table.json'),out);
  console.log(jsonString);
};

ac();
