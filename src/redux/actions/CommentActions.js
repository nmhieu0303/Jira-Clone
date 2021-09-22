import { CommentRequestTypes, CommentTypes } from "../types/Jira/CommentTypes"


export const getAllCommentAction = (lstComment) => {
    return {
        type: CommentTypes.GET_ALL_COMMENTS,
        lstComment
    }
}


//===================    SAGA   ===================
export const addCommentRequest = (taskId, contentComment) => {
    return {
        type: CommentRequestTypes.ADD_COMMENT_REQUEST,
        comment: { taskId, contentComment }
    }
}

export const removeCommentRequest = (idComment,taskId) => {
    return {
        type: CommentRequestTypes.REMOVE_COMMENT_REQUEST,
        idComment,
        taskId
    }
}

export const getAllCommentRequest = (taskId) => {
    return {
        type: CommentRequestTypes.GET_ALL_COMMENT_REQUEST,
        taskId
    }
}