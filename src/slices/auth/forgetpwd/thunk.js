import {userForgetPasswordSuccess, userForgetPasswordError} from "./reducer"
import {RECOVERY_EMAIL} from "../../../helpers/url_helper";
import api from "../../../api";

export const userForgetPassword = (email) => async (dispatch) => {
    const error = () => dispatch(userForgetPasswordError("Сталась помилка :/ Перевірте правильність введеної пошти та спробуйте знову."))
    try {

        const data = await api.post(RECOVERY_EMAIL, {email})
        console.log({data})
        if (data.status === 200) {
            dispatch(userForgetPasswordSuccess(
                "Вітаю! Новий пароль надісланий на вашу пошту."
            ))
        } else error()
    } catch (forgetError) {
        console.log({forgetError})
        error()
    }
}
