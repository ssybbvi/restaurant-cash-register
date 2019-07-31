<template>
  <div id="container">
    <div class="settlement-info">
      <el-form ref="form"
               label-width="80px">
        <el-form-item label="应收">
          ¥{{ totalPrice}}
        </el-form-item>
        <el-form-item label="打折金额">
          <el-select v-model="discountPrice">
            <el-option v-for="item in discountPriceOptions"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="直减金额">
          <el-input-number v-model="cutBackPrice"
                           :min="0"
                           :max="totalPrice"
                           label="描述文字"></el-input-number>
        </el-form-item>
        <el-form-item label="优惠">
          <div>
            <span></span> <span>¥{{totalOfferPrice}}</span>
          </div>
          <div v-for="(item,index) in offerList"
               class="grep"
               :key="index">
            <span>{{item.name}}:</span> <span>¥{{item.offerPrice}}</span>
          </div>

        </el-form-item>
        <el-form-item label="实收">
          <el-input-number v-model="paymentPrice"
                           :step="1"
                           :min="0"></el-input-number> 建议收款:¥{{suggestPaymentPrice}}
        </el-form-item>
        <el-form-item label="顾客付款">
          <el-input-number v-model="customerPrice"
                           :step="1"
                           :min="0"></el-input-number> 找零：¥{{changePrice}}
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
import { getUserInfo } from "@/webapi/tool"
import NP from 'number-precision'

export default {
  data() {
    return {
      cutBackPrice: 0,
      discountPrice: 1,
      discountPriceOptions: [
        { value: 1, label: "请选择打折力度" },
        { value: 0.8, label: "8折" },
        { value: 0.9, label: "老顾客优惠大酬宾（9折）" },
        { value: 0.98, label: "98折" }],
      remark: "",
      paymentPrice: 0,
      customerPrice: 0
    }
  },
  computed: {
    totalPrice() {
      let self = this
      let orderItemTotalPrice = self.$store.state.productItems.reduce((acc, cur) => {
        if (!cur.isGift) {
          acc = NP.plus(acc, cur.price)
        }
        return acc
      }, 0)
      orderItemTotalPrice += NP.times(self.$store.state.currentOrder.seatPrice, self.$store.state.currentOrder.seat)
      return orderItemTotalPrice
    },
    offerList() {
      let self = this
      let list = self.$store.state.productItems.filter(f => f.isGift).map(item => {
        return {
          offerPrice: item.price,
          name: `${item.name}(赠送)`
        }
      })

      if (self.discountPrice < 1) {
        list.push({
          offerPrice: NP.times(self.totalPrice, NP.minus(1, self.discountPrice)),
          name: self.discountPriceOptions.find(f => f.value === self.discountPrice).label
        })
      }

      if (self.cutBackPrice > 0) {
        list.push({
          offerPrice: self.cutBackPrice,
          name: `直减金额`
        })
      }

      let _totalOfferPrice = list.reduce((acc, cur) => {
        acc = NP.plus(acc, cur.offerPrice)
        return acc
      }, 0)

      let _suggestPaymentPrice = self.totalPrice - _totalOfferPrice

      let wipeZeroPrice = NP.minus(_suggestPaymentPrice, Math.floor(_suggestPaymentPrice))
      if (wipeZeroPrice > 0) {
        list.push({
          offerPrice: wipeZeroPrice,
          name: `抹零`
        })
      }

      return list
    },
    totalOfferPrice() {
      let self = this
      return self.offerList.reduce((acc, cur) => {
        acc = NP.plus(acc, cur.offerPrice)
        return acc
      }, 0)
    },
    suggestPaymentPrice() {
      let self = this
      let _suggestPaymentPrice = NP.minus(self.totalPrice, self.totalOfferPrice)
      self.setPaymentPriceWithCustomerPrice(_suggestPaymentPrice)
      return _suggestPaymentPrice
    },
    changePrice() {
      let self = this
      return NP.minus(self.customerPrice, self.paymentPrice)
    }
  },
  methods: {
    setPaymentPriceWithCustomerPrice(_suggestPaymentPrice) {
      let self = this
      self.paymentPrice = _suggestPaymentPrice
      self.customerPrice = _suggestPaymentPrice
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
        cashieUserId: userInfo._id,
        offerList: self.offerList,
        totalOfferPrice: self.totalOfferPrice,
        paymentType: self.$Enumerate.paymentType.cash
      }).then(() => {
        self.$notify({
          title: '成功',
          message: '结算成功',
          type: 'success'
        });
        self.$router.push({ name: 'tables' })
      })
    }
  },
  mounted() {
  }
}
</script>

<style scoped lang="scss">
#container {
  margin-top: 50px;
  width: 100%;
}

.grep {
  color: #bbb;
}
</style>
