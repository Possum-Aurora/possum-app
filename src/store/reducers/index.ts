import { combineReducers } from "redux"
import locale from "./locale"

// connect reducer
const reducers = combineReducers({
    locale,
})

export default reducers