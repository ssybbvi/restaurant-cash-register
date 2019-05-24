<template>
  <div id="order">
    <ul class="info">
      <li>{{order.area}}</li>
      <li>{{order.name}}</li>
      <li>
        <i class="icon-time fs22"></i>
        <span>{{order.startDataTime}}</span>
      </li>
    </ul>
    <div class="orderItems">
      <span>
        <ul
          @click="selectedOrderItem(item)"
          v-for="item in nomalProductList"
          :key="item._id"
        >
          <li class="order-items-ing">{{item.name}}</li>
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
      </span>
      <draggable>
        <transition-group>
          <ul
            @click="selectedOrderItem(item)"
            v-for="item in otherProductList"
            :key="item._id"
          >
            <li class="order-items">{{item.name}}</li>
            <li>
              <span>￥{{item.price}}x{{item.quantity}}</span>
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
        </transition-group>
      </draggable>
      <ul class="summary">
        <li>结算:￥{{order.totalPrice}}</li>
      </ul>
    </div>

    <div class="foot">
      <el-button @click="$emit('order-make')">下单到厨房</el-button>
      <el-button>结算</el-button>
    </div>
  </div>
</template>
<script>
import Draggable from 'vuedraggable'
import * as types from "@/store/mutation-types"
import restaurantApi from '@/webapi/restaurant'
import enumerate from '@/filter/enumerate'


export default {
  props: {
    order: {
      type: Object
    }
  },
  data: function () {
    return {

    }
  },
  components: {
    Draggable,
  },
  methods: {
    menuSelect() {

    },
    selectedOrderItem(item) {
      let self = this

    },
    computerOpenTime(time) {
      return time - new Date()
    },

    orderMake() {
      let self = this
      restaurantApi.orderMake({ tableId: self.$route.query.tableId })
    }

  },
  computed: {
    nomalProductList() {
      return this.order.productItems.filter(f => f.status != enumerate.productStatus.normal)
    },
    otherProductList() {
      return this.order.productItems.filter(f => f.status == enumerate.productStatus.normal)
    }
  },
  mounted() {
    var self = this
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
    span {
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
