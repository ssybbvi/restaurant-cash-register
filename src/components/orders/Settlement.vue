<template>
  <div id="container">
    <div class="settlement-info">
      <el-form
        ref="form"
        label-width="80px"
      >
        <el-form-item label="应收">
          {{order.totalPrice}}
        </el-form-item>
        <el-form-item label="优惠">
          {{0}}
        </el-form-item>
        <el-form-item label="实收">
          <el-input-number
            v-model="order.paymentPrice"
            :step="0.5"
            :precision="1"
            :min="1"
            label="描述文字"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            style="width:80%"
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
          > </el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button @click="$emit('set-mode',1)">返回</el-button>
          <el-button
            type="primary"
            @click="paymentOrder"
          >结算</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import restaurantApi from '@/webapi/restaurant'

export default {
  props: {
    order: {
      type: Object
    }
  },
  data() {
    return {
    }
  },
  components: {
  },
  methods: {
    paymentOrder() {
      let self = this
      console.log({
        orderId: self.order._id,
        paymentPrice: self.order.paymentPrice
      })
      restaurantApi.paymentOrder({
        orderId: self.order._id,
        paymentPrice: self.order.paymentPrice
      }).then(resolve => {
        self.$router.push({ name: 'tables' })
        console.log(resolve)
      })
    }
  },
  mounted() {
    var self = this
    self.paymentPrice = order.paymentPrice
  }
}
</script>

<style scoped lang="scss">
#container {
  margin-top: 50px;
  width: 100%;
}
</style>
