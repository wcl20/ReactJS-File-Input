import { combineReducers } from "redux";
import { UPLOAD } from "../constants/actionTypes";
import { generateRequestActionType, generateSuccessActionType, generateFailureActionType } from "../middlewares";

function input(state = { loading: false, error: "" }, action) {
  switch(action.type) {
    case generateRequestActionType(UPLOAD):
        return Object.assign({}, state, { loading: true, error: "" });
    case generateSuccessActionType(UPLOAD):
        return Object.assign({}, state, { loading: false });
    case generateFailureActionType(UPLOAD):
        return Object.assign({}, state, { loading: false, error: action.error });
    default:
      return state
  }
}

const rootReducer = combineReducers({ input });
export default rootReducer;
