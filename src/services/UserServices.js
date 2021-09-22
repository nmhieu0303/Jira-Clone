import { JIRA_PATH } from "../utils/constant/urlApi";
import { BaseService } from "./BaseService";

export class UserServices extends BaseService {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
    }
    getsUser = (keyword = '') => {
        const keywordStr = keyword !== '' ? `?keyword=${keyword}` : '';
        return this.get(JIRA_PATH.GET_USERS + keywordStr)
    }
    getsUserByProjectId=(projectId)=>{
        return this.get(JIRA_PATH.GET_USER_BY_PROJECT + projectId)
    }
    signup=(user)=>{
        return this.post(JIRA_PATH.SIGNUP, user)
    }
}
export const userServices  = new UserServices();