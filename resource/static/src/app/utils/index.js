import axios from 'axios';
import {observer} from '@components/ScopeLoading';
import history from './history';
import path from './path';
// import path from 'path';


let request=(...props)=>{

    let ajaxSn = observer.add(null);
    let finishRequest = () => {
        observer.remove(ajaxSn);
    };
    return new Promise((resolve,reject)=>{
        axios(...props)
        .then((da)=>{
            finishRequest();
            if(typeof da==='object'){
                resolve(da.data);
            }
            else{
                resolve(da);
            }
        })
        .catch((error)=>{
            finishRequest();
            let out;
            if(typeof error==='object'&&error.response){
                out=error.response.data;
            }
            else{
                out=error;
            }
            reject(out);
            // reject(out);
        });
    });
};

let utils={
    request,
    path,
    history
};


export default utils;

