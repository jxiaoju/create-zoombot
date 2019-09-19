import React, { Component } from 'react';
import './index.scss';
// import utils from '@utils';
import errorImage from './assets/error_tip.png';
import rcClass from 'rc-class';
import {Icon} from 'antd';

let cn = rcClass('error-comp');

class Error extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      errorCode = 404,
      errorTitle = 'Error happen',
      errorMessage = "OOPS!   We couldn't find the page you're looking for.",
      actions,
      style
    } = this.props;
    return (
      <div
        {...cn('')}
        style={style ? style : {}}
      >
        <div {...cn('tip')}>
          {/* <img src={errorImage} alt='error image' /> */}
          <Icon type="close-circle" style={{color:'red',fontSize:'40px'}}/>
        </div>
        <div {...cn('title')}>{window.decodeURI(errorTitle)}</div>
        <div {...cn('des')}>{window.decodeURI(errorMessage)}</div>
        {errorCode && (
          <div {...cn('code')}>Error Code {errorCode}</div>
        )}
        {actions && actions.length > 0 ? (
          <div>
            <div {...cn('action-title')}> Try one of these:</div>
            <div {...cn('action-list')}>
              {actions.map((action, ind) => {
                return (
                  <a href={action.url} key={ind} {...cn('action')}>
                    {action.text}
                  </a>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Error;
