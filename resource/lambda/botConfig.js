let botConfig = {
  appLevel: 'account', //account
  apis: [
    { url: 'thirdAuth', method: 'post' },
    { url: 'webhooks', method: 'post' },
    { url: 'auth', method: 'all' },
    { url: 'deauth', method: 'post' },
    { url: 'command', method: 'post',
    receive:function({req,res,next,safeTool}){
      next();
    }},
    { url: 'setConfig', method: 'post',receive:function({req,res,next,safeTool}){
      //Your verification logic here

      //if verification logic passes
      next();

      //if verification logic fails, do: res.status(400).send('Error: Invalid Input')
    }},
    //{url: 'setConfig', method: 'post'},
    { url: 'setNotifications', method: 'post',receive:function({req,res,next,safeTool}){
      //Your verification logic here

      //if verification logic passes
      next();

      //if verification logic fails, do: res.status(400).send('Error: Invalid Input')
    }},
    { url: 'notificationInfo', method: 'get' }
  ],
  commands: [
    { command: 'meet', description: 'Start a Zoom Meeting', hint: '' },
    { command: 'config', description: 'Configure your app', hint: '' },
    {
      command: 'connect',
      description: 'Connect this channel and start receiving notifications',
      hint: ''
    },
    {
      command: 'disconnect',
      description: 'Disconnect your application with third part',
      hint: ''
    },
    {
      command: 'notifications',
      description: 'Configure your notifications',
      hint: ''
    }
  ],
  stream: {
    thirdAuth: {
      // package:require('newrelic').thirdAuth,
      keys: ['newrelic_access_token', 'newrelic_refresh_token']
    },
    webhooks: {
      // package:require('newrelic').webhook, //export third_id,and this key is fixed
      successMessage: {
        body: [], //maybe like "send message from ${info.meetingid} to ${info.name}"
        header: { text: '${header}' }
      }
    },
    auth: {
      redirect: {
        success: '/page/config',
        error: '/page/error'
      }
    },
    deauth: {
      redirect: {
        success: '/page',
        error: '/page/error'
      }
    },
    meet: {
      successMessage: {
        body: [
          {
            type: 'message',
            link: '${join_url}',
            text: 'Click to join the meeting'
          }
        ],
        header: { type: 'message', text: 'Zoom Meeting' }
      },
      errorMessage: {
        body: {
          type: 'message',
          text: 'There was an error starting the meeting'
        },
        header: { type: 'message', text: 'Meeting Error' }
      },
      warnMessage: {
        body: { type: 'message', text: '${body}' },
        header: { type: 'message', text: '${header}' }
      }
    },
    config: {
      redirect: {
        success: '/page/config'
      },
      successMessage: {
        body: [
          {
            type: 'message',
            text: 'Click to configure your application',
            link: '${url}'
          }
        ],
        header: { type: 'message', text: 'Configuration' }
      },
      errorMessage: {
        body: { type: 'message', text: 'Error attempting to configure bot' },
        header: { type: 'message', text: 'Configuration Error' }
      },
      warnMessage: {
        body: { type: 'message', text: '${body}' },
        header: { type: 'message', text: '${header}' }
      }
    },
    disconnect: {
      successMessage: {
        body: { type: 'message', text: 'This channel has been disconnected' },
        header: { type: 'message', text: 'Disconnect Successful' }
      },
      errorMessage: {
        body: { type: 'message', text: 'Error disconnecting channel' },
        header: { type: 'message', text: 'Disconnect Error' }
      },
      warnMessage: {
        body: {
          type: 'message',
          text: 'This channel is not connected, unable to disconnect'
        },
        header: { type: 'message', text: 'Channel Not Connected' }
      }
    },
    connect: {
      //connect success(not have connect link),aleady connect it,connect error
      // package:require('newrelic').connect,
      scope: ['projectName', 'task'],
      successMessage: {
        body: { type: 'message', text: '${channelName}  is connected' },
        header: { type: 'message', text: 'Connect Successful' }
      },
      errorMessage: {
        body: { type: 'message', text: '${error}' },
        header: { type: 'message', text: 'Connect Error' }
      },
      warnMessage: {
        body: { type: 'message', text: 'This channel is already connected' },
        header: { type: 'message', text: 'Connection Already Exist' }
      }
    },
    notificationInfo: {
      keys: [
        { ui: 'input', key: 'project', text: 'projects' },
        {
          ui: 'checkboxGroup',
          key: 'article',
          labels: [
            { key: 'kogkey', text: 'kog' },
            { key: 'komkey', text: 'kom' }
          ],
          text: 'loop select'
        },
        {
          ui: 'select',
          key: 'users',
          labels: [
            { key: 'name', text: 'name a' },
            { key: 'value', text: 'value a' }
          ],
          text: 'sel it'
        }
      ]
    },
    notifications: {
      redirect: {
        success: '/page/configNotifications'
      },
      successMessage: {
        body: [
          {
            type: 'message',
            text: 'Click to configure your notifications',
            link: '${url}'
          }
        ],
        header: { type: 'message', text: 'Configuration' }
      },
      errorMessage: {
        body: { type: 'message', text: 'Error attempting to configure bot' },
        header: { type: 'message', text: 'Configuration Error' }
      },
      warnMessage: {
        body: { type: 'message', text: '${body}' },
        header: { type: 'message', text: '${header}' }
      }
    }
  },
  db: {
    // thirdPartId:'newrelic_id',
    zoom: {
      newrelic_id: 'String',
      newrelic_user_id: 'String'
    },
    webhook: {
      webhookId: 'zoom_account_id'
    },
    relationship:{}
  }
};



module.exports = botConfig;
