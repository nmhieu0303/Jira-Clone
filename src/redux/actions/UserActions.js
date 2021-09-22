import { userRequestTypes, userTypes } from "../types/Jira/UserTypes"

//===============   ACTION REDUCER =========================
export const getUsersAction = (users)=>{
    return {
        type: userTypes.GET_USERS,
        users
    }
}

//===============   ACTION SAGA =========================
export const signinRequestAction = (user)=>{
    return {
        type: userRequestTypes.SIGNIN_REQUEST,
        payload: user
    }
}
export const signupRequestAction = (user)=>{
    return {
        type: userRequestTypes.SIGNUP_REQUEST,
        user
    }
}

export const getUsersRequestAction = (keyword='')=>{
    return {
        type: userRequestTypes.GET_USERS_REQUEST,
        keyword
    }
}

export const getUserByProjectIdRequest = (projectId)=>{
    return{
        type:userRequestTypes.GET_USER_BY_PROJECT_REQUEST, 
        projectId
    }
}