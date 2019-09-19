const themes=require('./themes');
const nodepath=require('path');
let config = {};

try {
  config = require('../serverless.local.json');
} catch (e) {
  config = {};
}

let {static:staticConfig,app:appName}=config;
let port =
  (typeof staticConfig === 'object' && (!isNaN(+staticConfig.port)))
    ? staticConfig.port
    : 3003;
port=+port;

module.exports = {
  port,
  analyze:true,
  entryIndex:'./src/main.js',
  buildDir:'../staticBuild',
  appHtml:'./src/index.html',
  hot:true,
  buildAssetsDir:'assets',
  // buildAssetsDir:process.env.NODE_ENV==='production'?'https://s3...':'assets',
  themeVariables: themes,
  https: false,
  split:(function(){
    if(process.env.NODE_ENV==='development'){
      return null;
    }
    else{
      return [
          {name:'antd',path:/node_modules\/\@ant\-design/},
          {name:'react-dom',path:/node_modules\/react-dom/}
        ];
    }
  })(),
  pageEnv:{
    app:appName,
    port
  },
  include:[/pageConfig\.js/,nodepath.join(__dirname,'src')],//this config will change future,and all config in botConfig
  webpack:{
    alias(){
      return {
        '@components':nodepath.resolve('./src/app/components'),
        '@utils':nodepath.resolve('./src/app/utils'),
        '@pageConfig':nodepath.resolve('./pageConfig.js'),
        '@assets':nodepath.resolve('./src/assets')
      };
    }
  }
  // pageEnv:{
    
  // },
};

