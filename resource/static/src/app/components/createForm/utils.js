let parseKeys = str => {
  if (!(typeof str === 'string')) {
    return [str];
  }
  let start = 0,
    temp,
    inNo = 0,
    collect = '';
  let lg = str.length;
  let i = 0;
  let out = [];
  for (; i < lg; i += 1) {
    temp = str[i];
    if (temp === '.') {
      if (collect !== '') {
        out.push(collect);
        collect = '';
        start = i + 1;
        inNo = 0;
      }
    } else if (temp === '[') {
      inNo += 1;
      if (collect !== '') {
        out.push(collect);
        collect = '';
        start = i + 1;
      }
    } else if (temp === ']') {
      inNo -= 1;
      if (inNo !== 0) {
        throw `${str} format error`;
        // return;
      }
      if (collect !== '') {
        out.push(+collect);
        collect = '';
        start = i + 1;
      }
    } else {
      collect += temp;
    }
  }

  if (start < lg) {
    out.push(collect);
  }

  return out;
};

let setValueFromArrayKey = (
  obj,
  arr,
  value,
  extend = false,
  create = false
) => {
  //mutable
  let newArr = arr.concat([]);
  let lastKey = newArr.pop();
  let out = obj;

  for (let [key, val] of newArr.entries()) {
    if (Array.isArray(out)) {
      if (out[val]) {
        out = out[val];
      } else {//no exit value
        if (create === 'create') {
          typeof newArr[key + 1] === 'number'
            ? (out=out[val] = [])
            : (out=out[val] = {});
        } else {
          return false;
        }
      }
    } else if (['function', 'object'].indexOf(typeof out) !== -1) {
      if (val in out) {
        out = out[val];
      } else {
        if (create === 'create') {
          typeof newArr[key + 1] === 'number'
            ? (out=out[val] = [])
            : (out=out[val] = {});
        } else {
          return false;
        }
      }
    } else {
      return false;
    }
  }

  if (['function', 'object'].indexOf(typeof out) === -1) {
    return false;
  }

//extend will create new object
  if (extend === 'extend') {
    let outObj = out[lastKey];
    if (!(lastKey in out) && create === 'create') {
      outObj = out[lastKey] = {};
    }

    if (typeof outObj === 'object' && typeof value === 'object') {
      out[lastKey] = Object.assign(outObj, value);
      return true;
    } else {
      return false;
    }
  }
  out[lastKey] = value;
  return true;
};

let getUniqueValueFromArrayKey = (obj, arr) => {
  let out = obj;
  for (let val of arr) {
    if (Array.isArray(out)) {
      if (out[val]) {
        out = out[val];
      } else {
        break;
      }
    } else if (typeof out === 'object') {
      if (val in out) {
        out = out[val];
      } else {
        break;
      }
    } else {
      return out;
    }
  }
  if (out === obj) {
    return;
  } else {
    return out;
  }
};

let handleError = err => {
  //template use console,not use throw
  console.error(err);
};

export default {
    parseKeys,
    setValueFromArrayKey,
    getUniqueValueFromArrayKey,
    handleError
};