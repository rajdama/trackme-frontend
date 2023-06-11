import { apiAxiosInstance, serverAxiosInstance } from '../helpers/axios'
import { user_constants } from './constants'

export const foodList = (foodTitle) => {
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
        payload: { selectedFood: foodlist },
      })
    } else {
      dispatch({
        type: user_constants.FOOD_LIST_FAILURE,
        payload: { error: res.data.error },
      })
    }
  }
}

export const mealPlanExists = (userId) => {
  return async (dispatch) => {
    dispatch({
      type: user_constants.MEAL_PLAN_EXISTS_REQUEST,
    })
    const res = await serverAxiosInstance.post(`/mealPlanExists`, {
      userId,
    })

    if (res.status === 200) {
      dispatch({
        type: user_constants.MEAL_PLAN_EXISTS_SUCCESS,
        payload: { exists: res.data },
      })
    } else {
      dispatch({
        type: user_constants.MEAL_PLAN_EXISTS_FAILURE,
        payload: { error: res.data.error },
      })
    }
  }
}

export const createMealPlan = (food, period, userId) => {
  return async (dispatch) => {
    dispatch({
      type: user_constants.CREATE_MEAL_PLAN_REQUEST,
    })
    const res = await serverAxiosInstance.post(`/createMealPlan`, {
      food,
      period,
      userId,
    })
    console.log(res)
    if (res.status === 200) {
      dispatch({
        type: user_constants.CREATE_MEAL_PLAN_SUCCESS,
        payload: { message: 'Meal Plan Created' },
      })
    } else {
      dispatch({
        type: user_constants.CREATE_MEAL_PLAN_FAILURE,
        payload: { error: res.data.error },
      })
    }
  }
}

export const updateMealPlan = (food, period, userId) => {
  return async (dispatch) => {
    dispatch({
      type: user_constants.UPDATE_MEAL_PLAN_REQUEST,
    })
    const res = await serverAxiosInstance.post(`/updateMealPlan`, {
      food,
      period,
      userId,
    })
    console.log(res)
    const parsedMealPlan = JSON.parse(res.data.mealPlan)
    if (res.status === 200) {
      dispatch({
        type: user_constants.UPDATE_MEAL_PLAN_SUCCESS,
        payload: { mealPlan: parsedMealPlan },
      })
    } else {
      dispatch({
        type: user_constants.UPDATE_MEAL_PLAN_FAILURE,
        payload: { error: res.data.error },
      })
    }
  }
}

export const getMealPlan = (userId) => {
  return async (dispatch) => {
    dispatch({
      type: user_constants.GET_MEAL_PLAN_REQUEST,
    })
    const res = await serverAxiosInstance.post(`/getMealPlan`, {
      userId,
    })
    console.log(res.data)
    if (res.status === 200) {
      dispatch({
        type: user_constants.GET_MEAL_PLAN_SUCCESS,
        payload: { mealPlan: res.data },
      })
    } else {
      dispatch({
        type: user_constants.GET_MEAL_PLAN_FAILURE,
        payload: { error: res.data.error },
      })
    }
  }
}
