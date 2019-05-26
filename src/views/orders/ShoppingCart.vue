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
      console.log(mode)
      self.currentOrderMode = mode
    },
    updateOrder() {
      let self = this
      restaurantApi.updateOrderProduct(self.order).then(resolve => {
        self.order = resolve.data.data
      })
    },
    selectedProduct(product) {
      let self = this
      let orderProduct = self.order.productItems.find(f => f._id == product._id)
      if (orderProduct) {
        orderProduct.quantity++
      } else {
        self.order.productItems.push({
          _id: product._id,
          name: product.name,
          quantity: 1,
          price: product.price,
          status: enumerate.productStatus.normal,
          isGift: false,
          isTimeout: false,
          isExpedited: false,
          isBale: false,
          lastUpateTime: new Date().getTime(),
          remarks: ""
        })
      }
      self.updateOrder()
    },
    orderMake() {
      let self = this
      self.order.productItems.filter(f => f.status == enumerate.productStatus.normal).forEach(item => {
        item.status = enumerate.productStatus.cooking
      })
      self.updateOrder()
    },
    selectedOrderItem(product) {
      let self = this
      self.productItem = product
    },
    updateProductItem(product) {
      let self = this
      let productIndex = self.order.productItems.findIndex(f => f._id == product._id)
      self.order.productItems[productIndex] = product
      self.updateOrder()
    }
  },
  mounted() {
    let self = this
    let orderId = self.$route.query.orderId

    restaurantApi.getOrder(orderId).then(resolve => {
      self.order = resolve.data.data
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
