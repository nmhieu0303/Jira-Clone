/* eslint-disable no-useless-constructor */
import { JIRA_PATH } from "../utils/constant/urlApi";
import { BaseService } from "./BaseService";

export class CommentServies extends BaseService {
    constructor() {
        super()
    }
    postComment = (comment) => {
        return this.post(JIRA_PATH.ADD_COMMENT, comment)
    }
    removeComment = (idComment) => {
        return this.delete(JIRA_PATH.REMOVE_COMMENT+idComment)
    }
    getAllComment = (taskId) =>{
        return this.get(JIRA_PATH.GET_ALL_COMMENTS + taskId)
    }
}

export const commentServies = new CommentServies();