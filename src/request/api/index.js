import DataSourceInfoApi from "@/request/api/DataSourceInfo";
import axios from "axios";
import baseUrl from "@/request/config";

axios.defaults.baseURL = baseUrl
axios.defaults.timeout = 12 * 1000
export default {
    DataSourceInfoApi
}