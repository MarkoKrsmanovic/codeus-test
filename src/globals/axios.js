import axiosImport from "axios";
import {rootRoute} from "./constants/apiRoutes";

export default class axios {
    static instance = null;

    static getInstance() {
        if (axios.instance === null) {
            axios.instance = axiosImport.create({
                baseURL: rootRoute
            })
        }

        return axios.instance;
    }
}