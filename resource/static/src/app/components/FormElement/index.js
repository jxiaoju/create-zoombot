import React from 'react';
// import ismobile from 'ismobilejs';
import './index.scss';
import rcClass from 'rc-class';
import { Select,Input } from 'antd';
import CheckboxGroup from '@components/CheckboxGroup';

let cn = rcClass('form-element');

let FormElement = ({ uiType, uiKey, uiValue, onChange, defaultValue,placeholder }) => {
  if (uiType === 'input') {
    return (
      <Input
        {...cn('input')}
        key={uiKey}
        {...placeholder?{placeholder}:{}}
        value={defaultValue}
        type="text"
        onChange={e => {
          let val = e.target.value;
          onChange(val);
        }}
      />
    );
  } else if (uiType === 'select') {
    if (!Array.isArray(uiValue)) {
      return null;
    }
    return (
      <Select
        key={uiKey}
        placeholder="Select a option"
        optionFilterProp="children"
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        {...cn('select')}
        value={defaultValue}
        onChange={va => {
          onChange(va);
        }}
      >
        {uiValue.map((obj, ind) => {
          return (
            <Option key={ind} value={obj.key}>
              {obj.text}
            </Option>
          );
        })}
      </Select>
    );
  } else if (uiType === 'checkboxGroup') {
    if (!Array.isArray(uiValue)) {
      return null;
    }
    let labels = {};
    for (let item of uiValue) {
      let { key, text } = item;
      labels[key] = text;
    }
    return (
      <CheckboxGroup
        labels={labels}
        value={defaultValue}
        onChange={values => {
          onChange(values);
        }}
      />
    );
  } else {
    return null;
  }
};

export default FormElement;
