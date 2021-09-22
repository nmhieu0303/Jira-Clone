import { CommentTypes } from "../../types/Jira/CommentTypes";
import { TaskTypes } from "../../types/Jira/TaskTypes"

const initialState = {
    typeList: [],
    taskDetail: {}
}

const TaskReducer = (state = initialState, action) => {
    switch (action.type) {

        case TaskTypes.GET_ALL_TASK_TYPE:
            state.typeList = action.typeList;
            return { ...state }
        case TaskTypes.GET_TASK_BY_ID:
            state.taskDetail = { ...action.taskDetail };
            return { ...state }
        case TaskTypes.CHANGE_VALUE_TASK_DETAIL:
            const { name, value } = action;
            state.taskDetail = { ...state.taskDetail, [name]: value };
            return { ...state }
        case TaskTypes.CHANG_ASSIGNESS:
            state.taskDetail.assigness = [...state.taskDetail.assigness, action.user]
            state.taskDetail = { ...state.taskDetail }
            return { ...state }
        case TaskTypes.REMOVE_USER_ASSIGN:
            state.taskDetail.assigness = state.taskDetail.assigness.filter(mem => mem.id !== action.id)
            state.taskDetail = { ...state.taskDetail }
            return { ...state }
        case CommentTypes.GET_ALL_COMMENTS:
            state.taskDetail.lstComment = action.lstComment
            state.taskDetail = { ...state.taskDetail }
            return { ...state}
        default:
            return { ...state }
    }
}
export default TaskReducer