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
        :data="productList"
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
                v-for="item in productTypeList"
                :key="item._id"
                :label="item.name"
                :value="item.name"
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

import restaurantWebApi from '@/webapi/restaurant'

export default {
  data() {
    return {
      productList: [],
      productTypeList: [],
      dialogFormVisible: false,
      formId: "",
      form: {
        name: '',
        price: 0,
        label: [],
        stock: 0
      },
      formLabelWidth: '120px',
    }
  },
  methods: {
    insertProduc() {
      restaurantWebApi.createProduct(this.form).then(() => {
        this.defaultForm()
        this.loadProductList()
      })
    },
    updateProduc() {
      let self = this
      restaurantWebApi.editProduct({ _id: self.formId }, this.form).then(() => {
        this.defaultForm()
        this.loadProductList()
      })
    },
    removeProduc() {
      restaurantWebApi.deleteProduct(this.form).then(() => {
        this.dialogFormVisible = false
        this.defaultForm()
        this.loadProductList()
      })
    },
    openCreateDialog() {
      this.dialogFormVisible = true
    },
    openEditDialog(item) {
      this.form = item
      this.formId = item._id
      this.dialogFormVisible = true
    },
    save() {
      if (this.formId) {
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
    },
    loadProductList() {
      var self = this
      restaurantWebApi.fetchProduct().then(resolve => {
        self.productList = resolve.data.data
      })
    },
    loadProductTypeList() {
      var self = this
      restaurantWebApi.fetchProductType().then(resolve => {
        self.productTypeList = resolve.data.data
      })
    }
  },
  mounted() {
    let self = this
    self.loadProductList()
    self.loadProductTypeList()
  }
}
</script>

