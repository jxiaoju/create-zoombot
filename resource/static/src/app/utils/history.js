import pathObj from './path.js';

let historyApi = {
    state: {
        data: null,
        lastPath: null
    },
    getSearch() {
        let { history } = this.props;
        if(!history){return;}
        if (!history.location) { return; }
        let { search } = history.location;
        let searchOb = pathObj.search(search); //change to object
        return searchOb;
    },
    getAppPath() {
        return this.props.prefix;
    },
    getPath() {
        let { history } = this.props;
        if(!history){return;}
        let { pathname } = history.location;
        let prePath = this.getAppPath();
        let currentPath = pathObj.relative(pathname, prePath);
        return currentPath;
    },
    getData() {
        let { history } = this.props;
        if(!history){return;}
        let { state } = history.location;
        return state;
    },
    getLastPath() {
        return this.state.lastPath;
    },
    pushState(path, data) {
        let { history } = this.props;
        if(!history){return;}
        let { pathname } = history.location;
        let prePath = this.getAppPath();
        // console.log(1212121, prePath)
        let currentPath = pathObj.relative(pathname, prePath);
        // if (config && config.template) { path = "/" + pathObj.join(prePath, path); }
        path = pathObj.join(prePath, path);
        this.state = Object.assign(this.state, { lastPath: currentPath });
        history.push(path, data);
    },
    props: {
        history: null,
        location: null,
        match: null,
        prefix: ''
    }
};




historyApi.decorate = function({ history, location, match, config={} }) {
    if (history) {
        let { state, pathname, search } = location;
        let { params, url } = match;
        let { props } = historyApi;
        historyApi.props = Object.assign(props, {
            history,
            location,
            match
        });
    }
    // if (prefix) {
    //     historyApi.props.prefix = prefix;
    // }

};



export default historyApi;