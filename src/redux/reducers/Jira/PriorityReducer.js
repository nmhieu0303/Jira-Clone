import { PriorityTypes } from "../../types/Jira/PriorityTypes";

const initialState = {
    priorityList: []
}

const PriorityReducer = (state = initialState, action) => {
    switch (action.type) {

        case PriorityTypes.GET_ALL_PRIORITY:
            state.priorityList = action.priorityList;
            return { ...state}
        default:
            return state
    }
}
export default PriorityReducer