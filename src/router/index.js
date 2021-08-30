import {createRouter, createWebHashHistory} from 'vue-router'
import DataSourceInfo from "@/components/DataSourceInfo";
import Database from "@/components/Database";
import Table from "@/components/Table";
import Structure from "@/components/Structure";
import Data from "@/components/Data";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: DataSourceInfo
    }, {
        path: "/database/:name",
        name: 'DatabaseView',
        component: Database
    }, {
        path: "/table/:schema",
        name: 'Table',
        component: Table
    }, {
        path: "/structure/:schema/:table",
        name: 'structure',
        component: Structure
    }, {
        path: "/data/:schema/:table",
        name: 'data',
        component: Data
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
