import { JIRA_PATH } from '../utils/constant/urlApi';
import {BaseService} from './BaseService';
export class PriorityServices extends BaseService{
    // eslint-disable-next-line no-useless-constructor
    constructor(){
        super()
    }

    getAllPriority = ()=>{
        return this.get(JIRA_PATH.GET_ALL_PRIORITY)
    }
}

export const priorityServices = new PriorityServices();