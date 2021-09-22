/* eslint-disable no-useless-constructor */
import axios from "axios";
import { TODOLIST_PATH } from "../utils/constant/urlApi";

export class ToDoListServies{
    constructor(){

    }

    getTaskApi = () => {
        return axios.get(TODOLIST_PATH.GET_ALL_PATH)
    }
    addTaskApi = (taskName) => {
        return axios.post(TODOLIST_PATH.ADD_PATH, { taskName })
    }
    deleteTaskApi = (taskName) => {
        return axios.delete(TODOLIST_PATH.DELETE_PATH + taskName)
    }
    doneTaskApi = (taskName) => {
        return axios.put(TODOLIST_PATH.DONE_PATH + taskName)
    }
    rejectTaskApi = (taskName) => {
        return axios.put(TODOLIST_PATH.REJECT_PATH + taskName)
    }
}

export const toDoListServies = new ToDoListServies();