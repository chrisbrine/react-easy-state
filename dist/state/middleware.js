"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasMiddleware = exports.handleMiddleware = exports.addMiddlewares = exports.addMiddleware = void 0;
const store_1 = require("./store");
const addMiddleware = (storeName, middleware) => {
    const store = (0, store_1.getStore)(storeName);
    store.middleware.push(middleware);
};
exports.addMiddleware = addMiddleware;
const addMiddlewares = (storeName, middlewares) => {
    middlewares.forEach((middleware) => (0, exports.addMiddleware)(storeName, middleware));
};
exports.addMiddlewares = addMiddlewares;
const handleMiddleware = (storeName, state) => {
    const store = (0, store_1.getStore)(storeName);
    store.middleware.forEach((middleware) => (state = middleware(state)));
    return state;
};
exports.handleMiddleware = handleMiddleware;
const hasMiddleware = (storeName) => {
    const store = (0, store_1.getStore)(storeName);
    return store.middleware.length > 0;
};
exports.hasMiddleware = hasMiddleware;
