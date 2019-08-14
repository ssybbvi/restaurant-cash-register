<template>
  <section>
    <div class="product-status">
      <el-button @click="deleteOrderItem"
                 v-if="[$Enumerate.productStatus.normal,$Enumerate.productStatus.waitCooking].some(s=>s===productItem.status)">删除</el-button>
      <el-button @click="giftOrderItem"
                 :class="{'gift':productItem.isGift}">{{productItem.isGift?"取消赠菜":"赠菜"}}</el-button>
      <el-button @click="timeOutOrderItem"
                 v-if="[$Enumerate.productStatus.normal].some(s=>s===productItem.status)"
                 :class="{'time-out':productItem.isTimeout}">{{productItem.isTimeout?"取消暂停":"暂停"}}</el-button>
      <el-button @click="expediteOrderItem"
                 v-if="[$Enumerate.productStatus.normal,$Enumerate.productStatus.waitCooking].some(s=>s===productItem.status)"
                 :class="{'expedited':productItem.isExpedited}">{{productItem.isExpedited?"取消加急":"加急"}}</el-button>
      <el-button @click="baleOrderItem"
                 :class="{'bale':productItem.isBale}">{{productItem.isBale?"取消打包":"打包"}}</el-button>
      <el-button @click="returnOrderItems">返回</el-button>
    </div>
    <div class="product-info">
      <el-form label-width="80px"
               @submit.native.prevent>
        <el-form-item label="菜名">
          {{productItem.name}}
        </el-form-item>

        <el-form-item label="备注">
          <RemarkTextbox :remark="productItem.remark"
                         :reamrkType="$Enumerate.remarkType.product"
                         @remarkchange="setRemark"></RemarkTextbox>
        </el-form-item>
        <el-form-item label="">
          <span id="quantity">
            <el-button type="primary"
                       @click="save">保存</el-button>
          </span>
        </el-form-item>
      </el-form>
    </div>
  </section>
</template>

<script>
import * as types from '@/store/mutation-types'
import enumerate from '@/filter/enumerate'
import RemarkTextbox from '@/components/comm/RemarkTextbox'

export default {
  data() {
    return {
      orderItemRemark: ""
    }
  },
  components: {
    RemarkTextbox
  },
  computed: {
    productItem() {
      let self = this
      return self.$store.state.productItems.find(f => f._id == self.$store.state.currentOrderItemId)
    }
  },
  methods: {
    setRemark(val) {
      let self = this
      self.orderItemRemark = val
    },
    save() {
      let self = this
      self.$http.put(`/restaurant/setRemarkOrderItem`, {
        orderItemId: self.productItem._id,
        remark: self.orderItemRemark
      }).then(() => {
        self.$notify({
          title: '成功',
          message: '保存菜品备注成功',
          type: 'success'
        });
      })
    },
    returnOrderItems() {
      let self = this
      self.$store.commit(types.SET_ORDER_MODE, enumerate.orderMode.productList)
    },
    giftOrderItem() {
      let self = this
      self.$http.put(`/restaurant/setGiftOrderItem`, {
        orderItemId: self.productItem._id,
      })
    },
    timeOutOrderItem() {
      let self = this
      self.$http.put(`/restaurant/setTimeOutOrderItem`, {
        orderItemId: self.productItem._id,
      })
    },
    expediteOrderItem() {
      let self = this
      self.$http.put(`/restaurant/setExpediteOrderItem`, {
        orderItemId: self.productItem._id,
      })
    },
    baleOrderItem() {
      let self = this
      self.$http.put(`/restaurant/setBaleOrderItem`, {
        orderItemId: self.productItem._id,
      })
    },
    deleteOrderItem() {
      let self = this
      self.$http.delete("/restaurant/deleteOrderItem", { data: { orderItemId: self.productItem._id, deleteReamrk: "收银员删除" } })
      self.$store.commit(types.SET_ORDER_MODE, enumerate.orderMode.productList)
    }
  },
  mounted() {

  }
}
</script>
<style lang="scss" scoped>
section {
  display: flex;
  flex-grow: 1;
}

.product-status {
  display: flex;
  flex-basis: 120px;
  flex-direction: column;
  justify-content: flex-end;
  border-right: 1px solid #ccc;
  button {
    margin: 10px 10px;
  }
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
}

.product-info {
  width: 100%;
  .el-form {
    margin-top: 20px;
    .el-form-item {
      width: 80%;
    }
  }

  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
}
</style>