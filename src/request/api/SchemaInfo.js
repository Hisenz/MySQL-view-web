import axios from "axios";

const schemaInfoApi = {
    getList(name) {
        return axios.get("/schema/list?dataSource=" + name)
    }
}

export default schemaInfoApi