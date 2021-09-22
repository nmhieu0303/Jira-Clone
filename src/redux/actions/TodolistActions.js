import axios from "axios"
import { TODOLIST_PATH } from "../../utils/constant/urlApi"
import { TodolistTypes } from "../types/TodolistTypes"

export const getAllTaskApi = () => {
    return async dispatch => {
        try {
            const { data, status } = await axios.get(TODOLIST_PATH.GET_ALL_PATH)
            if (status === 200) {
                dispatch({
                    type: TodolistTypes.GET_ALL_TASK,
                    todoList: data
                })
            }
        }
        catch (error) {
            console.log(error.response.data)
        }
    }
}

export const addTaskApi = (taskName) => {
    return async dispatch => {
        try {
            const {status } = await axios.post(TODOLIST_PATH.ADD_PATH, { taskName })
            if (status === 200)
                dispatch(getAllTaskApi())
        } catch (error) {
            console.log(error.response.data)
        }
    }
}

export const deleteTaskApi = (taskName) => {
    return async dispatch => {
        try {
            const {status } = await axios.delete(TODOLIST_PATH.DELETE_PATH + taskName)
            if (status === 200)
                dispatch(getAllTaskApi())
        } catch (error) {
            console.log(error.response.data)
        }
    }
}

export const doneTaskApi = (taskName) => {
    return async dispatch => {
        try {
            const {status } = await axios.put(TODOLIST_PATH.DONE_PATH + taskName)
            if (status === 200)
                dispatch(getAllTaskApi())
        } catch (error) {
            console.log(error.response.data)
        }
    }
}

export const rejectTaskApi = (taskName) => {
    return async dispatch => {
        try {
            const {status } = await axios.put(TODOLIST_PATH.REJECT_PATH + taskName)
            if (status === 200)
                dispatch(getAllTaskApi())
        } catch (error) {
            console.log(error.response.data)
        }
    }
}