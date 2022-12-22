import { combineReducers } from "redux";
import { reducer as get_users } from "../Slices/get_users"
import { reducer as get_user } from "../Slices/get_user"
import { reducer as add_course } from "../Slices/add_course"
import { reducer as get_categories } from "../Slices/get_categories"
import { reducer as get_authors } from "../Slices/get_authors"
import { reducer as get_modules } from "../Slices/get_modules"
import { reducer as get_module } from "../Slices/get_module"
import { reducer as get_courses } from "../Slices/get_courses"
import { reducer as get_course } from "../Slices/get_course"
import { reducer as add_module } from "../Slices/add_module"
import { reducer as add_lesson } from "../Slices/add_lesson"

const rootReducer = combineReducers({
    get_users,
    get_user,
    add_course,
    get_categories,
    get_authors,
    get_modules,
    get_module,
    get_courses,
    get_course,
    add_module,
    add_lesson,

})

export default rootReducer  