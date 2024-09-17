"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createActions = exports.getActions = exports.removeActions = exports.removeAction = exports.addActions = exports.addAction = void 0;
const store_1 = require("./store");
const addAction = (storeName, name, action) => {
    const store = (0, store_1.getStore)(storeName);
    store.actions[name] = (...args) => {
        const newState = action(store.state, ...args);
        (0, store_1.setStore)(storeName, newState);
    };
};
exports.addAction = addAction;
const addActions = (storeName, actions) => {
    Object.entries(actions).forEach(([name, action]) => (0, exports.addAction)(storeName, name, action));
};
exports.addActions = addActions;
const removeAction = (storeName, name) => {
    const store = (0, store_1.getStore)(storeName);
    delete store.actions[name];
};
exports.removeAction = removeAction;
const removeActions = (storeName, names) => {
    names.forEach((name) => (0, exports.removeAction)(storeName, name));
};
exports.removeActions = removeActions;
const getActions = (storeName) => {
    return (0, store_1.getStore)(storeName).actions;
};
exports.getActions = getActions;
const createActions = (...args) => {
    const result = {};
    args.forEach(([name, action]) => {
        result[name] = action;
    });
    return result;
};
exports.createActions = createActions;
