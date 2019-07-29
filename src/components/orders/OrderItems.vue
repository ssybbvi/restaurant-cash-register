<template>
  <div id="order">
    <ul class="info">

      <li>{{$store.state.currentOrder.tableName}}</li>
      <li>
        <i class="icon-time fs22"></i>
        <span>{{$store.state.currentOrder.startDateTime|spendTime}}</span>
      </li>
      <li><i class="el-icon-s-unfold"
           style="font-size:24px"
           @click="swichToTablePanel"></i></li>
    </ul>
    <div class="orderItems">
      <draggable v-model="$store.state.productItems"
                 :move="onMove"
                 @end="endDraggable">
        <transition-group type="transition"
                          :name="'flip-list'">
          <ul @click="selectedOrderItem(item)"
              v-for=" item  in $store.state.productItems"
              :key="item._id"
              :class="$store.state.currentOrderItemId===item._id?'selected':''">
            <li :class="
              orderItemClass(item)">{{item.name}}</li>
            <li>
              <span>￥{{item.isGift?0:item.price}}</span>
              <span v-show="item.isGift"
                    class="gift"></span>
              <span v-show="item.isTimeout"
                    class="time-out"></span>
              <span v-show="item.isExpedited"
                    class="expedited"></span>
              <span v-show="item.isBale"
                    class="bale"></span>
            </li>
          </ul>
        </transition-group>
      </draggable>
      <ul class="summary">
        <li>总金额:￥{{getTotalAmount()}}</li>
      </ul>
    </div>

    <div class="foot">

      <el-button @click="settlement"
                 v-show="!orderSettlementStatus">开始结算</el-button>
      <el-button @click="cancelOrder"
                 v-show="orderSettlementStatus">取消订单</el-button>
      <el-button @click="orderMake"
                 :disabled="orderMakeStatus">下单到厨房</el-button>
    </div>
  </div>
</template>
<script>
import Draggable from 'vuedraggable'
import * as types from "@/store/mutation-types"

export default {
  data: function () {
    return {

    }
  },
  components: {
    Draggable,
  },
  computed: {
    orderSettlementStatus() {
      return this.$store.state.productItems.every(e => e.status === this.$Enumerate.productStatus.normal)
    },
    orderMakeStatus() {
      return !this.$store.state.productItems.some(f => f.status === this.$Enumerate.productStatus.normal && f.isTimeout === false)
    }
  },
  methods: {
    orderMake() {
      let self = this
      self.$http.put("/restaurant/orderMake", { orderId: self.$store.state.currentOrder._id })
    },
    settlement() {
      let self = this
      self.$store.commit(types.SET_ORDER_MODE, self.$Enumerate.orderMode.settlement)
    },
    selectedOrderItem(item) {
      let self = this
      self.$store.commit(types.CURRENT_PRODUCT_ID, item._id)
      self.$store.commit(types.SET_ORDER_MODE, self.$Enumerate.orderMode.productItemInfo)
    },
    orderItemClass(item) {
      let self = this
      if (item.status == self.$Enumerate.productStatus.normal) {
        return "order-items"
      }
      if (item.status == self.$Enumerate.productStatus.waitCooking) {
        return "order-items-wait"
      }
      if (item.status == self.$Enumerate.productStatus.cooking) {
        return "order-items-ing"
      }
      if (item.status == self.$Enumerate.productStatus.finish) {
        return "order-items-finish"
      }
      if (item.status == self.$Enumerate.productStatus.transporting) {
        return "order-items-transporting"
      }
      if (item.status == self.$Enumerate.productStatus.transportFinish) {
        return "order-items-transport-finish"
      }
      return ""
    },
    endDraggable() {
      let self = this
      let orderItemIds = self.$store.state.productItems.map(item => item._id)
      self.$http.put("/restaurant/setOrderItemSort", { orderItemIds, orderId: self.$store.state.route.query.orderId })
    },
    onMove({ relatedContext, draggedContext }) {
      let self = this
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      return relatedElement.status === self.$Enumerate.productStatus.normal && draggedElement.status === self.$Enumerate.productStatus.normal
    },
    getTotalAmount() {
      let self = this
      return self.$store.state.productItems.reduce((acc, cur) => {
        acc += cur.isGift ? 0 : cur.price
        return acc
      }, 0)
    },
    cancelOrder() {
      let self = this
      self.$http.put("/restaurant/cancelOrder", { orderId: self.$store.state.route.query.orderId }).then(() => {
        self.$router.push({ name: "tables" })
      })
    },
    swichToTablePanel() {
      let self = this
      self.$store.commit(types.SET_ORDER_TABLE_MODE, self.$Enumerate.orderTableMode.tablePanel)
    }
  },
  mounted() {

  }
}
</script>

<style scoped lang="scss">
.gift {
  background-color: #2ecc71;
  color: white;
}

.time-out {
  background-color: #3498db;
  color: white;
}

.expedited {
  background-color: #e74c3c;
  color: white;
}

.bale {
  background-color: #f39c12;
  color: white;
}

#order {
  display: flex;
  flex-basis: 300px;
  flex-shrink: 0;
  flex-direction: column;
  border-right: 1px solid #ccc;
  .info {
    display: flex;
    flex-shrink: 0;
    background-color: rgb(23, 52, 82);
    color: white;
    font-size: 16px;
    font-weight: 500;
    li {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-grow: 1;
      height: 55px;
    }
  }
  .orderItems {
    flex-grow: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    ul {
      display: flex;
      height: 40px;
      border-bottom: 1px solid #ccc;
      font-size: 16px;
      &.selected {
        background-color: #ecf0f1;
      }
      li {
        display: flex;
        justify-content: center;
        &.order-items {
          color: #2ecc71;
        }
        &.order-items-wait {
          color: #2980b9;
        }
        &.order-items-ing {
          color: #f1c40f;
        }
        &.order-items-finish {
          color: #e74c3c;
        }
        &.order-items-transporting {
          color: #8e44ad;
        }
        &.order-items-transport-finish {
          color: #2c3e50;
        }
        height: 100%;
        display: flex;
        align-items: center;
      }
      li:nth-child(1) {
        flex-grow: 1;
        padding-left: 5px;
      }
      li:nth-child(2) {
        color: #3498db;
        flex-basis: 100px;
        padding-left: 5px;
        span:nth-child(1) {
          flex-grow: 1;
        }
        span:nth-child(2) {
          height: 100%;
          flex-basis: 5px;
        }
        span:nth-child(3) {
          height: 100%;
          flex-basis: 5px;
        }
        span:nth-child(4) {
          height: 100%;
          flex-basis: 5px;
        }
        span:nth-child(5) {
          height: 100%;
          flex-basis: 5px;
        }
      }
    }
    .summary {
      li {
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-right: 10px;
        border-bottom: 1px solid #ccc;
      }
    }
  }
  .foot {
    display: flex;
    flex-shrink: 0;
    flex-basis: 60px;
    justify-content: space-around;
    align-items: center;
    border-top: 1px solid #ccc;
  }
}

#tags {
  display: flex;
  font-size: 18px;
  li {
    display: flex;
    i {
      margin-left: 10px;
      margin-right: 20px;
    }
  }
}
</style>
