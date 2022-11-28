import { combineReducers } from "redux";
import { reducer as get_users } from "../Slices/get_users"
import { reducer as get_user } from "../Slices/get_user"

const rootReducer = combineReducers({
    get_users,
    get_user,
})

export default rootReducer  