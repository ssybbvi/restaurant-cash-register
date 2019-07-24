<template>
  <section>
    <order-items ref="orderItems"></order-items>
    <product-list @selected="selectedProduct"
                  v-if="$store.state.orderMode==$Enumerate.orderMode.productList"></product-list>
    <order-item-info v-if="$store.state.orderMode==$Enumerate.orderMode.productItemInfo"></order-item-info>
    <settlement v-if="$store.state.orderMode==$Enumerate.orderMode.settlement"></settlement>
  </section>
</template>
<script>

import OrderItems from '@/components/orders/OrderItems.vue'
import ProductList from "@/components/products/List.vue"
import OrderItemInfo from '@/components/orders/OrderItemInfo.vue'
import Settlement from '@/components/orders/Settlement.vue'
import * as types from '@/store/mutation-types'
import enumerate from '@/filter/enumerate'

export default {
  data: function () {
    return {
      order: {
        productItems: [],
        offerPriceItems: [],
        eventItems: []
      },
    }
  },
  components: {
    ProductList,
    OrderItems,
    OrderItemInfo,
    Settlement
  },
  methods: {
    selectedProduct(product) {
      let self = this
      let orderId = self.$store.state.currentOrder._id
      self.$http.post("/orderItem", {
        orderId: orderId,
        productId: product._id,
        name: product.name,
        price: product.price,
        isGift: false,
        isTimeout: false,
        isExpedited: false,
        isBale: false,
        isDelete: false,
        remark: "",
        status: enumerate.productStatus.normal
      }).then(() => {
        self.$store.dispatch("feachOrderById")
      })
    },
    selectedOrderItem(product) {
      let self = this
      self.$store.commit(types.CURRENT_PRODUCT_ID, product._id)
      self.$store.commit(types.SET_ORDER_MODE, enumerate.orderMode.OrderItemInfo)
    },
  },
  mounted() {
    let self = this
    self.$store.dispatch("feachOrderById")
    self.$store.commit(types.SET_ORDER_MODE, enumerate.orderMode.productList)
  }
}
</script>
<style scoped lang="scss">
section {
  display: flex;
  flex-grow: 1;
}
</style>
