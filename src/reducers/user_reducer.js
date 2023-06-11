import { user_constants } from '../actions/constants'

const initState = {
  error: null,
  message: '',
  exists: false,
  mealPlan: [],
  selectedFood: {},
  loading: false,
  reload: true,
}

export default function user_reducer(state = initState, action) {
  switch (action.type) {
    case user_constants.FOOD_LIST_REQUEST:
      state = {
        ...state,
        loading: true,
      }
      break
    case user_constants.FOOD_LIST_SUCCESS:
      state = {
        ...state,
        loading: false,
        selectedFood: action.payload.selectedFood,
      }
      break
    case user_constants.FOOD_LIST_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      }
      break
    case user_constants.MEAL_PLAN_EXISTS_REQUEST:
      state = {
        ...state,
        loading: true,
      }
      break
    case user_constants.MEAL_PLAN_EXISTS_SUCCESS:
      state = {
        ...state,
        exists: action.payload.exists,
      }
      break
    case user_constants.MEAL_PLAN_EXISTS_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.error,
      }
      break
    case user_constants.GET_MEAL_PLAN_REQUEST:
      state = {
        ...state,
        loading: true,
      }
      break
    case user_constants.GET_MEAL_PLAN_SUCCESS:
      state = {
        ...state,
        loading: false,
        mealPlan: action.payload.mealPlan,
      }
      break

    case user_constants.CREATE_MEAL_PLAN_REQUEST:
      console.log(action)
      state = {
        ...state,
        loading: true,
      }
      break
    case user_constants.CREATE_MEAL_PLAN_SUCCESS:
      console.log(action)
      state = {
        ...state,
        loading: true,
      }
      break
    case user_constants.CREATE_MEAL_PLAN_FAILURE:
      console.log(action)
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      }
      break

    case user_constants.UPDATE_MEAL_PLAN_REQUEST:
      console.log(action)
      state = {
        ...state,
        loading: true,
      }
      break
    case user_constants.UPDATE_MEAL_PLAN_SUCCESS:
      console.log(action)
      state = {
        ...state,
        loading: false,
        mealPlan: action.payload.mealPlan,
      }
      break
    case user_constants.UPDATE_MEAL_PLAN_FAILURE:
      console.log(action)
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      }
      break
    default:
      console.log(action)
  }

  return state
}
