import { TOKEN, USER_LOGIN } from "../../../utils/constant/setting"
import { userTypes } from "../../types/Jira/UserTypes"

let usLogin = null
if (localStorage.getItem(USER_LOGIN)) {
    usLogin = JSON.parse(localStorage.getItem(USER_LOGIN))
}
const initialState = {
    userLogin: usLogin,
    userSearch:[],
}
const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case userTypes.SIGNIN:
            return { ...state, userLogin: action.userLogin }
        case userTypes.LOGOUT:
            state.userLogin = null
            localStorage.removeItem(USER_LOGIN);
            localStorage.removeItem(TOKEN);
            return { ...state }
        case userTypes.GET_USERS:
            return { ...state, userSearch: action.users}
        default:
            return state
    }
}


export default UserReducer;