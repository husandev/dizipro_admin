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
import { reducer as add_course_to_user} from "../Slices/add_course_to_user"
import { reducer as search_user} from "../Slices/search_user"
import { reducer as delete_lesson} from "../Slices/delete_lesson"
import { reducer as delete_module} from "../Slices/delete_module"
import { reducer as update_lesson} from "../Slices/update_lesson"
import { reducer as get_lesson} from "../Slices/get_lesson"
import { reducer as delete_course} from "../Slices/delete_course"


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
    add_course_to_user,
    search_user,
    delete_lesson,
    delete_module,
    update_lesson,
    get_lesson,
    delete_course,
})

export default rootReducer  