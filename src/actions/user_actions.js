import {
  excerciseApiAxiosInstance,
  foodApiAxiosInstance,
  imageApiAxiosInstance,
  serverAxiosInstance,
} from '../helpers/axios'
import { user_constants } from './constants'

export const foodList = (foodTitle) => {
  return async (dispatch) => {
    dispatch({
      type: user_constants.FOOD_LIST_REQUEST,
    })
    const res = await foodApiAxiosInstance.get(
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

export const getExcerciseImage = (excerciseName) => {
  return async (dispatch) => {
    dispatch({
      type: user_constants.GET_EXCERCISE_IMAGE_REQUEST,
    })
    const res = await imageApiAxiosInstance.get(
      `?key=37195839-4b03055c351413a0b273e2574&q=${excerciseName}&image_type=photo`
    )
    if (res.status === 200) {
      dispatch({
        type: user_constants.GET_EXCERCISE_IMAGE_SUCCESS,
        payload: { images: res.data.hits[0] },
      })
    } else {
      dispatch({
        type: user_constants.GET_EXCERCISE_IMAGE_FAILURE,
        payload: { error: res.data.error },
      })
    }
  }
}

export const getExcerciseCalories = (excercise, duration) => {
  return async (dispatch) => {
    dispatch({
      type: user_constants.GET_EXCERCISE_CALORIES_REQUEST,
    })
    const res = await excerciseApiAxiosInstance.post('v2/natural/exercise', {
      query: `${excercise} for ${duration} minutes`,
    })
    console.log(res)
    if (res.status === 200) {
      dispatch({
        type: user_constants.GET_EXCERCISE_CALORIES_SUCCESS,
        payload: { excerciseInfo: res.data },
      })
    } else {
      dispatch({
        type: user_constants.GET_EXCERCISE_CALORIES_FAILURE,
        payload: { error: res.data.error },
      })
    }
  }
}

export const createExcercisePlan = (excercise, userId) => {
  return async (dispatch) => {
    dispatch({
      type: user_constants.CREATE_EXCERCISE_PLAN_REQUEST,
    })
    const res = await serverAxiosInstance.post('/createExcercisePlan', {
      excercise,
      userId,
    })

    console.log(res.data)

    if (res.status === 200) {
      dispatch({
        type: user_constants.CREATE_EXCERCISE_PLAN_SUCCESS,
        payload: { excercisePlan: res.data },
      })
    } else {
      dispatch({
        type: user_constants.CREATE_EXCERCISE_PLAN_FAILURE,
        payload: { error: res.data.error },
      })
    }
  }
}

export const getExcercisePlan = (userId) => {
  return async (dispatch) => {
    dispatch({
      type: user_constants.GET_EXCERCISE_PLAN_REQUEST,
    })
    const res = await serverAxiosInstance.post(`/getExcercisePlan`, {
      userId,
    })
    console.log(res.data)
    if (res.status === 200) {
      dispatch({
        type: user_constants.GET_EXCERCISE_PLAN_SUCCESS,
        payload: { excercisePlan: res.data },
      })
    } else {
      dispatch({
        type: user_constants.GET_EXCERCISE_PLAN_FAILURE,
        payload: { error: res.data.error },
      })
    }
  }
}

export const excercisePlanExists = (userId) => {
  return async (dispatch) => {
    dispatch({
      type: user_constants.EXCERCISE_PLAN_EXISTS_REQUEST,
    })
    const res = await serverAxiosInstance.post(`/excercisePlanExist`, {
      userId,
    })

    if (res.status === 200) {
      dispatch({
        type: user_constants.EXCERCISE_PLAN_EXISTS_SUCCESS,
        payload: { excercisePlanExist: res.data },
      })
    } else {
      dispatch({
        type: user_constants.EXCERCISE_PLAN_EXISTS_FAILURE,
        payload: { error: res.data.error },
      })
    }
  }
}

export const updateExcercisePlan = (excercise, userId) => {
  return async (dispatch) => {
    dispatch({
      type: user_constants.UPDATE_EXCERCISE_PLAN_REQUEST,
    })
    const res = await serverAxiosInstance.post(`/updateExcercisePlan`, {
      excercise,
      userId,
    })
    console.log(res.data)
    if (res.status === 200) {
      dispatch({
        type: user_constants.UPDATE_EXCERCISE_PLAN_SUCCESS,
        payload: { excercisePlan: res.data },
      })
    } else {
      dispatch({
        type: user_constants.UPDATE_EXCERCISE_PLAN_FAILURE,
        payload: { error: res.data.error },
      })
    }
  }
}
