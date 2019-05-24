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
        :data="$store.state.restaurant.products"
        stripe
        style="width: 100%"
      >
        <el-table-column
          prop="name"
          label="名称"
        >
        </el-table-column>
        <el-table-column
          prop="price"
          label="价格"
        >
        </el-table-column>
        <el-table-column
          prop="label"
          label="标签"
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
            label="名称"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="form.name"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="价格"
            :label-width="formLabelWidth"
          >
            <el-input-number
              v-model="form.price"
              :min="1"
              :max="10"
              label="描述文字"
            ></el-input-number>
          </el-form-item>
          <el-form-item
            label="标签"
            :label-width="formLabelWidth"
          >
            <el-select
              v-model="form.label"
              multiple
              collapse-tags
              style="margin-left: 20px;"
              placeholder="请选择"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
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
            @click="removeProduc(form)"
            v-if="form._id"
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
      formId: "",
      form: {
        name: '',
        price: 0,
        label: [],
        stock: 0
      },
      formLabelWidth: '120px',
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
    }
  },
  methods: {
    insertProduc() {
      restaurantWebApi.createProduct(this.form).then(() => {
        this.defaultForm()
        this.$store.dispatch("fetchProduct")
      })
    },
    updateProduc() {
      restaurantWebApi.editProduct(this.form).then(() => {
        this.defaultForm()
        this.$store.dispatch("fetchProduct")
      })
    },
    removeProduc() {
      restaurantWebApi.deleteProduct(this.form).then(() => {
        this.dialogFormVisible = false
        this.defaultForm()
        this.$store.dispatch("fetchProduct")
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
        this.updateProduc()
      } else {
        this.insertProduc()
      }
      this.dialogFormVisible = false
    },
    defaultForm() {
      this.form = {
        name: '',
        price: 0,
        label: [],
        stock: 0
      }
    }
  },
  mounted() {
    let self = this
    self.$store.dispatch("fetchProduct")
  }
}
</script>

