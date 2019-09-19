const serverless = require('serverless-http');
let expressApp=require('./main');

const handler = serverless(expressApp);

module.exports.handler = async (event, context) => {
  return await handler(event, context);
};
