import React from 'react';
import observer from './loadingObserver';
import Loading from './Loading';

class ScopeLoading extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loadingObject: {} //{aimKey:null}
        };
    }
    loadingFunc = obj => {
        this.setState({ loadingObject: obj });
    };
    componentDidMount() {
        this._ismounted = true;
        observer.decorate(this.loadingFunc, 'add');
    }
    componentWillUnmount() {
        this._ismounted = false;
        observer.decorate(this.loadingFunc, 'remove');
    }
    render(){
        let loadingObject=this.state.loadingObject;
        return (
            <React.Fragment>
                {Object.keys(loadingObject).map((key, ind) => {
                    let aim = loadingObject[key];
                    return <Loading hide={false} aim={aim} key={ind} />;
                })}
            </React.Fragment>
        );
    }
};

export {Loading};
export {observer};
export default ScopeLoading;