import {createSlice} from "@reduxjs/toolkit";

export const initialState = {
    user: {},
    error: "", // for error message
    loading: false,
    isUserLogout: false,
    errorMsg: false, // for error
    showInfoModal: false
};

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        apiError(state, action) {
            state.error = action.payload.data;
            state.loading = true;
            state.isUserLogout = false;
            state.errorMsg = true;
        },
        loginSuccess(state, action) {
            const user = action.payload
            state.user = user
            state.loading = false;
            state.errorMsg = false;
            const userLoginDate = new Date(user.date_joined)
            const nowDate = new Date()
            const isNewUser = (nowDate.getTime() - userLoginDate.getTime()) <= 2_629_746_000 // 2_629_746_000    = 1 month

            if (isNewUser) {
                state.showInfoModal = true
            }
        },
        closeInfoModal(state, action) {
            state.showInfoModal = false
        },
        logoutUserSuccess(state, action) {
            state.isUserLogout = true
        },
        reset_login_flag(state) {
            state.error = null
            state.loading = false;
            state.errorMsg = false;
        }
    },
});

export const {
    apiError,
    loginSuccess,
    logoutUserSuccess,
    reset_login_flag,
    closeInfoModal
} = loginSlice.actions

export default loginSlice.reducer;
