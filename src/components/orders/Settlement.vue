<template>
  <div id="container">
    <div class="settlement-info">
      <el-form ref="form"
               label-width="80px">
        <el-form-item label="应收">
          {{ totalPrice}}
        </el-form-item>
        <el-form-item label="优惠">
          {{0}}
        </el-form-item>
        <el-form-item label="实收">
          <el-input-number v-model="paymentPrice"
                           :step="0.5"
                           :precision="1"
                           :min="1"
                           label="描述文字"></el-input-number>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="remark"
                    style="width:80%"
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"> </el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button @click="returnOrderItems">返回</el-button>
          <el-button type="primary"
                     @click="paymentOrder">结算</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import * as types from '@/store/mutation-types'
import enumerate from '@/filter/enumerate'
import { getUserInfo } from "@/webapi/tool"


export default {
  data() {
    return {
      paymentPrice: 0,
      totalPrice: 0,
      remark: ""
    }
  },
  components: {
  },
  computed: {

  },
  methods: {
    getTotalPrice() {
      let self = this
      return self.$store.state.productItems.reduce((acc, cur) => acc + cur.price, 0)
    },
    returnOrderItems() {
      let self = this
      self.$store.commit(types.SET_ORDER_MODE, enumerate.orderMode.productList)
    },
    paymentOrder() {
      let self = this
      let userInfo = getUserInfo().userInfo

      self.$store.commit(types.SET_ORDER_MODE, enumerate.orderMode.productList)
      self.$http.post("/restaurant/paymentOrder", {
        orderId: self.$store.state.currentOrder._id,
        remark: self.remark,
        paymentPrice: self.paymentPrice,
        totalPrice: self.totalPrice,
        cashierName: userInfo.name,
        cashieUserId: userInfo._id
      }).then(() => {
        self.$router.push({ name: 'tables' })
      })
    }
  },
  mounted() {
    var self = this
    self.paymentPrice = self.getTotalPrice()
    self.totalPrice = self.getTotalPrice()
  }
}
</script>

<style scoped lang="scss">
#container {
  margin-top: 50px;
  width: 100%;
}
</style>
