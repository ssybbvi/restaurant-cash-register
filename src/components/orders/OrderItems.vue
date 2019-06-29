<template>
  <div id="order">
    <ul class="info">
      <li>{{$store.state.currentOrder.tableAreaName}}</li>
      <li>{{$store.state.currentOrder.tableName}}</li>
      <li>
        <i class="icon-time fs22"></i>
        <span>{{$store.state.currentOrder.startDataTime|spendTime}}</span>
      </li>
    </ul>
    <div class="orderItems">
      <!-- <span >
        <ul
          @click="selectedOrderItem(item)"
          v-for="item in otherProductList "
          :key="item._id"
        >
          <li :class="orderItemClass(item)">{{item.name}}</li>
          <li>
            <span>￥{{item.price}}</span>
            <span
              v-show="item.isGift"
              class="gift"
            ></span>
            <span
              v-show="item.isTimeout"
              class="time-out"
            ></span>
            <span
              v-show="item.isExpedited"
              class="expedited"
            ></span>
            <span
              v-show="item.isBale"
              class="bale"
            ></span>
          </li>
        </ul>
      </span> -->
      <draggable @sort="orderProductSort">
        <ul
          @click="selectedOrderItem(item)"
          v-for="item in cookingProductList "
          :key="item._id"
        >
          <li :class="orderItemClass(item)">{{item.name}}</li>
          <li>
            <span>￥{{item.price}}</span>
            <span
              v-show="item.isGift"
              class="gift"
            ></span>
            <span
              v-show="item.isTimeout"
              class="time-out"
            ></span>
            <span
              v-show="item.isExpedited"
              class="expedited"
            ></span>
            <span
              v-show="item.isBale"
              class="bale"
            ></span>
            <span class="highlighted-order-item"></span>
          </li>
        </ul>
      </draggable>
      <draggable @sort="orderProductSort">
        <ul
          @click="selectedOrderItem(item)"
          v-for="item in nomalProductList"
          :key="item._id"
        >
          <li :class="orderItemClass(item)">{{item.name}}</li>
          <li>
            <span>￥{{item.price}}</span>
            <span
              v-show="item.isGift"
              class="gift"
            ></span>
            <span
              v-show="item.isTimeout"
              class="time-out"
            ></span>
            <span
              v-show="item.isExpedited"
              class="expedited"
            ></span>
            <span
              v-show="item.isBale"
              class="bale"
            ></span>
            <span class="highlighted-order-item"></span>
          </li>
        </ul>
      </draggable>
      <ul class="summary">
        <li>总金额:￥{{$store.state.currentOrder.totalPrice}}</li>
      </ul>
    </div>

    <div class="foot">
      <el-button
        @click="orderMake"
        :disabled="orderMakeStatus"
      >下单到厨房</el-button>
      <el-button @click="settlement">开始结算</el-button>
    </div>
  </div>
</template>
<script>
import Draggable from 'vuedraggable'
import * as types from "@/store/mutation-types"
import enumerate from '@/filter/enumerate'

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
      })
    },
    settlement() {
      let self = this
      self.$store.commit(types.SET_ORDER_MODE, enumerate.orderMode.settlement)
    },
    selectedOrderItem(item) {
      let self = this
      self.$store.commit(types.CURRENT_PRODUCT_ID, item._id)
      self.$store.commit(types.SET_ORDER_MODE, enumerate.orderMode.productItemInfo)
    },
    orderItemClass(item) {
      if (item.status == enumerate.productStatus.normal) {
        return "order-items"
      }
      if (item.status == enumerate.productStatus.cooking) {
        return "order-items-ing"
      }
      if (item.status == enumerate.productStatus.finish) {
        return "order-items-finish"
      }
      return ""
    },
    orderProductSort() {
    }
  },
  computed: {
    nomalProductList() {
      return this.$store.state.productItems.filter(f => f.status == enumerate.productStatus.normal)
    },
    cookingProductList() {
      return this.$store.state.productItems.filter(f => f.status == enumerate.productStatus.cooking)
    },
    orderMakeStatus() {
      return !this.$store.state.productItems.some(f => f.status == enumerate.productStatus.normal)
    }
  },
  mounted() {

  }
}
</script>

<style scoped lang="scss">
.gift {
  background-color: #13ce66;
  color: white;
}

.time-out {
  background-color: #20a0ff;
  color: white;
}

.expedited {
  background-color: #ff4949;
  color: white;
}

.bale {
  background-color: #f7ba2a;
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
          color: #13ce66;
        }
        &.order-items-ing {
          color: #f7ba2a;
        }
        &.order-items-finish {
          color: #ff4949;
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
