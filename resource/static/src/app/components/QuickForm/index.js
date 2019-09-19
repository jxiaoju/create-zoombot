import React, { useState, useContext, useEffect } from 'react';
import createForm from '../createForm/index';
import FormElement from '../FormElement/index';
import { Empty,Button,Row,Col } from 'antd';
import rcClass from 'rc-class';
import './index.scss';
//template={name:{ui,text,labels}}

let cn = rcClass('quick-form');

let Ele = ({
  attr,
  defaultValue,
  text,
  labels,
  ui,
  placeholder = '',
  Error,
  form
}) => {

  return (
    <Row {...cn('form-item')} type="flex">
      <Col {...cn('form-label')}>
        <label>{text} : </label>
      </Col>
      <Col style={{ width: '100%' }} {...cn('form-input')}>
        <FormElement
          placeholder={placeholder}
          defaultValue={defaultValue}
          uiType={ui}
          key={attr}
          uiKey={attr}
          uiValue={labels}
          onChange={val => {
            form.change({ [attr]: val });
          }}
        ></FormElement>
        <Error id={attr} />
      </Col>
    </Row>
  );
};

let QuickForm = ({ data, template, onSubmit, filters }) => {
  let [formdata, setFormdata] = useState({});
  let [valid, setValid] = useState(false);
  // let form,Form,Error;
  let [forminfo, setForminfo] = useState([]);
  useEffect(() => {
    let form = createForm();
    let Form = form.getForm();
    let Error = form.getError();
    setFormdata(data);
    setForminfo([form, Form, Error]);
  }, []);
  let form = forminfo[0];
  let Form = forminfo[1];
  let Error = forminfo[2];

  return (
    <div>
      {form ? (
        (typeof template === 'object') ? (
          <React.Fragment>
            <Form
              {...(filters ? { filters } : {})}
              form={formdata}
              onChange={(da, isValid) => {
                setFormdata(da);
                setValid(isValid);
              }}
            >
              {Object.keys(template).map((key, ind) => {
                let info = template[key];
                let { ui, text, labels, placeholder } = info;
                let defaultValue = formdata[key];
                // let {text,labels}=info;
                return (
                  <Ele
                    placeholder={placeholder}
                    key={ind}
                    attr={key}
                    defaultValue={defaultValue}
                    Error={Error}
                    form={form}
                    text={text}
                    labels={labels}
                    ui={ui}
                  />
                );
              })}
            </Form>

            <Button
              {...cn('submit')}
              disabled={!valid}
              onClick={() => {
                onSubmit(Object.assign({}, formdata));
              }}
            >
              submit
            </Button>
          </React.Fragment>
        ) : (
          <Empty />
        )
      ) : (
        <Empty />
      )}
    </div>
  );
};

export default QuickForm;

//form key,value,onchange,visible
