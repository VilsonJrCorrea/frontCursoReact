import axios from "axios";
import {toast} from "react-toastify";
import logService from "./logService";

axios.interceptors.response.use(null, error => {
    const expectedError = error.response && error.response.status >= 400 && error < 500;
    if (!expectedError) {
        logService.log(error);
        toast("An unexpected error occurred!");
    }
    return Promise.reject(error)
});

export function setJwt(jwt) {
    axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    setJwt
}