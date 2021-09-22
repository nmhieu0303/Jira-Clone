import { JIRA_PATH } from '../utils/constant/urlApi';
import {BaseService} from './BaseService';
export class TaskServices extends BaseService{
    // eslint-disable-next-line no-useless-constructor
    constructor(){
        super()
    }

    getAllType = ()=>{
        return this.get(JIRA_PATH.GET_ALL_TASK_TYPES)
    }
    
    createTask = (task)=>{
        return this.post(JIRA_PATH.CREATE_TASK,task);
    }
    getTaskById= (taskId)=>{
        return this.get(JIRA_PATH.GET_TASK_BY_ID+taskId)
    }

    updateTask = (task)=>{
        return this.post(JIRA_PATH.UPDATE_TASK,task)
    }
    removeTaskById = (taskId)=>{
        return this.delete(JIRA_PATH.REMOVE_TASK+taskId)
    }
    updateStatus = (task)=>{
        return this.put(JIRA_PATH.UPDATE_STATUS,task)
    }
}

export const taskServices = new TaskServices();