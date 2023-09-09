import axios from 'axios';
import {getLocalAccessToken, getLocalRefreshToken} from './tokens';
import {REFRESH} from "../helpers/url_helper";

// const REACT_APP_BASE_API_URL = process.env.REACT_APP_BASE_API_URL
const REACT_APP_BASE_API_URL = 'http://52.210.189.142/api/'
const api = axios.create({
    baseURL: REACT_APP_BASE_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config) => {
        const token = getLocalAccessToken();
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        console.log({config})
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


api.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        if (err.response) {
            if (err.response.status === 401 && !err.config._retry) {
                err.config._retry = true;

                try {
                    const rs = await refreshToken();
                    const {accessToken} = rs.data;
                    window.localStorage.setItem("accessToken", accessToken);
                    api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

                    return api(err.config);
                } catch (_error) {
                    if (_error.response && _error.response.data) {
                        return Promise.reject(_error.response.data);
                    }

                    return Promise.reject(_error);
                }
            }

            if (err.response.status === 403 && err.response.data) {
                return Promise.reject(err.response.data);
            }
        }

        return Promise.reject(err);
    }
);

export async function refreshToken() {
    return api.post(REFRESH, {
        refresh: getLocalRefreshToken(),
    });
}

export default api;
