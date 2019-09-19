import React from 'react';
// import ismobile from 'ismobilejs';
import './index.scss';
import rcClass from 'rc-class';
import { Icon } from 'antd';

let cn = rcClass('bot-connect');

let BotConnect = props => {
  let { fromIcon, toIcon, status = 'normal',title,subtitle } = props;
  if (typeof fromIcon === 'string') {
    fromIcon = { src: fromIcon, alt: 'first app' };
  }
  if (typeof toIcon === 'string') {
    toIcon = { src: toIcon, alt: 'second app' };
  }
  let iconType = 'check-circle';
  if (status === 'success') {
    iconType = 'check-circle';
  } else if (status === 'error') {
    iconType = 'close-circle';
  } else if (status === 'warn') {
    iconType = 'info-circle';
  }

  return (
    <div {...cn([''])}>
    <div {...cn('figure')}>
      <a
        href={fromIcon.href ? fromIcon.href : undefined}
        target={fromIcon.target?fromIcon.target:'_self'}
        style={{ cursor: fromIcon.href ? 'pointer' : 'auto' }}
        {...cn('app-icon')}
      >
        <img src={fromIcon.src} alt={fromIcon.alt} />
      </a>

      {status!=='normal'&&<span {...cn(['status'])}>
        {/* <Icon type="ellipsis" {...cn('ellipsis')} /> */}
        {/* <span {...cn('ellipsis')}>. . .</span> */}
        <Icon type='ellipsis' {...cn('ellipsis')} />
        <Icon type={iconType} {...cn(['normal'], [`${status}-status`])} />
        {/* <Icon type="ellipsis" {...cn(['ellipsis'])} /> */}
        <Icon type='ellipsis' {...cn('ellipsis')} />
      </span>}

      {status==='normal'&&<span {...cn(['status'])}>
      <Icon type="swap" {...cn('swap')}/>
      </span>}

      <a
        target={toIcon.target?toIcon.target:'_self'}
        href={toIcon.href ? toIcon.href : undefined}
        {...cn('app-icon')}
        style={{ cursor: toIcon.href ? 'pointer' : 'auto' }}
      >
        <img src={toIcon.src} alt={toIcon.alt} />
      </a>
      </div>

      {title&&<div {...cn('title')}>{title}</div>}
      {subtitle&&<div {...cn('subtitle')}>{subtitle}</div>}
      
    </div>
  );
};

export default BotConnect;
