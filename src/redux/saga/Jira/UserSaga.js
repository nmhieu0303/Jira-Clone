/* eslint-disable import/no-anonymous-default-export */
import { all, call, put, takeLatest } from "redux-saga/effects";
import { JiraService } from "../../../services/JiraServices";
import { userServices } from "../../../services/UserServices";
import { TOKEN, USER_LOGIN } from "../../../utils/constant/setting";
import history from "../../../utils/history";
import { getUsersAction } from "../../actions/UserActions";
import { userRequestTypes, userTypes } from "../../types/Jira/UserTypes";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../types/LoadingTypes";
import { Notification } from "../../../utils/Notification";

function* signin(action) {
    yield put({ type: DISPLAY_LOADING })
    try {
        const { data, status } = yield call(() => JiraService.signin(action.payload))
        if (status === 200) {
            localStorage.setItem(TOKEN, data.content.accessToken)
            localStorage.setItem(USER_LOGIN, JSON.stringify(data.content))
            yield put({
                type: userTypes.SIGNIN,
                userLogin: data.content
            })
            history.push('/')
        }
    } catch (error) {
        alert(error.response.data.message)
    }
    yield put({ type: HIDE_LOADING })
}

function* watchSignin() {
    yield takeLatest(userRequestTypes.SIGNIN_REQUEST, signin)
}

function* signUp(action) {
    yield put({ type: DISPLAY_LOADING })
    try {
        const { data, status } = yield call(() => userServices.signup(action.user))
        if (status === 200) {
            history.push('/login')
            Notification('success', data.message)
        }
    } catch (error) {
        Notification('error', error.response.data.message)
    }
    yield put({ type: HIDE_LOADING })
}

function* watchSignUp() {
    yield takeLatest(userRequestTypes.SIGNUP_REQUEST, signUp)
}

function* getUsers(action) {
    try {
        const { data, status } = yield call(() => userServices.getsUser(action.keyword))
        if (status === 200) {
            yield put(getUsersAction(data.content))
        }
    } catch (error) {
        alert(error.response.data.message)
    }
}

function* watchGetUsers() {
    yield takeLatest(userRequestTypes.GET_USERS_REQUEST, getUsers)
}

function* getUserByProjectId(action) {
    try {
        const { data, status } = yield call(() => userServices.getsUserByProjectId(action.projectId))
        if (status === 200) {
            yield put(getUsersAction(data.content))
        }
    } catch (error) {
        if (error.response.data.statusCode === 404) {
            yield put(getUsersAction([]))
        }
        console.log(error.response.data)
    }
}

function* watchGetUserByProjectId() {
    yield takeLatest(userRequestTypes.GET_USER_BY_PROJECT_REQUEST, getUserByProjectId)
}
export default function* () {
    yield all([
        watchSignin(),
        watchGetUsers(),
        watchGetUserByProjectId(),
        watchSignUp()
    ])
}