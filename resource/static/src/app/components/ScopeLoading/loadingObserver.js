let observer = {
    callbacks: [],
    store: {},
    sn: 0,
    run() {//run all callbacks
        let callbacks = this.callbacks;
        // console.log(callbacks,9999)
        callbacks.forEach((func) => {
            func(this.store);
        });
    },
    decorate(func, type = 'add') {//add funtion,
        let { callbacks } = this;
        let ind = callbacks.indexOf(func);
        if ((ind === -1) && type === 'add') {
            callbacks.push(func);
        } else if (type === 'remove' && (ind !== -1)) {
            callbacks.splice(ind, 1);
        }
    },
    add(aim) {//give a sn:domAim
        let { sn, store } = this;
        sn += 1;
        if (!(sn in store)) {
            this.sn = sn;
            store[sn] = aim;
            this.run();
            return sn;
        }
    },
    remove(sn) {//remove sn
        if (sn in this.store) {
            delete this.store[sn];
            this.run();
        }
    }
};


export default observer;