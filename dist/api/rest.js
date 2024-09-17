"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRest = useRest;
exports.useRestPost = useRestPost;
exports.useRestGet = useRestGet;
exports.useRestPut = useRestPut;
exports.useRestDelete = useRestDelete;
exports.useRestPatch = useRestPatch;
const state_1 = require("../state");
function sendRequest(method, url, data, extract) {
    return fetch(url, {
        method,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then((data) => {
        let result = undefined;
        if (extract instanceof Function) {
            result = extract(data);
        }
        else if (typeof extract === "string") {
            result = data[extract];
        }
        else {
            result = data;
        }
        return result;
    })
        .catch((err) => {
        console.error(err);
        throw err;
    });
}
function useRest(params, method, url, data, extract) {
    params.initialState = sendRequest(method, url, data, extract);
    return (0, state_1.useStore)(params);
}
function useRestPost(params, url, data, extract) {
    return useRest(params, "POST", url, data, extract);
}
function useRestGet(params, url, data, extract) {
    return useRest(params, "GET", url, data, extract);
}
function useRestPut(params, url, data, extract) {
    return useRest(params, "PUT", url, data, extract);
}
function useRestDelete(params, url, data, extract) {
    return useRest(params, "DELETE", url, data, extract);
}
function useRestPatch(params, url, data, extract) {
    return useRest(params, "PATCH", url, data, extract);
}
