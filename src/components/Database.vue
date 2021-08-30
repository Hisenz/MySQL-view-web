<template>
  <el-row>
    <el-col :span="3">
      <el-menu style="text-align: left" default-active="0" class="el-menu-vertical-demo"
               :collapse="isCollapse">
        <el-menu-item :key="tableInfo" v-for="(tableInfo, index) in tableInfos" :index="index + ''"
                      @click="currentTableInfo = tableInfo[index]">
          <i class="el-icon-menu"></i>
          <template #title>{{ tableInfo.schemaName }}</template>
        </el-menu-item>
        <el-menu-item :index="tableInfos.length + 1 + ''">
          <i class="el-icon-circle-plus-outline"></i>
          <template #title>添加</template>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>

</template>

<script>
export default {
  name: "Database",
  data() {
    return {
      isCollapse: false,
      dataSource: this.$route.params.name,
      tableInfos: [{
        "catalogName": "",
        "schemaName": "",
        "defaultCharacterSetName": "",
        "defaultCollationName": "",
        "defaultEncryption": "",
        "sqlPath": ""
      }]
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      this.$api.schemaInfoApi.getList(this.dataSource).then(response => {
        this.tableInfos = response.data.data;
      })
    }
  }
}
</script>

<style scoped>

</style>