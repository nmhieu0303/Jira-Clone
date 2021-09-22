import { all, call, put, takeLatest } from "redux-saga/effects";
import { toDoListServies } from "../../services/ToDoListServies";
import { DISPLAY_LOADING, HIDE_LOADING } from "../types/LoadingTypes";
import { TodolistSagaTypes, TodolistTypes } from "../types/TodolistTypes";

function* getTaskApi(action) {
    yield put({ type: DISPLAY_LOADING })
    try {
        const { data, status } = yield call(toDoListServies.getTaskApi)
        if (status === 200) {
            yield put({
                type: TodolistTypes.GET_ALL_TASK,
                todoList: data
            })
        }
    } catch (error) {
        console.error()
    }
    yield put({ type: HIDE_LOADING })
}
function* watchGetTaskApi() {
    yield takeLatest(TodolistSagaTypes.GET_TASKLIST_API, getTaskApi);
}


function* addTaskApiAction(action) {
    const { taskName } = action
    yield put({ type: DISPLAY_LOADING })
    try {
        const { status } = yield call(() => toDoListServies.addTaskApi(taskName))
        if (status === 200) {
            yield put({
                type: TodolistSagaTypes.GET_TASKLIST_API
            })
        }
    } catch (error) {
        console.error()
    }
    yield put({ type: HIDE_LOADING })
}
function* watchAddTaskApi() {
    yield takeLatest(TodolistSagaTypes.ADD_TASK_API, addTaskApiAction);
}

function* deleteTaskApiAction(action) {
    const { taskName } = action
    yield put({ type: DISPLAY_LOADING })
    try {
        const { status } = yield call(() => toDoListServies.deleteTaskApi(taskName))
        if (status === 200) {
            yield put({
                type: TodolistSagaTypes.GET_TASKLIST_API
            })
        }
    } catch (error) {
        console.error()
    }
    yield put({ type: HIDE_LOADING })
}
function* watchDeleteTaskApi() {
    yield takeLatest(TodolistSagaTypes.DELETE_TASK_API, deleteTaskApiAction);
}
function* doneTaskApiAction(action) {
    const { taskName } = action
    yield put({ type: DISPLAY_LOADING })
    try {
        const { status } = yield call(() => toDoListServies.doneTaskApi(taskName))
        if (status === 200) {
            yield put({
                type: TodolistSagaTypes.GET_TASKLIST_API
            })
        }
    } catch (error) {
        console.error()
    }
    yield put({ type: HIDE_LOADING })
}
function* watchDoneTaskApi() {
    yield takeLatest(TodolistSagaTypes.DONE_TASK_API, doneTaskApiAction);
}

function* rejectTaskApiAction(action) {
    const { taskName } = action
    yield put({ type: DISPLAY_LOADING })
    try {
        const { status } = yield call(() => toDoListServies.rejectTaskApi(taskName))
        if (status === 200) {
            yield put({
                type: TodolistSagaTypes.GET_TASKLIST_API
            })
        }
    } catch (error) {
        console.error()
    }
    yield put({ type: HIDE_LOADING })
}
function* watchRejectTaskApi() {
    yield takeLatest(TodolistSagaTypes.REJECT_TASK_API, rejectTaskApiAction);
}


export default function* root() {
    yield all([
        watchGetTaskApi(),
        watchAddTaskApi(),
        watchDeleteTaskApi(),
        watchDoneTaskApi(),
        watchRejectTaskApi()
    ]);
}