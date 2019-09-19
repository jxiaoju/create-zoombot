let init = require('./init');
let fs=require('fs-extra');
let nodepath=require('path');
let models= init();

let json=fs.readJsonSync(nodepath.join(__dirname,'./mock/delete.json'));

let ac=async ()=>{
    for(let item of json){
        let {table,data}=item;
        try{
        await models[table].delete(data);
        console.log(`delete ${table} data success`);
        }
        catch(e){
            console.log(e);
        }
    }
}

ac();
