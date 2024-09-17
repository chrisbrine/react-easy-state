import * as REST from "./rest";

export const useAPI = {
  REST: {
    _: REST.useRest,
    get: REST.useRestGet,
    post: REST.useRestPost,
    put: REST.useRestPut,
    patch: REST.useRestPatch,
    delete: REST.useRestDelete,
  },
};
