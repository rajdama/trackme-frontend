import { user_constants } from '../actions/constants'

const initState = {
  error: null,
  message: '',
  exists: false,
  excercisePlanExist: false,
  goalLoading: false,
  mealPlan: [],
  excercisePlan: [],
  currentMonthPlan: [],
  excerciseInfo: {},
  goal: null,
  chatBotMsg: '',
  image: {},
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

    case user_constants.GET_EXCERCISE_IMAGE_REQUEST:
      console.log(action)
      state = {
        ...state,
        loading: true,
      }
      break
    case user_constants.GET_EXCERCISE_IMAGE_SUCCESS:
      console.log(action)
      state = {
        ...state,
        loading: false,
        image: action.payload.images,
      }
      break
    case user_constants.GET_EXCERCISE_IMAGE_FAILURE:
      console.log(action)
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      }
      break
    case user_constants.GET_EXCERCISE_CALORIES_REQUEST:
      console.log(action)
      state = {
        ...state,
        loading: true,
      }
      break
    case user_constants.GET_EXCERCISE_CALORIES_SUCCESS:
      console.log(action)
      state = {
        ...state,
        loading: false,
        excerciseInfo: action.payload.excerciseInfo,
      }
      break
    case user_constants.GET_EXCERCISE_CALORIES_FAILURE:
      console.log(action)
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      }
      break

    case user_constants.CREATE_EXCERCISE_PLAN_REQUEST:
      console.log(action)
      state = {
        ...state,
        loading: true,
      }
      break
    case user_constants.CREATE_EXCERCISE_PLAN_SUCCESS:
      console.log(action.payload.excercisePlan)
      state = {
        ...state,
        loading: false,
        excercisePlan: action.payload.excercisePlan,
      }
      break
    case user_constants.CREATE_EXCERCISE_PLAN_FAILURE:
      console.log(action)
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      }
      break

    case user_constants.GET_EXCERCISE_PLAN_REQUEST:
      console.log(action)
      state = {
        ...state,
        loading: true,
      }
      break
    case user_constants.GET_EXCERCISE_PLAN_SUCCESS:
      console.log(action)
      state = {
        ...state,
        loading: false,
        excercisePlan: action.payload.excercisePlan,
      }
      break
    case user_constants.GET_EXCERCISE_PLAN_FAILURE:
      console.log(action)
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      }
      break
    case user_constants.EXCERCISE_PLAN_EXISTS_REQUEST:
      console.log(action)
      state = {
        ...state,
        loading: true,
      }
      break
    case user_constants.EXCERCISE_PLAN_EXISTS_SUCCESS:
      console.log(action)
      state = {
        ...state,
        loading: false,
        excercisePlanExist: action.payload.excercisePlanExist,
      }
      break
    case user_constants.EXCERCISE_PLAN_EXISTS_FAILURE:
      console.log(action)
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      }
      break
    case user_constants.UPDATE_EXCERCISE_PLAN_REQUEST:
      console.log(action)
      state = {
        ...state,
        loading: true,
      }
      break
    case user_constants.UPDATE_EXCERCISE_PLAN_SUCCESS:
      console.log(action)
      state = {
        ...state,
        loading: false,
        excercisePlan: action.payload.excercisePlan,
      }
      break
    case user_constants.UPDATE_EXCERCISE_PLAN_FAILURE:
      console.log(action)
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      }
      break
    case user_constants.GET_CURRENT_MONTH_PLAN_REQUEST:
      console.log(action)
      state = {
        ...state,
        loading: true,
      }
      break
    case user_constants.GET_CURRENT_MONTH_PLAN_SUCCESS:
      console.log(action)
      state = {
        ...state,
        loading: false,
        currentMonthPlan: action.payload.currentMonthPlan,
      }
      break
    case user_constants.GET_CURRENT_MONTH_PLAN_FAILURE:
      console.log(action)
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      }
      break
    case user_constants.GET_USER_GOAL_REQUEST:
      console.log(action)
      state = {
        ...state,
        goalLoading: true,
      }
      break
    case user_constants.GET_USER_GOAL_SUCCESS:
      console.log(action)
      state = {
        ...state,
        loading: false,
        goal: action.payload.goal,
      }
      break
    case user_constants.GET_USER_GOAL_FAILURE:
      console.log(action)
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      }
      break
    case user_constants.GET_CHAT_BOT_MESSAGE_REQUEST:
      console.log(action)
      state = {
        ...state,
        loading: true,
      }
      break
    case user_constants.GET_CHAT_BOT_MESSAGE_SUCCESS:
      console.log(action)
      state = {
        ...state,
        loading: false,
        chatBotMsg: action.payload.chatBotMsg,
      }
      break
    case user_constants.GET_CHAT_BOT_MESSAGE_FAILURE:
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
