import {userForgetPasswordSuccess, userForgetPasswordError} from "./reducer"
import {RECOVERY_EMAIL} from "../../../helpers/url_helper";
import api from "../../../api";
import axios from "axios";

export const userForgetPassword = (email) => async (dispatch) => {
    const error = () => dispatch(userForgetPasswordError("Користувач з вказаною електронною поштою не існує"))
    try {
        console.log({email, RECOVERY_EMAIL})
        const data = await api.post(RECOVERY_EMAIL, {email})
        console.log({data})
        if (data) {
            dispatch(userForgetPasswordSuccess(
                "Пароль відправлено."
            ))
        } else error()
    } catch (forgetError) {
        console.log({forgetError})
        error()
    }
}
