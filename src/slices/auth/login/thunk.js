//Include Both Helper File with needed methods
import {getFirebaseBackend} from "../../../helpers/firebase_helper";
import {loginSuccess, logoutUserSuccess, apiError, reset_login_flag} from './reducer';
import api from '../../../api/index'
import {GET_USER, LOGIN} from "../../../helpers/url_helper";

export const loginUser = (user, history) => async (dispatch) => {
    const error = () => dispatch(apiError({data: 'Помилка входу :/'}))
    try {
        const {username, password} = user
        const tokens = await api.post(LOGIN, {username, password})
        console.log({tokens})
        if (tokens.status === 200) {
            window.localStorage.setItem('accessToken', tokens.data.access)
            window.localStorage.setItem('refreshToken', tokens.data.refresh)
            const user = await api.get(GET_USER)
            if (user.status === 200) {
                console.log({user})
                sessionStorage.setItem("authUser", JSON.stringify(user.data));
                dispatch(loginSuccess(user.data))
                history('/main')
            } else error()

        } else error()
    } catch (err) {
        error()
    }
};

export const logoutUser = () => async (dispatch) => {
    try {
        sessionStorage.removeItem("authUser");
        let fireBaseBackend = getFirebaseBackend();
        if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
            const response = fireBaseBackend.logout;
            dispatch(logoutUserSuccess(response));
        } else {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
            dispatch(logoutUserSuccess(true));
        }

    } catch (error) {
        dispatch(apiError(error));
    }
};

export const socialLogin = (type, history) => async (dispatch) => {
    try {
        let response;

        if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
            const fireBaseBackend = getFirebaseBackend();
            response = fireBaseBackend.socialLoginUser(type);
        }
        //  else {
        //   response = postSocialLogin(data);
        // }

        const socialdata = await response;
        if (socialdata) {
            sessionStorage.setItem("authUser", JSON.stringify(response));
            dispatch(loginSuccess(response));
            history('/main')
        }

    } catch (error) {
        dispatch(apiError(error));
    }
};

export const resetLoginFlag = () => async (dispatch) => {
    try {
        const response = dispatch(reset_login_flag());
        return response;
    } catch (error) {
        dispatch(apiError(error));
    }
};
