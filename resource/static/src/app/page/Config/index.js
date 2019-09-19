import React from 'react';
// import './home.scss';
import {  message,  Divider } from 'antd';
import BotConnect from '@components/BotConnect';
import Header from '@components/Header';
import utils from '@utils';
import QuickForm from '@components/QuickForm';
import './index.scss';
import rcClass from 'rc-class';
import pageConf from '@pageConfig';

let pageConfig=pageConf||{};
let cn = rcClass('config');

let keys=null;
let title,description,thirdpartIcon,id,hookid;
let appConf=window.appConf;
let submitUrl=null;

let {config:configContent}=pageConfig;
if(typeof configContent==='object'){
  submitUrl=configContent.submitUrl;
  keys=configContent.keys;
  title=configContent.title;
  description=configContent.description;
  thirdpartIcon=configContent.thirdpartIcon;
}

if(typeof appConf==='object'){
  id=appConf.id||'id';
  hookid=appConf.hookid||'hookid';
}


//ui keys {key,text,value,ui,labels}
keys=Array.isArray(keys)?keys:[];

let filters=(function(){
let out={};
for(let item of keys){
  out[item.key]=function(val){
    if(!val){return `can't be empty`;}
  };
}
return out;
})();

class Config extends React.Component {
  constructor(props) {
    super(props);
    let data=null;
    let template={};
    if(keys.length>0){
      data={};
      for(let item of keys){
        data[item.key]=item.value;
        template[item.key]={
          ui:'input',
          placeholder:'input value',
          text:item.text?item.text:item.key
        };
      }
    }
    else{
      data=null;
    }    
    this.template=template;
    this.state = {
      form: data,
      isValid: false
    };
  }
   onSubmit=async (data={})=>{
    let obj=Object.assign({data,id});
    try{
      await utils.request({
        method:'post',
        url:`/${process.env.app}${submitUrl}`,
        data:obj
      });
      message.success('config is updated');
    }
    catch(e){
      if(typeof e==='object'){e=JSON.stringify(e);}
      message.error(e);
    }
  }
  render() {
    return (
      <div {...cn()}>
        <Header />
        <div {...cn('content')}>
          <BotConnect
            title={title}
            subtitle={description}
            fromIcon={{
              alt: 'zoom app',
              src:
                'https://d24cgw3uvb9a9h.cloudfront.net/static/93516/image/oauth2/zoom.png'
            }}
            toIcon={{
              alt: 'connected app',
              src:thirdpartIcon
            }}
            status="normal"
          />
          <Divider />
          <QuickForm 
          filters={filters}
          template={
            this.template
          }
          data={
            this.state.form
          }
          onSubmit={(data)=>{
            this.onSubmit(data);
          }}
          />
        </div>

      </div>
    );
  }
}

export default Config;
