// let router = require('./services/router.js');
let env = 'production'; //default env
// let botConfig = require('../botConfig');
// let parsePages = require('./parse/pages');
if (process.env.NODE_ENV === 'development') {
  env = 'development';
}
if ([true, 'true'].indexOf(process.env.IS_OFFLINE) !== -1) {
  env = 'local';
}
let originConfig = {
  app: process.env.app,
  env,
  staticPort: process.env.staticPort
};



//static route logic
let run=(router)=>{
  router.get('/page/createMessage/:uuid?/:webhookid?', function(req, res) {
    let uuid = req.params.uuid;
    let webhookid = req.params.webhookid;
    res.render(
      `createMessage`,
      Object.assign(originConfig, {
        uuid,
        webhookid
      })
    );
  });
  


  router.get('/page/config/:uuid?/:webhookid?', function(req, res) {
    let uuid = req.params.uuid;
    let webhookid = req.params.webhookid;
    res.render(
      `config`,
      Object.assign(originConfig, {
        uuid,
        webhookid
      })
    );
  });
  
  router.get('/page/configNotifications/:webhookid?/:userid?', function(req, res) {
    let userid = req.params.userid;
    let webhookid = req.params.webhookid;
    res.render(
      `configNotifications`,
      Object.assign(originConfig, {
        userid,
        webhookid
      })
    );
  });
  
  router.get('/page/welcome', function(req, res) {
    res.render(
      `welcome`,
      Object.assign(originConfig, {
        
      })
    );
  });
  
  router.get('/page/error', function(req, res) {
    res.render(`error`, Object.assign(originConfig));
  });
  

};


module.exports=run;
