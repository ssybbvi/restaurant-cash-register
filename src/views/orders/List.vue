<template>
  <el-container>
    <el-dialog title="订单详情"
               :visible.sync="dialogFormVisible">
      <el-row>
        <el-col :span="8"> 开始用餐：{{currentOrder.startDateTime|dataTime}}</el-col>
        <el-col :span="8"> 桌号：（{{currentOrder.tableAreaName}}）{{currentOrder.tableName}}</el-col>
        <el-col :span="8"> 结束用餐：{{currentOrder.endDateTime|dataTime}}</el-col>
      </el-row>

      <el-table :data="orderItems"
                style="width: 100%">
        <el-table-column prop="name"
                         label="菜品">
        </el-table-column>
        <el-table-column prop="price"
                         label="价格">
        </el-table-column>
      </el-table>
      <div slot="footer"
           class="dialog-footer">
        <el-button type="primary"
                   @click="dialogFormVisible=false">关 闭</el-button>
      </div>
    </el-dialog>
    <!-- <el-header >

      <el-form :inline="true">
        <el-form-item label="收银员">
          <el-select v-model="searchFrom.cashieUserId"
                     placeholder="活动区域">
            <el-option label="区域一"
                       value="shanghai"></el-option>
            <el-option label="区域二"
                       value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="loadOrder">查询</el-button>
        </el-form-item>
      </el-form>

    </el-header> -->
    <el-main>

      <el-table :data="orderList"
                style="width: 100%">
        <el-table-column label="收银员"
                         prop="cashierName">
        </el-table-column>
        <el-table-column label="支付金额"
                         prop="paymentPrice">
        </el-table-column>
        <el-table-column label="总金额"
                         prop="totalPrice">
        </el-table-column>
        <el-table-column label="结账时间"
                         prop="date">
        </el-table-column>
        <el-table-column fixed="right"
                         label="操作"
                         width="100">
          <template slot-scope="scope">
            <el-button round
                       @click="openDialog(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination layout="prev, pager, next, jumper, ->, total"
                     :total="total"
                     :page-size="pageSize"
                     @current-change="loadOrder">
      </el-pagination>
    </el-main>
    <el-footer>

    </el-footer>
  </el-container>
</template>
<script>


export default {
  data() {
    return {
      orderList: [],
      orderItems: [],
      dialogFormVisible: false,
      currentOrder: {},
      searchFrom: {},
      pageSize: 10,
      total: 0
    }
  },
  methods: {
    openDialog(row) {
      let self = this
      self.dialogFormVisible = true
      self.currentOrder = row
      self.loadOrderItems()
    },
    loadOrderItems() {
      let self = this
      self.$http.get("/restaurant/getOrderItem", { params: { orderId: self.currentOrder._id } }).then(resolve => {
        self.orderItems = resolve.data.data.map(item => {
          item.price = "¥" + item.price
          return item
        })
      })
    },
    loadOrder(page = 1) {
      let self = this
      let params = Object.assign({}, self.searchFrom, { page })
      console.log("params", params)
      self.$http.get('/order/page', { params: params }).then(resolve => {
        self.orderList = resolve.data.data.list.map(item => {
          item.date = self.moment(item.startDateTime).format("YYYY-MM-DD HH:mm")
          item.duringDateTime = self.moment(item.startDateTime).format("YYYY-MM-DD HH:ss") + "-" + self.moment(item.endDateTime).format("YYYY-MM-DD HH:ss")
          item.paymentPrice = "¥" + item.paymentPrice
          item.totalPrice = "¥" + item.totalPrice
          return item
        })
        self.total = resolve.data.data.total
      })
    },
  },
  mounted() {
    let self = this
    self.loadOrder()
  }
}
</script>

<style scoped lang="scss">
.order-table-expand {
  font-size: 0;
  display: flex;
  flex-direction: column;
}
.order-table-expand label {
  color: #99a9bf;
}
</style>