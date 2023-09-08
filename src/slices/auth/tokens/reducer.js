import {createSlice} from "@reduxjs/toolkit";

const accessToken = window.sessionStorage.getItem('accessToken') ? window.sessionStorage.getItem('accessToken') : null
const refreshToken = window.localStorage.getItem('refreshToken') ? window.localStorage.getItem('refreshToken') : null

export const initialState = {
    accessToken, refreshToken
};

const loginSlice = createSlice({
    name: "tokens",
    initialState,
    reducers: {
        setTokens(state, action) {
            const {accessToken, refreshToken} = action.payload
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
        },

    },
});

export const {setTokens} = loginSlice.actions

export default loginSlice.reducer;
