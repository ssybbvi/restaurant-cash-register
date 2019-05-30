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
        :data="tableList"
        stripe
        style="width: 100%"
      >
        <el-table-column
          prop="name"
          label="桌号"
        >
        </el-table-column>
        <el-table-column
          prop="defaultSeat"
          label="默认桌位数"
        >
        </el-table-column>
        <el-table-column
          prop="areaName"
          label="所属区域"
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
        title="桌面"
        :visible.sync="dialogFormVisible"
      >
        <el-form :model="form">
          <el-form-item
            label="桌号"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="form.name"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="默认座位数"
            :label-width="formLabelWidth"
          >
            <el-input-number
              v-model="form.defaultSeat"
              :min="1"
              :max="10"
              label="描述文字"
            ></el-input-number>
          </el-form-item>

          <el-form-item
            label="区域"
            :label-width="formLabelWidth"
          >
            <el-select
              v-model="form.areaId"
              placeholder="请选择"
            >
              <el-option
                v-for="item in tableAreaList"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              >
              </el-option>
            </el-select>
          </el-form-item>

        </el-form>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button
            type="danger"
            round
            @click="removeTable(form)"
            v-if="tableId"
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
      dialogFormVisible: false,
      tableList: [],
      tableAreaList: [],
      tableId: "",
      form: {},
      formLabelWidth: '120px'
    }
  },
  methods: {
    // loadTableList() {
    //   let self = this
    //   restaurantWebApi.fetchTables().then(resolve => {
    //     self.tableList = resolve.data.data
    //   })
    // },
    // loadTableAreaList() {
    //   let self = this
    //   restaurantWebApi.fetchTableArea().then(resolve => {
    //     self.tableAreaList = resolve.data.data
    //   })
    // },
    loadTableWithAreaList() {
      let self = this
      Promise.all([restaurantWebApi.fetchTables(), restaurantWebApi.fetchTableArea()])
        .then(([tableResolve, tableAreaResolve]) => {
          self.tableList = tableResolve.data.data
          self.tableAreaList = tableAreaResolve.data.data
          self.tableList.forEach(item => {
            let index = self.tableAreaList.findIndex(s => s._id == item.areaId)
            console.log(index)
            if (index > -1) {
              item.areaName = self.tableAreaList[index].name
            }
          })
        })
    },
    insertTable() {
      let self = this
      restaurantWebApi.createTables(this.form).then(() => {
        this.defaultForm()
        self.loadTableWithAreaList()
      })
    },
    updateTable() {
      let self = this
      restaurantWebApi.editTable({ _id: self.tableId }, this.form).then(() => {
        this.defaultForm()
        self.loadTableWithAreaList()
      })
    },
    removeTable() {
      let self = this
      restaurantWebApi.deleteTable(this.form).then(() => {
        this.dialogFormVisible = false
        this.defaultForm()
        self.loadTableWithAreaList()
      })
    },
    openCreateDialog() {
      this.dialogFormVisible = true
    },
    openEditDialog(item) {
      this.form = item
      this.dialogFormVisible = true
      this.tableId = item._id
    },
    save() {
      if (this.tableId) {
        this.updateTable()
      } else {
        this.insertTable()
      }
      this.dialogFormVisible = false
    },
    defaultForm() {
      this.form = {
        name: '',
        areaId: "",
        defaultSeat: 2
      }
    }
  },
  mounted() {
    let self = this
    self.defaultForm()
    // self.loadTableList()
    // self.loadTableAreaList()
    self.loadTableWithAreaList()
  }
}
</script>

