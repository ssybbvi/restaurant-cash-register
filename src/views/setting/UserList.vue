<template>
  <div id="container">
    <div id="head">
      <el-button
        type="primary"
        round
        @click="openCreateDialog()"
      >新增</el-button>
    </div>
    <div id="body">
      <el-table
        :data="userList"
        stripe
        style="width: 100%"
      >
        <el-table-column
          prop="name"
          label="姓名"
        >
        </el-table-column>
        <el-table-column
          prop="phoneNumber"
          label="手机号码"
        >
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100"
        >
          <template slot-scope="scope">
            <el-button
              round
              @click="openEditDialog(scope.row)"
            >编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        title="员工信息"
        :visible.sync="dialogFormVisible"
      >
        <el-form>
          <el-form-item
            label="姓名"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="form.name"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="手机号码"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="form.phoneNumber"
              label=""
            >
            </el-input>
          </el-form-item>
          <el-form-item
            label="密码"
            :label-width="formLabelWidth"
          >
            <el-input
              show-password
              v-model="form.password"
              label=""
            >
            </el-input>
          </el-form-item>
          <el-form-item
            label="备注"
            :label-width="formLabelWidth"
          >
            <el-input
              type="textarea"
              v-model="form.remarks"
              label=""
            >
            </el-input>
          </el-form-item>
          <el-form-item
            label="岗位"
            :label-width="formLabelWidth"
          >
            <el-select
              v-model="form.userType"
              placeholder="请选择"
              multiple
            >
              <el-option
                v-for="item in userTypeList"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="是否启用"
            :label-width="formLabelWidth"
          >
            <el-switch
              v-model="form.isEnable"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </el-form-item>
        </el-form>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button
            type="danger"
            round
            @click="removeUser(form)"
            v-if="formId"
          >删除</el-button>
          <el-button
            type="primary"
            @click="save()"
          >确 定</el-button>
        </div>
      </el-dialog>
    </div>

  </div>

</template>
<style scoped lang="scss">
#container {
  margin: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
}

#head {
  height: 50px;
  display: flex;
  justify-content: flex-end;
}

#body {
  display: flex;
  justify-content: center;
}
</style>
<script>


export default {
  data() {
    return {
      dialogFormVisible: false,
      userList: [],
      formId: "",
      form: {

      },
      formLabelWidth: '120px',
      userTypeList: []
    }
  },
  methods: {
    loadUserList() {
      let self = this
      self.$http.get("/user", { params: {} }).then(resolve => {
        self.userList = resolve.data.data
      })
    },
    insertUser() {
      let self = this
      self.$http.post("/user", self.form).then(() => {
        self.defaultForm()
        self.loadUserList()
      })
    },
    updateUser() {
      let self = this
      self.$http.put("/user", self.form, { params: { _id: self.formId } }).then(() => {
        this.defaultForm()
        self.loadUserList()
      })
    },
    removeUser() {
      let self = this
      self.$http.delete("/user", { data: { _id: self.formId } }).then(() => {
        this.dialogFormVisible = false
        this.defaultForm()
        self.loadUserList()
      })
    },
    openCreateDialog() {
      this.dialogFormVisible = true
    },
    openEditDialog(item) {
      this.form = item
      this.dialogFormVisible = true
      this.formId = item._id
    },
    save() {
      if (this.formId) {
        this.updateUser()
      } else {
        this.insertUser()
      }

    },
    defaultForm() {
      let self = this
      self.form = {
        name: '',
        phoneNumber: '',
        password: '',
        userType: [],
        remaks: "",
        isEnable: true
      }
      self.dialogFormVisible = false
    },
    loadUserTypeList() {
      let self = this
      self.userTypeList = [
        {
          name: "管理员",
          _id: 0,
        },
        {
          name: "收银员",
          _id: 1,
        },
        {
          name: "厨师",
          _id: 2,
        },
        {
          name: "服务员",
          _id: 3,
        }
      ]
    }
  },
  mounted() {
    let self = this
    self.defaultForm()
    self.loadUserList()
    self.loadUserTypeList()
  }
}
</script>

