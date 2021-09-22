import axios from "axios"
import { TOKEN } from "../utils/constant/setting"
import { JIRA_PATH } from "../utils/constant/urlApi"

export const JiraService={
    signin:(user)=>{
        return axios.post(JIRA_PATH.SIGNIN,user)
    },

    getProjectCategory:()=>{

        return  axios.get(JIRA_PATH.GET_PROJECT_CATEGORY)
    },
    getAllProject:()=>{
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem(TOKEN)}` }
        };
        return  axios.get(JIRA_PATH.GET_ALL_PROJECT,config)
    },

    createProject:(project)=>{
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem(TOKEN)}` }
        };
        return axios.post(JIRA_PATH.CREATE_PROJECT_AUTHORIZE,project,config)
    },

    updateProject:(project)=>{
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem(TOKEN)}` }
        };
        return axios.put(JIRA_PATH.UPDATE_PROJECT+`${project.id}`,project,config)
    }
}


