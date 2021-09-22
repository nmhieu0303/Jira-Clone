/* eslint-disable import/no-anonymous-default-export */
import { TodolistTypes } from "../types/TodolistTypes"

const initialState = {
    todoList: [],
    currentUser: JSON.parse(localStorage.getItem('userLogin'))||null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case TodolistTypes.GET_ALL_TASK:
            state.todoList = [...action.todoList];
            return { ...state }
        case TodolistTypes.LOGIN:
            state.currentUser = action.currentUser;
            return { ...state }
        default:
            return state
    }
}