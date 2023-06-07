import { apiAxiosInstance } from '../helpers/axios'
import { user_constants } from './constants'

export const foodList = (foodTitle) => {
  console.log('searching....')
  return async (dispatch) => {
    dispatch({
      type: user_constants.FOOD_LIST_REQUEST,
    })
    const res = await apiAxiosInstance.get(
      `/search?q=${foodTitle}&app_id=edf97c8d&app_key=e6569539d403bd3727030a61decea576`
    )
    console.log(res)
    if (res.status === 200) {
      const foodlist = res.data
      console.log(foodlist)
      dispatch({
        type: user_constants.FOOD_LIST_SUCCESS,
        payload: { message: foodlist },
      })
    } else {
      dispatch({
        type: user_constants.FOOD_LIST_FAILURE,
        payload: { error: res.data.error },
      })
    }
  }
}
