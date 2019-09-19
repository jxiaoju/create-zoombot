import React from 'react';
import { hot } from 'react-hot-loader';
import './app.scss';
import Welcome from './page/Welcome';
import Config from './page/Config';
import Error from './page/Error';
import ConfigNotifications from './page/ConfigNotifications';
import ScopeLoading from '@components/ScopeLoading';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import utils from './utils';

class App extends React.Component {
  constructor(props) {
    super(props);
    let { location, history, match } = props;
    utils.history.decorate({
      //inject history service
      history,
      location,
      match
    });
  }

  render() {
    return (<React.Fragment>
      <Switch>
        <Route path={`/${process.env.app}/page/welcome`} key='1' render={()=>{
          return <Welcome/>;
        }}></Route>
        <Route path={`/${process.env.app}/page/configNotifications`} key='2' render={()=>{
          return <ConfigNotifications/>;
        }}></Route>
        <Route path={`/${process.env.app}/page/config`} key='3' render={()=>{
          return <Config/>;
        }}></Route>
        <Route path={`/${process.env.app}/page/error`} key='4' render={()=>{
          return <Error/>;
        }}></Route>
      <Route render={()=>{
        return <Error/>;
      }}></Route>
      </Switch>
    <ScopeLoading /></React.Fragment>);
  }
}

let NewApp = withRouter(App);

if (process.env.NODE_ENV === 'development' && process.env.HOT === true) {
  NewApp = hot(module)(NewApp);
}

export default NewApp;
