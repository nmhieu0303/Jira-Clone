import axios from "axios";
import { TOKEN } from "../utils/constant/setting";

export class BaseService {
    get = (url) => {
        return axios.get(url, { headers: { Authorization: `Bearer ${localStorage.getItem(TOKEN)}` } });
    }
    delete = (url) => {
        return axios.delete(url, { headers: { Authorization: `Bearer ${localStorage.getItem(TOKEN)}` } });
    }
    put = (url, model) => {
        return axios.put(url, model, { headers: { Authorization: `Bearer ${localStorage.getItem(TOKEN)}` } });
    }
    post = (url, model) => {
        return axios.post(url, model, { headers: { Authorization: `Bearer ${localStorage.getItem(TOKEN)}` } });
    }
}