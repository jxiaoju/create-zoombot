import React from 'react';
import './index.scss';
// import { Button,message} from 'antd';
import BotConnect from '@components/BotConnect';
// import utils from '@utils';
import logo from '@assets/images/ZoomLogo.png';
import rcClass from 'rc-class';
import pageConf from '@pageConfig';

let pageConfig=pageConf||{};

let cn=rcClass('article');

let title,description,thirdpartIcon;

let {welcome:welcomeContent}=pageConfig;

if(typeof welcomeContent==='object'){
  title=welcomeContent.title;
  description=welcomeContent.description;
  thirdpartIcon=welcomeContent.thirdpartIcon;
}

class Welcome extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div {...cn()}>
        <div {...cn('header')}>
          <div {...cn('header-content')}>
            <a href='https://zoom.us/' title='go to zoom site'>
              <img
                {...cn(null,'zoom-logo')}
                alt='zoom'
                src={logo}
              />
            </a>
          </div>
        </div>
        <div {...cn('content')}>
        <BotConnect
          title={title}
          subtitle={description}
          fromIcon={{
              alt:'zoom app',
              src:
                'https://d24cgw3uvb9a9h.cloudfront.net/static/93516/image/oauth2/zoom.png'
            }}
          toIcon={{
              alt:'connected app',
              src:thirdpartIcon
            }}
          status="success"
          />
        </div>
     
      </div>
    );
  }
}

export default Welcome;
