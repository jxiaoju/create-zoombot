let removeArrayEmpty = (arr) => {
    let newArr = [];
    arr.forEach((str, ind) => {
        if (str !== undefined && str !== '') {
            newArr.push(str);
        }
    });
    return newArr;
};


let path = { //simple url
    _clearFormat(...paths) {
        let out = [];
        let lg = paths.length;
        paths.forEach((ph, index) => {
            if (!ph) { return; }
            if (ph[ph.length - 1] === '/') { ph = ph.slice(0, -1); }
            if (ph[0] === '/' && index !== 0) { ph = ph.slice(1); }
            out.push(ph);
        });
        return out;
    },
    _normalFormat(ph) {
        if (ph[0] === "/") { ph = ph.slice(1); }
        if (ph[ph.length - 1] === "/") { ph = ph.slice(0, -1); }
        return ph;
    },
    search(str) {
        if (!str) { return {}; }
        str = str.slice(1);
        let strArr = str.split('&');
        let out = {};
        strArr.forEach((item, ind) => {
            let arr = item.split('=');
            out[arr[0]] = arr[1];
        });
        return out;
    },
    remove(path1, path2) {
        let arrPath1 = path1.split('/');
        let arrPath2 = path2.split('/');
        arrPath1 = removeArrayEmpty(arrPath1);
        arrPath2 = removeArrayEmpty(arrPath2);
        let out = arrPath1.concat([]);
        let lg = arrPath1.length;
        for (let i = lg - 1; lg >= 0; lg -= 1) {
            if (arrPath2[i] === arrPath1[i]) { out.splice(i, 1); } else { break; }
        }
        return "/" + out.join("/");
    },
    relative(path1, path2) {
        let newP1 = this._normalFormat(path1);
        let newP2 = this._normalFormat(path2);
        let ind = newP1.indexOf(newP2);
        if (ind === -1) { return path1; }
        let out = '';
        out = newP1.slice(0, ind) + newP1.slice(newP2.length);
        return out;
    },

    join(...paths) {

        let out = this._clearFormat(...paths);
        let ph = '';
        ph = out.join('/');
        if (ph[0] !== '/') { ph = '/' + ph; }

        return ph;
    }


}

export default path;