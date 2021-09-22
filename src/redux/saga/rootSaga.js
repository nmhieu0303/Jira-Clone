import { all } from "redux-saga/effects";
import todoList from "./TodolistSaga";
import user from "./Jira/UserSaga"
import project from './Jira/ProjectSaga'
import task from "./Jira/TaskSaga"
import priority from "./Jira/PrioritySaga"
import status from "./Jira/StatusSaga"
import comment from "./Jira/CommentSaga";

export function* rootSaga() {
    yield all([
        todoList(),
        user(),
        project(),
        task(),
        priority(), 
        status(),
        comment(),
    ]);
}