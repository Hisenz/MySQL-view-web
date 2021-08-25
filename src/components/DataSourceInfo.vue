<template>
  <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
           :collapse="isCollapse" @focus="isCollapse = false" @blur="isCollapse = true">
    <el-menu-item :key="dataSource" v-for="(dataSource, index) in dataSourceInfos" :index="index + ''">
      <i class="el-icon-menu"></i>
      <template #title>{{ dataSource.name }}</template>
    </el-menu-item>
    <el-menu-item index="4" @click="showDiag = true">
      <i class="el-icon-circle-plus-outline"></i>
      <template #title>添加</template>
    </el-menu-item>
  </el-menu>
  <el-dialog title="数据库连接信息" v-model="showDiag">
    <el-form :model="dataSourceInfoTemp" :rules="rules" ref="dataSourceInfoTemp">
      <el-form-item label="连接名称" label-width="120px" prop="name">
        <el-input v-model="dataSourceInfoTemp.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="用户名" label-width="120px">
        <el-input v-model="dataSourceInfoTemp.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" label-width="120px">
        <el-input type="password" v-model="dataSourceInfoTemp.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="驱动" label-width="120px">
        <el-input v-model="dataSourceInfoTemp.driver" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="连接url" label-width="120px">
        <el-input v-model="dataSourceInfoTemp.url" autocomplete="off" property="url"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
    <span class="dialog-footer">
      <el-button @click="showDiag = false">取 消</el-button>
      <el-button type="primary" @click="appendDataSource">确 定</el-button>
      <el-button type="primary" @click="testConnect">测 试</el-button>
    </span>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: "DataSourceInfo",
  data() {
    return {
      isCollapse: false,
      showDiag: false,
      dataSourceInfos: [],
      dataSourceInfoTemp: {
        name: "",
        driver: "com.mysql.cj.jdbc.Driver",
        username: "",
        password: "",
        url: ""
      },
      rules: {
        name: [{
          required: true, message: '请输入数据库连接名', trigger: 'blur'
        }, {
          min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'
        }]
      }
    }
  },
  created() {
    this.$api.DataSourceInfoApi.getList().then(resp => {
      console.log(resp)
      this.dataSourceInfos = resp.data.data;
    })
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    testConnect() {
      this.$api.DataSourceInfoApi.test(this.dataSourceInfoTemp).then(response => {
        this.responseMsgShow(response, "测试连接")
      })
    },
    appendDataSource() {
      this.$api.DataSourceInfoApi.append(this.dataSourceInfoTemp).then(response => {
        this.responseMsgShow(response, "添加数据库信息")
        if (response.data.result) {
          this.showDiag = false
        }
      })
    },
    responseMsgShow(response, operation) {
      if (response.data.result) {
        this.$message.success({
          type: 'success',
          message: operation + '成功'
        })
      } else {
        this.$message.error({
          type: 'error',
          message: operation + '失败'
        })
      }
    }
  }
}
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

</style>