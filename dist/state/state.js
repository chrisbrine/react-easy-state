"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStore = useStore;
const react_1 = require("react");
const store_1 = require("./store");
const params_1 = require("./params");
const action_1 = require("./action");
const middleware_1 = require("./middleware");
function useStore(params, initialState) {
    const data = (typeof params === "string"
        ? (0, params_1.handleParameters)(params, initialState)
        : (0, params_1.handleParameters)(params));
    let store = (0, store_1.getStore)(data.storeName);
    if (!store) {
        if (!params) {
            throw new Error(`Store ${data.storeName} does not exist`);
        }
        (0, store_1.createStore)(data);
        store = (0, store_1.getStore)(data.storeName);
    }
    const subscriber = (0, react_1.useState)(store.state)[1];
    const setState = (newState) => {
        if ((0, middleware_1.hasMiddleware)(data.storeName)) {
            newState = (0, middleware_1.handleMiddleware)(data.storeName, newState);
        }
        (0, store_1.setStore)(data.storeName, newState);
    };
    (0, react_1.useEffect)(() => {
        store.subscribers.push(subscriber);
        return () => {
            store.subscribers = store.subscribers.filter((li) => li !== subscriber);
        };
    }, [subscriber]);
    const actions = Object.values((0, action_1.getActions)(data.storeName));
    return [store.state, setState, ...actions];
}
