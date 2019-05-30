<template>
  <div id="container">
    <div id="head">
    </div>
    <div id="body">

      <el-table
        :data="orderList"
        style="width: 100%"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-row>
              <el-col :span="8">
                开始用餐：{{props.row.startDateTime|dataTime}}
              </el-col>
              <el-col :span="8">
                桌号：（{{props.row.tableAreaName}}）{{props.row.tableName}}
              </el-col>
              <el-col :span="8">
                结束用餐：{{props.row.endDateTime|dataTime}}
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-table
                  :data="props.row.productItems"
                  style="width: 100%"
                >
                  <el-table-column
                    prop="name"
                    label="菜品"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="price"
                    label="价格"
                  >
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>

          </template>
        </el-table-column>
        <el-table-column
          label="收银员"
          prop="id"
        >
        </el-table-column>
        <el-table-column
          label="支付金额"
          prop="paymentPrice"
        >
        </el-table-column>
        <el-table-column
          label="金额"
          prop="totalPrice"
        >
        </el-table-column>
        <el-table-column
          label="用餐时间"
          prop="date"
        >
        </el-table-column>

      </el-table>

      <el-dialog
        v-if="false"
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
            type="primary"
            @click="save()"
          >确 定</el-button>
        </div>
      </el-dialog>
    </div>

  </div>

</template>

<script>

import restaurantWebApi from '@/webapi/restaurant'

export default {
  data() {
    return {
      dialogFormVisible: false,
      orderList: [],
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
    updateProduc() {
      restaurantWebApi.editProduct(this.form).then(() => {
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
    },
    loadOrder() {
      let self = this
      restaurantWebApi.fetchOrder().then(resolve => {
        self.orderList = resolve.data.data.map(item => {
          item.date = self.moment(item.startDateTime).format("YYYY-MM-DD")
          item.duringDateTime = self.moment(item.startDateTime).format("YYYY-MM-DD hh:ss") + "-" + self.moment(item.endDateTime).format("YYYY-MM-DD hh:ss")
          return item
        })
      })
    }
  },
  mounted() {
    let self = this
    self.loadOrder()
  }
}
</script>

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

.order-table-expand {
  font-size: 0;
  display: flex;
  flex-direction: column;
}
.order-table-expand label {
  color: #99a9bf;
}
.order-table-expand .el-form-item {
}
</style>