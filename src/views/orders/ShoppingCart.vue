<template>
  <section>
    <order-items
      ref="orderItems"
      :order="order"
      @order-make="orderMake()"
      @selected-order-item="selectedOrderItem"
      @set-mode="setMode"
    ></order-items>
    <product-list
      @selected="selectedProduct"
      v-if="currentOrderMode==orderMode.productProductList"
      @set-mode="setMode"
    ></product-list>
    <order-item-info
      v-if="currentOrderMode==orderMode.productItemInfo"
      :product-item="productItem"
      @update-product-item="updateProductItem"
      @set-mode="setMode"
    ></order-item-info>
    <settlement
      v-if="currentOrderMode==orderMode.settlement"
      @set-mode="setMode"
      :order="order"
    ></settlement>
  </section>
</template>
<script>

import OrderItems from '@/components/orders/OrderItems.vue'
import ProductList from "@/components/products/List.vue"
import OrderItemInfo from '@/components/orders/OrderItemInfo.vue'
import Settlement from '@/components/orders/Settlement.vue'
import restaurantApi from '@/webapi/restaurant'
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
      productItem: {},
      orderMode: {
        productProductList: 1,
        productItemInfo: 2,
        settlement: 3
      },
      currentOrderMode: 1
    }
  },
  components: {
    ProductList,
    OrderItems,
    OrderItemInfo,
    Settlement
  },
  methods: {
    setMode(mode) {
      let self = this
      self.currentOrderMode = mode
    },
    editOrderProduectItems() {
      let self = this
      restaurantApi.editOrderProduectItems(self.order).then(resolve => {
        self.order = resolve.data.data
      })
    },
    selectedProduct(product) {
      let self = this
      self.order.productItems.push({
        productId: product._id,
        isGift: false,
        isTimeout: false,
        isExpedited: false,
        isBale: false,
        isDelete: false,
        remark: "",
        status: enumerate.productStatus.normal
      })
      self.editOrderProduectItems()
    },
    orderMake() {
      let self = this
      restaurantApi.orderMake({ orderId: self.order._id }).then(resolve => {
        self.loadOrder()
      })
    },
    selectedOrderItem(product) {
      let self = this
      self.productItem = product
      self.currentOrderMode = this.orderMode.productItemInfo
    },
    updateProductItem(product) {
      let self = this
      if (product.isDelete) {
        self.currentOrderMode = this.orderMode.productProductList
      }
      let productIndex = self.order.productItems.findIndex(f => f._id == product._id)
      self.order.productItems[productIndex] = product
      self.editOrderProduectItems()
    },
    loadOrder() {
      let self = this
      let orderId = self.$route.query.orderId
      restaurantApi.getOrder(orderId).then(resolve => {
        self.order = resolve.data.data
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
section {
  display: flex;
  flex-grow: 1;
}
</style>
