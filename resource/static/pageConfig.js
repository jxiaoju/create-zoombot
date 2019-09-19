import React from 'react';
// import {Button} from 'antd';

window.appConf=window.appConf||{};

// let id=window.appConf.id;

let out={
  createMessage:{
    submitUrl:'/receiveCreateMessage',
    getDataUrl:'/createMessageInfo'
  },
  configNotifications:{
    submitUrl:'/setNotifications',
    getDataUrl:'/notificationInfo',
    thirdpartIcon:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlSNFGCWKEpB01pQel_1Q3wLJbksN_Gpt320AZZn_aK5z5QCv7Qg',
    title: 'configure',
    description: 'this is a configure page of ...,so you can input ...in ,and ... in .. '
  },
  welcome:{
    title: 'welcome to use newrelic bot',
    description: 'descriptions information',
    thirdpartIcon:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlSNFGCWKEpB01pQel_1Q3wLJbksN_Gpt320AZZn_aK5z5QCv7Qg'
  },
  config:{
        submitUrl:'/setConfig',
        keys: [
            {
              key: 'newrelic_id',
              value: '',
              text: 'input your newrelic account id'
            },
            {
              key: 'newrelic_user_id',
              value: '',
              text: 'input your newrelic user id'
            }
          ],
          title: 'config newrelic arguments for connect',
          description: 'some information',
          thirdpartIcon:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlSNFGCWKEpB01pQel_1Q3wLJbksN_Gpt320AZZn_aK5z5QCv7Qg'
  }
};


export default out;