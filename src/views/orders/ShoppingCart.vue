<template>
  <section>
    <order-items v-if="$store.state.orderTableMode===$Enumerate.orderTableMode.orderItemList"></order-items>
    <table-panel v-if="$store.state.orderTableMode===$Enumerate.orderTableMode.tablePanel"></table-panel>
    <product-list @selected="selectedProduct"
                  v-if="$store.state.orderMode===$Enumerate.orderMode.productList"></product-list>
    <order-item-info v-if="$store.state.orderMode===$Enumerate.orderMode.productItemInfo"></order-item-info>
    <settlement v-if="$store.state.orderMode===$Enumerate.orderMode.settlement"></settlement>
  </section>
</template>
<script>

import OrderItems from '@/components/orders/OrderItems.vue'
import ProductList from "@/components/products/List.vue"
import OrderItemInfo from '@/components/orders/OrderItemInfo.vue'
import Settlement from '@/components/orders/Settlement.vue'
import TablePanel from '@/components/orders/TablePanel.vue'
import * as types from '@/store/mutation-types'
import enumerate from '@/filter/enumerate'
import { subscriptionSocket } from '../../webapi/socket-client'

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
    Settlement,
    TablePanel
  },
  methods: {
    selectedProduct(product) {
      let self = this
      let orderId = self.$store.state.route.query.orderId
      self.$http.post("/restaurant/insertOrderItem", {
        orderId: orderId,
        productId: product._id,
        name: product.name,
        price: product.price,
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
    self.$store.commit(types.SET_ORDER_TABLE_MODE, enumerate.orderTableMode.orderItemList)
    subscriptionSocket(`orderId:${self.$store.state.route.query.orderId}`, () => {
      self.$store.dispatch("feachOrderById")
    })
  }
}
</script>
<style scoped lang="scss">
section {
  display: flex;
  flex-grow: 1;
}
</style>
