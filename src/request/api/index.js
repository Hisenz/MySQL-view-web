import DataSourceInfoApi from "@/request/api/DataSourceInfo";
import schemaInfoApi from "@/request/api/SchemaInfo";
import axios from "axios";
import baseUrl from "@/request/config";

axios.defaults.baseURL = baseUrl
axios.defaults.timeout = 30 * 1000
export default {
    DataSourceInfoApi,
    schemaInfoApi
}