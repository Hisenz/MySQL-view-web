<template>
  <el-row>
    <el-col :span="3">
      <el-menu default-active="0" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
               :collapse="isCollapse" @focus="isCollapse = false" @blur="isCollapse = true">
        <el-menu-item :key="dataSource" v-for="(dataSource, index) in dataSourceInfos" :index="index + ''"
                      @click="currentDataSource = dataSourceInfos[index]">
          <i class="el-icon-menu"></i>
          <template #title>{{ dataSource.name }}</template>
        </el-menu-item>
        <el-menu-item :index="dataSourceInfos.length + 1 + ''" @click="showDiag = true">
          <i class="el-icon-circle-plus-outline"></i>
          <template #title>添加</template>
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="8" :offset="4">
      <el-form class="show-dataSource">
        <el-form-item label="连接名称" label-width="120px" prop="name">
          <el-input v-model="currentDataSource.name" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="用户名" label-width="120px">
          <el-input v-model="currentDataSource.username" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="120px">
          <el-input type="password" v-model="currentDataSource.password" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="驱动" label-width="120px">
          <el-input v-model="currentDataSource.driver" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="连接url" label-width="120px">
          <el-input v-model="currentDataSource.url" autocomplete="off" property="url" :disabled="true"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="updateDataSource">修 改</el-button>
      <el-button type="danger" @click="deleteDataSource">删 除</el-button>
      <el-button type="success" @click="goTo(currentDataSource)">前往</el-button>
    </el-col>
  </el-row>
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
      currentDataSource: {},
      rules: {
        name: [{required: true, message: '请输入数据库连接名', trigger: 'blur'}, {
          min: 3,
          max: 5,
          message: '长度在 3 到 5 个字符',
          trigger: 'blur'
        }]
      }
    }
  },
  created() {
    this.refresh()
  },
  methods: {
    goTo(info) {
      this.$router.push({
        path: `/database/${info.id}`,
      })
    },
    refresh() {
      this.$api.DataSourceInfoApi.getList().then(resp => {
        console.log(resp)
        this.dataSourceInfos = resp.data.data;
        this.currentDataSource = this.dataSourceInfos[0]
      })
    },
    clearTemp() {
      this.name = ""
      this.driver = "com.mysql.cj.jdbc.Driver"
      this.username = ""
      this.password = ""
      this.url = ""
    },
    updateDataSource() {
      this.dataSourceInfoTemp = this.currentDataSource;
      this.showDiag = true;
    },
    deleteDataSource() {
      this.$confirm('此操作将永久删除该连接, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'danger'
      }).then(action => {
        if (action === 'confirm') {
          this.$api.DataSourceInfoApi.delete(this.currentDataSource.id).then(response => {
            this.responseMsgShow(response, '删除连接')
            this.refresh()
          })
        }
      }).catch(action => {
        if(action === 'cancel') {
          this.$message({
            type: 'error',
            message: '已取消删除'
          });
        }

      });
    },
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
      this.$api.DataSourceInfoApi.appendOrUpdate(this.dataSourceInfoTemp).then(response => {
        this.responseMsgShow(response, "添加数据库信息")
        if (response.data.result) {
          this.showDiag = false
          this.clearTemp()
          this.refresh()
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
  width: 100%;
  min-height: 850px;
}

.show-dataSource {
  margin-top: 40px;
}
</style>