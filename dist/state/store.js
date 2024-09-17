"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stores = void 0;
exports.createStore = createStore;
exports.triggerStore = triggerStore;
exports.getStore = getStore;
exports.storeExists = storeExists;
exports.setStore = setStore;
exports.deleteStore = deleteStore;
const action_1 = require("./action");
const middleware_1 = require("./middleware");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Store = {};
window.addEventListener("storage", (event) => {
    if (event.key && event.key.startsWith("store-")) {
        const storeName = event.key.split("store-")[1];
        const store = getStore(storeName);
        try {
            const newState = JSON.parse(event.newValue);
            if (store && store.state !== newState) {
                setStore(storeName, newState);
            }
        }
        catch (e) {
            console.error(e);
        }
    }
});
function localStorageName(storeName) {
    return `store-${storeName}`;
}
function setupStore(params) {
    if (Store[params.storeName]) {
        console.error(`Store with name ${params.storeName} already exists. Recreating...`);
    }
    const newStoreData = {
        state: params.initialState,
        persistent: params.persistent || false,
        subscribers: [],
        middleware: [],
        actions: {},
    };
    if (params.persistent) {
        const storedState = localStorage.getItem(localStorageName(params.storeName));
        if (storedState) {
            try {
                newStoreData.state = JSON.parse(storedState);
            }
            catch (_a) {
                newStoreData.state = params.initialState;
            }
        }
    }
    else {
        localStorage.removeItem(localStorageName(params.storeName));
    }
    Store[params.storeName] = newStoreData;
}
function createStore(params) {
    if (params.asyncState && params.initialState instanceof Promise) {
        setupStore(Object.assign(Object.assign({}, params), { initialState: undefined }));
        params.initialState.then((result) => {
            setStore(params.storeName, result);
        });
    }
    else {
        setupStore(Object.assign(Object.assign({}, params), { initialState: params.initialState }));
    }
    if (params.actions) {
        (0, action_1.addActions)(params.storeName, params.actions);
    }
    if (params.middleware) {
        if (Array.isArray(params.middleware)) {
            (0, middleware_1.addMiddlewares)(params.storeName, params.middleware);
        }
        else {
            (0, middleware_1.addMiddleware)(params.storeName, params.middleware);
        }
    }
}
function triggerStore(storeName) {
    const store = Store[storeName];
    store.subscribers.forEach((subscriber) => {
        subscriber(store.state);
    });
}
function getStore(storeName) {
    return Store[storeName];
}
function storeExists(storeName) {
    return Store[storeName] !== undefined;
}
function setStoreData(storeName, newState) {
    const store = getStore(storeName);
    store.state = newState;
    if ((0, middleware_1.hasMiddleware)(storeName)) {
        newState = (0, middleware_1.handleMiddleware)(storeName, newState);
    }
    if (store.persistent) {
        localStorage.setItem(localStorageName(storeName), JSON.stringify(newState));
    }
    triggerStore(storeName);
}
function setStore(storeName, newState) {
    if (newState instanceof Promise) {
        newState.then((result) => {
            setStoreData(storeName, result);
        });
    }
    else {
        setStoreData(storeName, newState);
    }
}
function deleteStore(storeName) {
    localStorage.removeItem(localStorageName(storeName));
    delete Store[storeName];
}
exports.stores = Object.keys(Store)[Symbol.iterator]();
