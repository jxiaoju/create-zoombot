import React, { Component } from 'react';
import {Checkbox} from 'antd';

class CheckGroup extends Component {
  constructor(props){
    super(props);
    this.state={
      refresh:false
    };
  }
  ifDisabled=(name,disabled)=>{
    if(disabled===true){
      return true;
    }
    if(Array.isArray(disabled)&&disabled.indexOf(name)!==-1){
      return true;
    }
    return false;
  }
  createCheckbox=(attr,content,onChange,layout,labelStyle,disabled)=>{
        let originValue = content.originValue;
        if(!content.value){content.value=[];}
        let value=content.value;
        let keys=Object.keys(originValue);
        let lg=keys.length;
        return keys.map((name, ind) => {
            let obj = originValue[name];
            return (
                <React.Fragment key={ind}>
                <Checkbox  disabled={this.ifDisabled(name,disabled)} checked={obj.checked} onChange={(e)=>{
                    let checked=e.target.checked;
                    if(checked){
                        if(value.indexOf(name)===-1){
                            value.push(name);
                        }
                    }
                    else{
                        let no=value.indexOf(name);
                        if(no!==-1){value.splice(no,1);}
                    }
                    obj.checked=checked;
                    this.setState({
                        refresh:true
                    });
                    onChange(content.value);
                }}><label {...((typeof labelStyle==='object')?{style:labelStyle}:{})}>{obj.text}</label></Checkbox>
                {(ind!==lg-1&&layout==='v')&&<br/>}
                </React.Fragment>
            );
        });
    }
    changeData=(value,labels)=>{
      let originValue={};
      let out={originValue,value};
      let keys=Object.keys(labels);
      keys.forEach((key,ind)=>{
        key=key.toString();
        if(value.indexOf(key)===-1){
          originValue[key]={
            checked:false,
            text:labels[key]
          };
        }
        else{
          originValue[key]={
            checked:true,
            text:labels[key]
          };
        }
      });
      return out;
    }
    render() {
      let {labels,attr,value=[],onChange=()=>{},layout="h",labelStyle={},disabled}=this.props;
      let newValue=this.changeData(value,labels);
      return (
        <React.Fragment>
          {
            this.createCheckbox(attr,newValue,onChange,layout,labelStyle,disabled)
          }         
        </React.Fragment>
      );
    }
}

export default CheckGroup;
