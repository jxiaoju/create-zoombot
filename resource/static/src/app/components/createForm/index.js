import React, { Component } from 'react';
import utils from './utils';
import './index.scss';
import rcClass from 'rc-class';

let cn = rcClass('create-form');

let createForm = function(...attrs) {
  if (!(this instanceof createForm)) {
    return new createForm(...attrs);
  }
  this.state = {};
  this.config={
    errorBlock:false
  };
};

createForm.prototype = {
  setting(key,value){
    let {config}=this;
    if(typeof key==='string'){
      config[key]=value;
    }
    else if(typeof key==='object'){
      config=Object.assign(config,key);
    }
  },
  getError() {
    let ts = this;
    let Error = ({ id }) => {
      // console.log(id,'....');
      return ts[`${id}FilterError`] ? <span {...cn('error')} >{ts[`${id}FilterError`]}</span> : null;
    };
    return Error;
  },
  getForm() {
    let ts = this;
    class Form extends Component {
      constructor(props) {
        super(props);
      }
      render() {
        let {
          form,
          filters = {},
          onChange = () => {},
          cache = false,
          className,
          style
        } = this.props;
        Object.assign(ts, { filters, onChange });
        if (cache === false) {
          ts.state = {};
        }
        if (typeof form === 'object') {
          ts.state = Object.assign(ts.state, form);
        }
        // console.log('update',this.state.form,ts.state)
        return <div {...className?{className}:{}} {...style?{style}:{}}>{this.props.children}</div>;
      }
    }
    return Form;
  },
  changeAll(){
    this.change();
  },
  change(key_cont, value) {
    let ts = this;
    let tp = typeof key_cont;
   
    if(Array.isArray(key_cont)){
      let out={};
      for(let attr of key_cont){
        out[attr]=key_cont[attr];
      }
      ts.changeCore(out);
    }
    else if (tp === 'object') {
      ts.changeCore(key_cont);
    } else if (tp === 'string') {
      ts.changeCore({[key_cont]:value});
    } else if (tp === 'undefined') {
      ts.changeCore(ts.state);
    }
  },
  handleFilter(filterKey,filterValue,content,filterErrorArray){
    let ts=this;
    let {state}=ts;
    // let filterFunc=null;
    let filterOut;
    let value=null;
    if(filterKey.indexOf('.')===-1){
      value=state[filterKey];//
    }
    else{
      value=utils.getUniqueValueFromArrayKey(state,utils.parseKeys(filterKey));
    }
    // filterFunc=filters[filterKey];//filter func
    if(typeof filterValue==='function'){
      filterOut=filterValue(value);
      if(filterOut){//have error
        filterErrorArray.push(filterKey);
        if(filterKey in content){
          ts[`${filterKey}FilterError`] = filterOut;//error val
        }
      }
      else{
        if(filterKey in content){
          ts[`${filterKey}FilterError`]=undefined;
        }
      }
    }
    return filterErrorArray;
  },
  changeCore(content,extend=false,create='create'){
    let ts=this;
    let {filters={},onChange,state}=ts;
    let value=null;
    let filterErrorArray=[];
    let keyArr=null;
    let keyHandle;
    for(let key in content){
      value=content[key];//
      keyArr=utils.parseKeys(key);
      keyHandle=utils.setValueFromArrayKey(state,keyArr,value,extend,create);
      if(keyHandle===false){
        throw `${key} attribute is not a valid format`;
      }
    }
    if(Array.isArray(filters)){
      for(let filterObj of filters){
        let {key:filterKey,value}=filterObj;
        ts.handleFilter(filterKey,value,content,filterErrorArray);
      }
    }
    else if(typeof filters==='object'){
      for(let filterKey in filters){
        ts.handleFilter(filterKey,filters[filterKey],content,filterErrorArray);
      }
    }

    let ifValid=filterErrorArray.length>0?false:true;
  
    onChange(Object.assign({},state),ifValid,filterErrorArray);
  }
};

export default createForm;
