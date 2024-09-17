import * as REST from "./rest";
export declare const useAPI: {
    REST: {
        _: typeof REST.useRest;
        get: typeof REST.useRestGet;
        post: typeof REST.useRestPost;
        put: typeof REST.useRestPut;
        patch: typeof REST.useRestPatch;
        delete: typeof REST.useRestDelete;
    };
};
