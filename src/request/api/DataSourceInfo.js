import axios from "axios";

const DataSourceInfoApi = {
    test (params) {
        return axios.post("/dataSource/testConnection", params)
    },
    getList() {
        return axios.get("/dataSource")
    },
    appendOrUpdate(params) {
        return axios.post("/dataSource", params)
    },
    delete(id) {
        return axios.delete("/dataSource/" + id)
    }
}
export default DataSourceInfoApi