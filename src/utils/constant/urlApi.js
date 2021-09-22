import { DOMAIN, JIRA_DOMAIN } from "./setting";

export const TODOLIST_PATH = {
    ADD_PATH: `${DOMAIN}/ToDoList/AddTask`,
    GET_ALL_PATH: `${DOMAIN}/ToDoList/GetAllTask`,
    DELETE_PATH: `${DOMAIN}/ToDoList/deleteTask?taskName=`,
    DONE_PATH: `${DOMAIN}/ToDoList/doneTask?taskName=`,
    REJECT_PATH: `${DOMAIN}/ToDoList/rejectTask?taskName=`
}

export const JIRA_PATH = {
    // User
    SIGNIN: `${JIRA_DOMAIN}/Users/signin`,
    SIGNUP: `${JIRA_DOMAIN}/Users/signup`,
    GET_USERS: `${JIRA_DOMAIN}/Users/getUser`,
    GET_USER_BY_PROJECT: `${JIRA_DOMAIN}/Users/getUserByProjectId?idProject=`,

    //Project
    GET_PROJECT_CATEGORY: `${JIRA_DOMAIN}/ProjectCategory`,
    GET_ALL_PROJECT:`${JIRA_DOMAIN}/Project/getAllProject`,
    CREATE_PROJECT: `${JIRA_DOMAIN}/Project/createProject`,
    CREATE_PROJECT_AUTHORIZE: `${JIRA_DOMAIN}/Project/createProjectAuthorize`,
    UPDATE_PROJECT: `${JIRA_DOMAIN}/Project/updateProject?projectId=`,
    DELETE_PROJECT:`${JIRA_DOMAIN}/Project/deleteProject?projectId=`,
    ASSIGN_USER_PROJECT:`${JIRA_DOMAIN}/Project/assignUserProject`,
    REMOVE_USER_FROM_PROJECT: `${JIRA_DOMAIN}/Project/removeUserFromProject`,
    GET_PROJECT_DETAIL: `${JIRA_DOMAIN}/Project/getProjectDetail?id=`,
    UPDATE_STATUS:`${JIRA_DOMAIN}/Project/updateStatus`,

    //TASK
    GET_ALL_TASK_TYPES: `${JIRA_DOMAIN}/TaskType/getAll`,
    CREATE_TASK: `${JIRA_DOMAIN}/Project/createTask`,
    GET_TASK_BY_ID: `${JIRA_DOMAIN}/Project/getTaskDetail?taskId=`,
    UPDATE_TASK: `${JIRA_DOMAIN}/Project/updateTask`,
    REMOVE_TASK: `${JIRA_DOMAIN}/Project/removeTask?taskId=`,

    //COMMENT
    GET_ALL_COMMENTS: `${JIRA_DOMAIN}/Comment/getAll?taskId=`,
    ADD_COMMENT: `${JIRA_DOMAIN}/Comment/insertComment`,
    REMOVE_COMMENT: `${JIRA_DOMAIN}/Comment/deleteComment?idComment=`,

    //PRIORITY
    GET_ALL_PRIORITY: `${JIRA_DOMAIN}/Priority/getAll`,

    // STATUS
    GET_ALL_STATUS:`${JIRA_DOMAIN}/Status/getAll`,
}