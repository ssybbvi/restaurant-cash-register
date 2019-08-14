<template>
  <el-container>
    <order-details ref="orderDetails" />
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
                         prop="paymentDateTime">
        </el-table-column>
        <el-table-column fixed="right"
                         label="操作"
                         width="100">
          <template slot-scope="scope">
            <el-button round
                       @click="selected(scope.row)">详情</el-button>
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

import OrderDetails from '@/components/orders/OrderDetails'

export default {
  components: {
    OrderDetails
  },
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
    selected(row) {
      let self = this
      self.$refs.orderDetails.currentOrder = row
      self.$refs.orderDetails.drawer = true
      self.$http.get("/restaurant/getOrderItem", { params: { orderId: row._id } }).then(resolve => {
        self.$refs.orderDetails.orderItems = resolve.data.data.map(item => {
          item.price = "¥" + item.price
          return item
        })
      })
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
      self.$http.get('/order/page', { params: params }).then(resolve => {
        self.orderList = resolve.data.data.list.map(item => {
          item.paymentDateTime = self.moment(item.paymentDateTime).format("YYYY-MM-DD HH:mm")
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