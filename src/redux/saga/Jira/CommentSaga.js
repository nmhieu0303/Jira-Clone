import { all, call, put, takeLatest } from "@redux-saga/core/effects";
import { commentServies } from "../../../services/CommentServies";
import { Notification } from "../../../utils/Notification";
import { getAllCommentAction, getAllCommentRequest } from "../../actions/CommentActions";
import { CommentRequestTypes } from "../../types/Jira/CommentTypes";

function* getAllComment(action) {
    try {
        const { data, status } = yield call(() => commentServies.getAllComment(action.taskId))
        if (status === 200) {
            Notification('success', data.message)
            const lstComment = data.content.map(comment => {
                return {
                    ...comment,
                    avatar: comment.user.avatar,
                    name: comment.user.name,
                    commentContent: comment.contentComment
                }
            })
            yield put(getAllCommentAction(lstComment))
        }
    } catch (error) {
        Notification('error', error.response.data)
    }
}

function* watchGetAllComment() {
    yield takeLatest(CommentRequestTypes.GET_ALL_COMMENT_REQUEST, getAllComment)
}


function* addComment(action) {
    try {
        const { status } = yield call(() => commentServies.postComment(action.comment))
        if (status === 200) {
            yield put(getAllCommentRequest(action.comment.taskId))
        }
    } catch (error) {
        Notification('error', error.response.data?.message)
    }
}

function* watchAddComment() {
    yield takeLatest(CommentRequestTypes.ADD_COMMENT_REQUEST, addComment)
}

function* removeComment(action) {
    try {
        const { status } = yield call(() => commentServies.removeComment(action.idComment))
        if (status === 200) {
            yield put(getAllCommentRequest(action.taskId))
        }
    } catch (error) {
        console.log(error.response.data)
    }
}

function* watchRemoveComment() {
    yield takeLatest(CommentRequestTypes.REMOVE_COMMENT_REQUEST, removeComment)
}
// eslint-disable-next-line import/no-anonymous-default-export
export default function* () {
    yield all([
        watchAddComment(),
        watchRemoveComment(),
        watchGetAllComment()
    ])
}