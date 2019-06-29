<template>
  <div id="container">
    <div id="head">
    </div>
    <div id="body">

      <el-table
        :data="orderList"
        style="width: 100%"
        @expand-change="expanded"
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
          label="支付金额"
          prop="paymentPrice"
        >
        </el-table-column>
        <el-table-column
          label="总金额"
          prop="totalPrice"
        >
        </el-table-column>
        <el-table-column
          label="结账时间"
          prop="date"
        >
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>


export default {
  data() {
    return {
      orderList: []
    }
  },
  methods: {
    expanded(row) {
      let self = this
      self.$http.get("/orderItem", { params: { orderId: row._id } }).then(resolve => {
        let order = self.orderList.find(f => f._id == row._id)
        self.$set(order, 'productItems', resolve.data.data)
      })
    },
    loadOrder() {
      let self = this
      self.$http.get('/order').then(resolve => {
        self.orderList = resolve.data.data.map(item => {
          item.date = self.moment(item.startDateTime).format("YYYY-MM-DD HH:mm")
          item.duringDateTime = self.moment(item.startDateTime).format("YYYY-MM-DD HH:ss") + "-" + self.moment(item.endDateTime).format("YYYY-MM-DD HH:ss")
          item.paymentPrice = "¥" + item.paymentPrice
          item.totalPrice = "¥" + item.totalPrice
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
</style>