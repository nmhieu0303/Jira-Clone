import { PriorityRequestTypes, PriorityTypes } from "../types/Jira/PriorityTypes"

export const getAllPriorityAction = (priorityList) => {
    return {
        type: PriorityTypes.GET_ALL_PRIORITY,
        priorityList
    }
}

//===================    SAGA   ===================
export const getAllPriorityRequest = () => {
    return {
        type: PriorityRequestTypes.GET_ALL_PRIORITY_REQUEST
    }
}