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
        :data="tableAreaList"
        stripe
        style="width: 100%"
      >
        <el-table-column
          prop="name"
          label="区域"
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
        title="桌子区域"
        :visible.sync="dialogFormVisible"
      >
        <el-form :model="form">
          <el-form-item
            label="区域"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="form.name"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button
            type="danger"
            round
            @click="removeTableArea(form)"
            v-if="tableTableId"
          >删除桌面</el-button>
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

import restaurantWebApi from '@/webapi/restaurant'

export default {
  data() {
    return {
      tableAreaList: [],
      dialogFormVisible: false,
      tableTableId: "",
      form: {
        name: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    loadTableArea() {
      let self = this
      restaurantWebApi.fetchTableArea().then(resolve => {
        self.tableAreaList = resolve.data.data
      })
    },
    insertTableArea() {
      let self = this
      restaurantWebApi.createTableArea(this.form).then(() => {
        this.defaultForm()
        this.loadTableArea()
      })
    },
    updateTableArea() {
      let self = this
      restaurantWebApi.editTableArea({ _id: self.tableTableId }, this.form).then(() => {
        this.defaultForm()
        this.loadTableArea()
      })
    },
    removeTableArea() {
      let self = this
      restaurantWebApi.deleteTableArea(this.form).then(() => {
        this.dialogFormVisible = false
        this.defaultForm()
        this.loadTableArea()
      })
    },
    openCreateDialog() {
      this.dialogFormVisible = true
    },
    openEditDialog(item) {
      this.tableTableId = item._id
      this.form = item
      this.dialogFormVisible = true
    },
    save() {
      if (this.tableTableId) {
        this.updateTableArea()
      } else {
        this.insertTableArea()
      }
      this.dialogFormVisible = false
    },
    defaultForm() {
      this.form = {
        name: ''
      }
    }
  },
  mounted() {
    let self = this
    self.loadTableArea()
  }
}
</script>

