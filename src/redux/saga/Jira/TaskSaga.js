import { all, call, put, select, takeLatest } from "@redux-saga/core/effects";
import { DrawerTypes } from "../../../HOC/DrawerModal/DrawerTypes";
import { taskServices } from "../../../services/TaskServices";
import { Notification } from "../../../utils/Notification";
import { getProjectDetailRequest } from "../../actions/ProjectActions";
import { getTaskByIdAction, getTaskByIdRequest, getTaskTypeAction } from "../../actions/TaskActions";
import { TaskRequestTypes, TaskTypes } from "../../types/Jira/TaskTypes";
function* getAllType(action) {
    try {
        const { data, status } = yield call(() => taskServices.getAllType())
        if (status === 200) {
            yield put(getTaskTypeAction(data.content))
        }
    } catch (error) {
        console.log(error.response.data)
    }
}
function* watchGetAllTaskType() {
    yield takeLatest(TaskRequestTypes.GET_ALL_TASK_TYPE_REQUEST, getAllType)
}

function* createTask(action) {
    try {
        const { status } = yield call(() => taskServices.createTask(action.task))
        if (status === 200)
            yield put(getProjectDetailRequest(action.task.projectId))
            Notification('success', 'Create task successfully!')

    } catch (error) {
        Notification('error', error.response.data.message);
    }
    yield put({ type: DrawerTypes.HIDE_DRAWER })
}

function* watchCreateTask() {
    yield takeLatest(TaskRequestTypes.CREATE_TASK, createTask)
}

function* getTaskById(action) {
    try {
        const { data, status } = yield call(() => taskServices.getTaskById(action.taskId))
        if (status === 200) {
            yield put(getTaskByIdAction(data.content))
        }
    } catch (error) {
        console.log(error.response?.data)
    }
}
function* watchGetTaskById() {
    yield takeLatest(TaskRequestTypes.GET_TASK_BY_ID_REQUEST, getTaskById)
}

function* removeTaskById(action) {
    try {
        const { data, status } = yield call(() => taskServices.removeTaskById(action.taskId))
        if (status === 200) {
            yield put(getProjectDetailRequest(action.projectId))
            Notification('success', data.message)
        }
    } catch (error) {
        console.log(error.response?.data)
    }
}

function* watchRemoveTaskById() {
    yield takeLatest(TaskRequestTypes.REMOVE_TASK_BY_ID_REQUEST, removeTaskById)
}


function* updateTask(action) {
    //save dữ liệu vào reducer theo từng trường hợp
    switch (action.handleType) {
        case TaskTypes.CHANGE_VALUE_TASK_DETAIL:
            const { name, value } = action
            yield put({ type: action.handleType, name, value })
            break
        case TaskTypes.REMOVE_USER_ASSIGN:
            yield put({ type: action.handleType, id: action.id })
            break
        case TaskTypes.CHANG_ASSIGNESS:
            yield put({ type: action.handleType, user: action.user })
            break;
        default:
            break;
    }

    // Lấy dữ liệu vừa thay đổi ở reducer để tạo obj data của API update Task
    let getTaskDetail = yield select(state => state.TaskReducer.taskDetail)
    const listUserAsign = getTaskDetail.assigness?.map(member => member.id)
    getTaskDetail = { listUserAsign, ...getTaskDetail }

    // Gọi API
    try {
        const { status } = yield call(() => taskServices.updateTask(getTaskDetail))
        if (status === 200) {
            yield put(getProjectDetailRequest(getTaskDetail.projectId))
            yield put(getTaskByIdRequest(getTaskDetail.taskId))
        }

    } catch (error) {
        console.log(`error`, error.response?.data)
    }
}

function* watchUpdateTask() {
    yield takeLatest(TaskRequestTypes.UPDATE_TASK, updateTask)
}

function* updateStatus(action) {
    try {
        const {  status } = yield call(() => taskServices.updateStatus(action.task))
        if (status === 200) {
            yield put(getProjectDetailRequest(action.task.projectId))
        }
    } catch (error) {
        console.log(error.response?.data)
    }
}

function* watchUpdateStatus() {
    yield takeLatest(TaskRequestTypes.UPDATE_STATUS, updateStatus)
}
// eslint-disable-next-line import/no-anonymous-default-export
export default function* () {
    yield all([
        watchGetAllTaskType(),
        watchCreateTask(),
        watchGetTaskById(),
        watchRemoveTaskById(),
        watchUpdateTask(),
        watchUpdateStatus()
    ])
}