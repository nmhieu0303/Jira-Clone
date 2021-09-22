import { JIRA_PATH } from '../utils/constant/urlApi';
import {BaseService} from './BaseService';
export class StatusServices extends BaseService{
    // eslint-disable-next-line no-useless-constructor
    constructor(){
        super()
    }

    getAllStatus = ()=>{
        return this.get(JIRA_PATH.GET_ALL_STATUS)
    }
}

export const statusServices = new StatusServices();