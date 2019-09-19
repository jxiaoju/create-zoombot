// let createModel = require('../app/db/createModel');
// let action = require('../app/db/action');
let init = require('./init');
let models = init();
let fs=require('fs-extra');
let nodepath=require('path');
let [tableName,primaryKey]=process.argv.slice(2);


let ac = async () => {
  // let tables = ['zoom', 'webhook'];
  let out=[];
  // for (let table of tables) {
    try {
      let info = await models[tableName].query({uuid:primaryKey});
      // console.log(info,76);
      for (let item of info.Items) {
        out.push({tableName,data:item.get()});
      }
    } catch (e) {
      console.log(e);
    }
  // }
  let jsonString=JSON.stringify(out);
  fs.writeJsonSync(nodepath.json(__dirname,'data/table.json'),out);
  console.log(jsonString);
};

ac();
