import { StatusTypes } from "../../types/Jira/StatusTypes";

const initialState = {
    statusList: []
}

const StatusReducer = (state = initialState, action) => {
    switch (action.type) {

        case StatusTypes.GET_ALL_STATUS:
            state.statusList = action.statusList;
            return { ...state}
        default:
            return state
    }
}
export default StatusReducer