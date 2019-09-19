import React from 'react';
import { Button, message, Row, Col, Divider} from 'antd';
import createForm from '@components/createForm';
import Header from '@components/Header';
import BotConnect from '@components/BotConnect';
import FormElement from '@components/FormElement';
import utils from '@utils';
import './index.scss';
import rcClass from 'rc-class';
import pageConf from '@pageConfig';

// this is a config json to create form create

let pageConfig=pageConf||{};
let cn = rcClass('configNotifications');

//form create
let form = createForm();
let Form = form.getForm();
let Error = form.getError();

// let keys=null;
let hookid,userid;
let appConf=window.appConf;

if(typeof appConf==='object'){
  hookid=appConf.hookid;
  userid=appConf.userid;
}

let {configNotifications}=pageConfig;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.filters={};
    this.template={};
    this.data={};
    this.state = {
      form: {},
      focusId:null,
      template:{},
      ui:{},
      isValid: false
    };
  }
  async componentDidMount(){
    try{
      let infos= await utils.request({
          method:'get',
          url:`/${process.env.app}${configNotifications.getDataUrl}`,
          params:{hookid,userid}
      });
      let {template,data,channelInfo}=infos;
      this.template=template;
      this.data=data;
      this.channelInfo=channelInfo;
      // this.setState({focusId:channelInfo.labels[0].key});
      this.setState({focusId:null});    
    }
    catch(e){
      if(typeof e==='object'){e=JSON.stringify(e);}
      message.error(e);
    }
  }
  onSubmit=async ()=>{
    let form=this.state.form;
    let channelId=this.state.focusId;
    let obj={
      channelId,
      data:form,
      hookid,
      userid
    };
    try{
      await utils.request({
        method:'post',
        url:`/${process.env.app}${configNotifications.submitUrl}`,
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

    let focusId=this.state.focusId;
    //get focus template
    let template=this.template[focusId];
    let data=this.data[focusId]||{};
    let channelInfo=this.channelInfo;
    
    let filters={};
    if(typeof template==='object'){
      let keys=Object.keys(template);
      for(let key of keys){
        if(template[key].ui==='checkboxGroup'){
          filters[key]=function(val){
            if(!Array.isArray(val)||val.length===0){
              return `must select a checkbox`;
            }
          };
        }
        else{
          filters[key]=function(val){
            if(!val){
              return `Can't be empty input`;
            }
          };
        }
       
      }

    }
    

    return (
      <div {...cn()}>
        <Header />
        <div {...cn('content')}>
          <BotConnect
            title={configNotifications.title}
            subtitle={configNotifications.description}
            fromIcon={{
                alt:'zoom app',
                src:
                  'https://d24cgw3uvb9a9h.cloudfront.net/static/93516/image/oauth2/zoom.png'
            }}
            toIcon={{
                alt:'connected app',
                src:configNotifications.thirdpartIcon
            }}
            status="normal"
            />
          <Divider />

    
          {channelInfo&&<Row {...cn('form-item')} type="flex">
                  <Col {...cn('form-label')}>
                    <label {...cn('channel-label')}>Select a channel: </label>
                  </Col>
                  <Col style={{ width: '100%' }} {...cn('form-input')}>
                  <FormElement defaultValue={focusId} uiType={channelInfo.ui} key={channelInfo.key} uiKey={channelInfo.key} uiValue={channelInfo.labels} onChange={(val)=>{
                 
                      console.log(val);
                      this.setState({focusId:val});

                    }}></FormElement>
                  </Col>
                </Row>}


          {template&&<Form
            {...cn('form')}
            form={data}
            onChange={(formData, isValid) => {
              this.data[focusId]=formData;
              this.setState({ form: formData, isValid });
            }}
            filters={filters}
          >
            {Object.keys(template).map((key, ind) => {
              // let uiType=this.state.ui[key];
              // let info=this.state.template[key];
              let info=template[key];

              let {ui:uiType }=info;

              let defaultValue=data[key];
              let {text,labels:value}=info;
              
              // value is default value,uiValue,is 
              return (
                <Row {...cn('form-item')} type="flex"  key={ind}>
                  <Col {...cn('form-label')}>
                    <label>{text} : </label>
                  </Col>
                  <Col style={{ width: '100%' }} {...cn('form-input')}>
                    <FormElement defaultValue={defaultValue} uiType={uiType} key={key} uiKey={key} uiValue={value} onChange={(val)=>{
                
                      form.change({[key]:val});
                    }}></FormElement>
                    <Error id={key}/>
                  </Col>
                </Row>
              );
            })}
           
          </Form>}
     

          <Button {...cn('submit')} disabled={!this.state.isValid} onClick={this.onSubmit}>submit</Button>

        </div>
      </div>
    );
  }
}

export default Home;
