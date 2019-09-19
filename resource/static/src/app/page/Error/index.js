import React from 'react';
// import './home.scss';
import rcClass from 'rc-class';
import Error from '@components/Error';
import Header from '@components/Header';
import utils from '@utils';
let cn=rcClass('error-page');


class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let search=utils.history.getSearch();
    let {errorCode,errorMessage}=search;
    return (
      <div {...cn()}>
        <Header/>
        <Error errorMessage={errorMessage} errorCode={errorCode}/>
      </div>
    );
  }
}

export default Home;
