import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import rcClass from 'rc-class';
import {Icon,Spin} from 'antd';
import './index.scss';

let cn=rcClass('scope-loading');
let LoadingIcon=<Icon type='loading' {...cn(['icon','static-icon'])}  spin />;

class Loading extends Component {
    constructor(props) {
        super(props);
        let dom=this.loadingDiv = document.createElement('div');
        dom.setAttribute('class',cn('').className);
        // this.changePosition = false;
        this.originPosition=null;
        this.aim = props.aim||window.document.body;
    }
    bodySpecialOpen = (aim, loadingDiv) => {
        let body = window.document.body;
        if (aim === body) {
            let position = window.getComputedStyle(body, null).getPropertyValue('position');
            this.originPosition=position;
            body.style.overflow = 'hidden';
            loadingDiv.style.position = 'fixed';
        } else {
            let position = window.getComputedStyle(aim, null).getPropertyValue('position');
            if (position === 'static') {
                aim.style.position = 'relative';
                this.originPosition='relative';
                // this.changePosition = true;
            }
            if (['BUTTON', 'SPAN'].indexOf(aim.tagName) !== -1) {
                loadingDiv.className += ' '+cn('static').className ;
            }
        }
    }
    bodySpecialClose = (aim,loadingDiv) => {
        let body = window.document.body;
        if (aim === body) {
            body.style.overflow = this.originPosition||'auto';
            loadingDiv.style.position = 'absolute';
        } else if (this.originPosition !== null) {
            aim.style.position = this.originPosition;
            this.originPosition=null;
        }
    }
    componentDidMount() {
        let { aim } = this;
        let body = window.document.body;
        if (!aim) {
            aim = body;
        }
        if (typeof aim === 'string') { aim = document.querySelector(aim); }
        if (!aim) { aim = body; }
        this.bodySpecialOpen(aim, this.loadingDiv);
        if (aim) {
            aim.appendChild(this.loadingDiv);
        }
    }
    componentWillUnmount() {
        let { aim } = this;
        let body = window.document.body;
        if (!aim) {
            aim = body;
        }
        if (typeof aim === 'string') { aim = document.querySelector(aim); }
        if (!aim) { aim = body; }
        this.bodySpecialClose(aim, this.loadingDiv);
        if (aim) {
            if (this.loadingDiv.parentNode === aim) {
                aim.removeChild(this.loadingDiv);
            }
        }
    }
    render() {
        return ReactDOM.createPortal(
            <div {...cn(['figure','static-figure'])}>
                <Spin indicator={LoadingIcon} />
            </div>,
            this.loadingDiv
        );
    }
}


export default Loading;