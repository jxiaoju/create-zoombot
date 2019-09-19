import React from 'react';
import rcClass from 'rc-class';
import './index.scss';
import logo from '../../../assets/images/ZoomLogo.png';
let cn=rcClass('header');

let Header=()=>{

return (
    <div {...cn('')}>
    <div {...cn('content')}>
      <a href='https://zoom.us/' title='go to zoom site'>
        <img
          {...cn(null,'zoom-logo')}
          alt='zoom'
          src={logo}
        />
      </a>
    </div>
  </div>

);


};

export default Header;