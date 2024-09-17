"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleParameters = handleParameters;
function handleParameters(params, initialState) {
    if (typeof params === "string") {
        params = {
            storeName: params,
            initialState: initialState,
        };
    }
    if (typeof params.initialState === "function") {
        params.initialState = params.initialState();
    }
    const result = Object.assign(Object.assign({}, params), { initialState: params.initialState, asyncState: false });
    if (result.initialState instanceof Promise) {
        result.asyncState = true;
    }
    return result;
}
