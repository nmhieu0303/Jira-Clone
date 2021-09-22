import { JIRA_PATH } from "../utils/constant/urlApi";
import { BaseService } from "./BaseService";

export class ProjectServices extends BaseService {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
    }
    deleteProject = (id) => {
        return this.delete(JIRA_PATH.DELETE_PROJECT + id)
    }
    assignUserProject = (data) => {
        return this.post(JIRA_PATH.ASSIGN_USER_PROJECT, data)
    }
    removeUserFromProject = (data) => {
        return this.post(JIRA_PATH.REMOVE_USER_FROM_PROJECT, data)
    }
    getProjectDetail = (id) => {
        return this.get(JIRA_PATH.GET_PROJECT_DETAIL + id)
    }
    getAllProject = ()=>{
        return this.get(JIRA_PATH.GET_ALL_PROJECT)
    }
   
}

export const projectServices = new ProjectServices();