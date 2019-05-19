<template>
  <div id="container">
    <div id="head">
      <el-button
        type="primary"
        @click="openCreateDialog()"
      >新增</el-button>
    </div>
    <div id="body">
      <el-table
        :data="$store.state.restaurant.tables"
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
          prop=""
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
        </el-form>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button
            type="danger"
            round
            @click="removeTable(form)"
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
<style>
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
      formId: "",
      form: {
        name: '',
        defaultSeat: 2,
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    insertTable() {
      restaurantWebApi.createTables(this.form).then(() => {
        this.defaultForm()
        this.$store.dispatch("fetchTables")
      })
    },
    updateTable() {
      restaurantWebApi.editTable(this.form).then(() => {
        this.defaultForm()
        this.$store.dispatch("fetchTables")
      })
    },
    removeTable() {
      restaurantWebApi.deleteTable(this.form).then(() => {
        this.dialogFormVisible = false
        this.defaultForm()
        this.$store.dispatch("fetchTables")
      })
    },
    openCreateDialog() {
      this.dialogFormVisible = true
    },
    openEditDialog(item) {
      this.form = item
      this.dialogFormVisible = true
    },
    save() {
      if (this.form._id) {
        this.updateTable()
      } else {
        this.insertTable()
      }
      this.dialogFormVisible = false
    },
    defaultForm() {
      this.form = {
        name: '',
        defaultSeat: 2
      }
    }
  },
  mounted() {
    let self = this
    self.$store.dispatch("fetchTables")
  }
}
</script>

