import React, {
    Component
} from 'react';
// import ismobile from 'ismobilejs';
import './index.scss';
import { Tooltip } from 'antd';
import rcClass from 'rc-class';

let isIos = function () {
    var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    return iOS;
  };

let cn=rcClass('copy');

class Copy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            copyStatus: false
        };
    }
    cpStore = (val) => {//创造一个textarea来复制
        let doc = window.document;
        var area = doc.createElement('textarea');
        var style = area.style;
        // style.display='none';
        style.position = 'fixed';
        style.overflow = 'hidden';
        // style.top="0px";
        area.setAttribute('readonly', 'readonly');
        style.width = '0px';
        style.height = '0px';
        style.opacity = 0;
        area.value = val;
        doc.body.appendChild(area);

        if (isIos()) {
            style.top = window.pageYOffset + 'px';
            let range = doc.createRange();
            range.selectNodeContents(area);
            let selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
            area.setSelectionRange(0, 99999);
        }
        else {
            area.select();
        }

        return function () {
            doc.body.removeChild(area);
        };
    }
    copyClick = (txt) => {
        if (!txt) { return; }
        let doc = window.document;

        let remove = this.cpStore(txt);
        doc.execCommand('copy');
        remove();//移除复制框

        this.setState({
            copyStatus: true
        });
        let { copyCallback, copyEnd, delay = 2000 } = this.props;

        if (typeof copyCallback === 'function') {
            copyCallback();
        }
        setTimeout(() => {
            this.setState({ copyStatus: false });
            if (typeof copyEnd === 'function') {
                copyEnd();
            }
        }, delay);
    }
    render() {
        let { style = {}, className = '' } = this.props;

        return (


            <Tooltip title="Copied" visible={this.state.copyStatus} onClick={() => { this.copyClick(this.props.copyText); }}>
                <span {...cn('copy-text',className)}  style={style ? style : {}}>{this.props.children || 'Copy'}</span>
            </Tooltip>


        );
    }
}

export default Copy;