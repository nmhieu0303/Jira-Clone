/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable require-yield */
import { all, call, put, takeLatest } from "redux-saga/effects";
import { hideDrawerAction } from "../../../HOC/DrawerModal/DrawerActions";
import { JiraService } from "../../../services/JiraServices";
import { projectServices } from "../../../services/ProjectServices";
import history from '../../../utils/history';
import { Notification } from "../../../utils/Notification";
import { getAllProjectAction, getCategoryAction, getProjectDetailAction } from "../../actions/ProjectActions";
import { ProjectRequestTypes } from "../../types/Jira/ProjectTypes";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../types/LoadingTypes";


function* getProjectCategory() {
    yield put({ type: DISPLAY_LOADING })
    try {
        const { data, status } = yield call(() => JiraService.getProjectCategory())
        if (status === 200) {
            yield put(getCategoryAction(data.content))
        }
    } catch (error) {
        console.log(error.response.data);
    }
    yield put({ type: HIDE_LOADING })
}
function* watchGetCategory() {
    yield takeLatest(ProjectRequestTypes.GET_CATEGORY_REQUEST, getProjectCategory)
}

function* getAllProject() {
    yield put({ type: DISPLAY_LOADING })
    try {
        const { data, status } = yield call(() => projectServices.getAllProject())
        if (status === 200) {
            yield put(getAllProjectAction(data.content))
        }
    } catch (error) {
        console.log(error.response.data);
    }
    yield put({ type: HIDE_LOADING })
}
function* watchGetAllProject() {
    yield takeLatest(ProjectRequestTypes.GET_ALL_PROJECT_REQUEST, getAllProject)
}

function* createProject(action) {
    yield put({ type: DISPLAY_LOADING })
    try {
        const { status } = yield call(() => JiraService.createProject(action.newProject))
        if (status === 200) {
            history.push('/project-management');
        }
    } catch (error) {
        console.log(error.response.data);
    }
    yield put({ type: HIDE_LOADING })
}
function* watchCreateProject() {
    yield takeLatest(ProjectRequestTypes.CREATE_PROJECT_REQUEST, createProject)
}


function* updateProject(action) {
    yield put({ type: DISPLAY_LOADING })
    try {
        const { status } = yield call(() => JiraService.updateProject(action.project))
        if (status === 200) {
            yield call(getAllProject)
            yield put(hideDrawerAction())
        }
    } catch (error) {
        console.log(error.response.data);
    }
    yield put({ type: HIDE_LOADING })
}


function* watchUpdateProject() {
    yield takeLatest(ProjectRequestTypes.UPDATE_PROJECT_REQUEST, updateProject)
}


function* deleteProject(action) {
    yield put({ type: DISPLAY_LOADING })
    try {
        const { data, status } = yield call(() => projectServices.deleteProject(action.id))
        if (status === 200) {
            Notification('success', data.message)
            yield call(getAllProject)
        }
    } catch (error) {
        Notification('error', error.response.data)
        console.log(error.response.data);
    }
    yield put({ type: HIDE_LOADING })
}


function* watchDeleteProject() {
    yield takeLatest(ProjectRequestTypes.DELETE_PROJECT_REQUEST, deleteProject)
}

function* assignUserProject(action) {
    yield put({ type: DISPLAY_LOADING })
    try {
        const { data, status } = yield call(() => projectServices.assignUserProject(action.userProject))
        if (status === 200) {
            Notification('success', data.message)
            yield call(getAllProject)
        }
    } catch (error) {
        Notification('error', error.response.data.message)
    }
    yield put({ type: HIDE_LOADING })
}

function* watchAssignUserProject() {
    yield takeLatest(ProjectRequestTypes.ASSIGN_USER_PROJECT_REQUEST, assignUserProject)
}

function* removeUserFromProject(action) {
    yield put({ type: DISPLAY_LOADING })
    try {
        const { data, status } = yield call(() => projectServices.removeUserFromProject(action.userProject))
        if (status === 200) {
            Notification('success', data.message)
            yield call(getAllProject)
        }
    } catch (error) {
        Notification('error', error.response.data.message)
    }
    yield put({ type: HIDE_LOADING })
}

function* watchRemoveUserFromProject() {
    yield takeLatest(ProjectRequestTypes.REMOVE_USER_FROM_PROJECT_REQUEST, removeUserFromProject)
}


function* getProjectDetail(action) {
    yield put({ type: DISPLAY_LOADING })
    try {
        const { data, status } = yield call(() => projectServices.getProjectDetail(action.id))
        if (status === 200) {
            yield put(getProjectDetailAction(data.content))
        }
    } catch (error) {
        Notification('error', error.response.data.message)
    }
    yield put({ type: HIDE_LOADING })
}

function* watchGetProjectDetail() {
    yield takeLatest(ProjectRequestTypes.GET_PROJECT_DETAIL_REQUEST, getProjectDetail)
}



export default function* () {
    yield all([
        watchGetCategory(),
        watchGetAllProject(),
        watchCreateProject(),
        watchUpdateProject(),
        watchDeleteProject(),
        watchAssignUserProject(),
        watchRemoveUserFromProject(),
        watchGetProjectDetail(),
    ])
}