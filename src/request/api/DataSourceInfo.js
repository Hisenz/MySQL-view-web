import axios from "axios";

const DataSourceInfoApi = {
    getList() {
        return axios.get("/dataSource")
    },
    append(params) {
        return axios.put("/dataSource", params)
    },
    update(params) {
        return axios.post("/dataSource", params)
    },
    delete(id) {
        return axios.delete("/dataSource/" + id)
    }
}
export default DataSourceInfoApi