import { StatusRequestTypes, StatusTypes } from "../types/Jira/StatusTypes"

export const getAllStatusAction = (statusList) => {
    return {
        type: StatusTypes.GET_ALL_STATUS,
        statusList
    }
}

//===================    SAGA   ===================
export const getAllStatusRequest = () => {
    return {
        type: StatusRequestTypes.GET_ALL_STATUS_REQUEST
    }
}