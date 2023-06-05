import { auth_constants } from "./constants"
import axios from "../helpers/axios"
export const login = (user) => {
    console.log(user)
    return async (dispatch) => {
        dispatch({ type: auth_constants.LOGIN_REQUEST })
        const res = await axios.post("/signin", {
            ...user
        })

        if (res.status === 200) {
            const { token, user } = res.data
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
            dispatch({
                type: auth_constants.LOGIN_SUCCESS,
                payload: {
                    token, user
                }
            })
        }
        else {
            if (res.status === 400) {
                dispatch({
                    type: auth_constants.LOGIN_FAILURE,
                    payload: { error: res.data.error }
                })
            }
        }
    }
}

export const isUserLoggedIn = () => {
    return async (dispatch) => {
        const token = localStorage.getItem("token")
        console.log(token)
        if (token) {
            const user = JSON.parse(localStorage.getItem("user"))
            dispatch({
                type: auth_constants.LOGIN_SUCCESS,
                payload: {
                    token, user
                }
            })
        }
        else {

            dispatch({
                type: auth_constants.LOGIN_FAILURE,
                payload: { error: "login failed !!" }
            })

        }
    }
}

export const signout = () => {
    return async dispatch => {
        localStorage.clear()
        dispatch({
            type: auth_constants.LOGOUT_REQUEST
        })
    }
}