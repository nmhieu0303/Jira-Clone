import { TaskRequestTypes, TaskTypes } from "../types/Jira/TaskTypes"

export const getTaskTypeAction = (typeList) => {
    return {
        type: TaskTypes.GET_ALL_TASK_TYPE,
        typeList
    }
}


export const getTaskByIdAction = (taskDetail) => {
    return {
        type: TaskTypes.GET_TASK_BY_ID,
        taskDetail
    }
}


export const addAssigness = (user) => {
    return {
        type: TaskRequestTypes.UPDATE_TASK,
        handleType: TaskTypes.CHANG_ASSIGNESS,
        user
    }
}

export const removeUserAssignAction = (id) => {
    return {
        type: TaskRequestTypes.UPDATE_TASK,
        handleType:TaskTypes.REMOVE_USER_ASSIGN,
        id
    }
}

export const handleChangeDetailTask = (name, value) => {
    return {
        type: TaskRequestTypes.UPDATE_TASK,
        handleType: TaskTypes.CHANGE_VALUE_TASK_DETAIL,
        name,
        value
    }
}




//===================    SAGA   ===================
export const getTaskTypeRequest = () => {
    return {
        type: TaskRequestTypes.GET_ALL_TASK_TYPE_REQUEST
    }
}

export const getTaskByIdRequest = (taskId) => {
    return {
        type: TaskRequestTypes.GET_TASK_BY_ID_REQUEST,
        taskId
    }
}
export const removeTaskByIdRequest = (taskId,projectId) => {
    return {
        type: TaskRequestTypes.REMOVE_TASK_BY_ID_REQUEST,
        taskId,
        projectId
    }
}
export const createTaskRequest = (task) => {
    return {
        type: TaskRequestTypes.CREATE_TASK,
        task
    }
}

export const updateTaskRequest = (task) => {
    return {
        type: TaskRequestTypes.UPDATE_TASK,
        task
    }
}

export const updateStatusTaskRequest = (task)=>{
    return {
        type:TaskRequestTypes.UPDATE_STATUS,
        task
    }
}

