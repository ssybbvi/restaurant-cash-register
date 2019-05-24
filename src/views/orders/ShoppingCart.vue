<template>
  <section>
    <order-items
      ref="orderItems"
      :order="order"
      @order-make="orderMake()"
      @order-item-detail="orderItemDetail()"
    ></order-items>
    <!-- <product-list @selected="selectedProduct"></product-list> -->
    <order-item-info></order-item-info>
    <!-- <settlement></settlement> -->
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
      }
    }
  },
  components: {
    ProductList,
    OrderItems,
    OrderItemInfo,
    Settlement
  },
  methods: {
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
          status: enumerate.productStatus.normal
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
    orderItemDetail() {
      let self = this
    },
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
