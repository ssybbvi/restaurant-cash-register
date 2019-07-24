<template>
  <div id="order">
    <ul class="info">
      <li>{{$store.state.currentOrder.tableAreaName}}</li>
      <li>{{$store.state.currentOrder.tableName}}</li>
      <li>
        <i class="icon-time fs22"></i>
        <span>{{$store.state.currentOrder.startDateTime|spendTime}}</span>
      </li>
    </ul>
    <div class="orderItems">
      <draggable v-model="$store.state.productItems"
                 @end="endDraggable">
        <transition-group type="transition"
                          :name="'flip-list'">
          <ul @click="selectedOrderItem(item)"
              v-for="item in $store.state.productItems"
              :key="item._id">
            <li :class="orderItemClass(item)">{{item.name}}</li>
            <li>
              <span>￥{{item.price}}</span>
              <span v-show="item.isGift"
                    class="gift"></span>
              <span v-show="item.isTimeout"
                    class="time-out"></span>
              <span v-show="item.isExpedited"
                    class="expedited"></span>
              <span v-show="item.isBale"
                    class="bale"></span>
              <span class="highlighted-order-item"></span>
            </li>
          </ul>
        </transition-group>
      </draggable>
      <ul class="summary">
        <li>总金额:￥{{$store.state.currentOrder.totalPrice}}</li>
      </ul>
    </div>

    <div class="foot">
      <el-button @click="orderMake"
                 :disabled="!$store.state.productItems.some(f => f.status === $Enumerate.productStatus.normal)">下单到厨房</el-button>
      <el-button @click="settlement">开始结算</el-button>
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
  methods: {
    orderMake() {
      let self = this
      self.$http.put("/orderMake", { orderId: self.$store.state.currentOrder._id }).then(() => {
        self.$store.dispatch("feachOrderById")
        self.$http.post("/scheduling/loadOrderItemToWaitCookQueues")
      })
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
      if (item.status == self.$Enumerate.productStatus.cooking) {
        return "order-items-ing"
      }
      if (item.status == self.$Enumerate.productStatus.finish) {
        return "order-items-finish"
      }
      return ""
    },
    endDraggable() {
      console.log(this.$store.state.productItems)
    },
    // onMove({ relatedContext, draggedContext }) {
    //   let self = this
    //   const relatedElement = relatedContext.element;
    //   const draggedElement = draggedContext.element;
    //   return relatedElement.status !== self.$Enumerate.productStatus.finish && draggedElement.status !== self.$Enumerate.productStatus.finish
    // }
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
      li {
        display: flex;
        justify-content: center;
        &.order-items {
          color: #2ecc71;
        }
        &.order-items-ing {
          color: #f1c40f;
        }
        &.order-items-finish {
          color: #e74c3c;
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
    flex-basis: 50px;
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
