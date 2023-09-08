export function getLocalAccessToken() {
    return window.localStorage.getItem("accessToken");
}

export function getLocalRefreshToken() {
    return window.localStorage.getItem("refreshToken");
}
