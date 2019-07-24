<template>
  <section>
    <div class="product-status">
      <el-button @click="deleteOrderItem">删除</el-button>
      <el-button @click="giftOrderItem"
                 :class="{'gift':productItem.isGift}">{{productItem.isGift?"取消赠菜":"赠菜"}}</el-button>
      <el-button @click="timeOutOrderItem"
                 :class="{'time-out':productItem.isTimeout}">{{productItem.isTimeout?"取消暂停":"暂停"}}</el-button>
      <el-button @click="expediteOrderItem"
                 :class="{'expedited':productItem.isExpedited}">{{productItem.isExpedited?"取消加急":"加急"}}</el-button>
      <el-button @click="baleOrderItem"
                 :class="{'bale':productItem.isBale}">{{productItem.isBale?"取消打包":"打包"}}</el-button>
      <el-button @click="returnOrderItems">返回</el-button>
    </div>
    <div class="product-info">
      <el-form label-width="80px">
        <el-form-item label="菜名">
          {{productItem.name}}
        </el-form-item>
        <el-form-item label="数量"
                      v-if="false">
          <span id="quantity">
            <el-input-number v-model="productItem.quantity"
                             @change="savePorductItem"
                             :min="0"
                             :max="10"></el-input-number>
          </span>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="productItem.remark"> </el-input>
        </el-form-item>
        <el-form-item label="">
          <el-tag :key="item._id"
                  v-for="item in productRemark"
                  :closable="remarkEditMode"
                  :disable-transitions="false"
                  @close="handleCloseRemark(item)"
                  @click="setRemark(item.content)">
            {{item.content}}
          </el-tag>
          <el-input class="input-new-tag"
                    v-if="reamrkInputVisible"
                    v-model="remakContent"
                    ref="saveTagInput"
                    size="small"
                    @keyup.enter.native="inputConfirmRemark"
                    @blur="inputConfirmRemark">
          </el-input>
          <el-button v-else
                     v-show="remarkEditMode"
                     class="button-new-tag"
                     size="small"
                     @click="showRemarkInput">创建快速备注</el-button>
          <i v-if="remarkEditMode"
             @click="remarkEditMode=!remarkEditMode"
             class="el-icon-s-tools"
             style="font-size:24px;margin-left:10px;position: relative;top: 4px;"></i>
          <i v-if="!remarkEditMode"
             @click="remarkEditMode=!remarkEditMode"
             class="el-icon-setting"
             style="font-size:24px;margin-left:10px;position: relative;top: 4px;"></i>
        </el-form-item>
      </el-form>
    </div>
  </section>
</template>

<script>
import * as types from '@/store/mutation-types'
import enumerate from '@/filter/enumerate'

export default {
  data() {
    return {
      productRemark: [],
      reamrkInputVisible: false,
      remakContent: "",
      remarkEditMode: false
    }
  },
  components: {
  },
  computed: {
    productItem() {
      let self = this
      return self.$store.state.productItems.find(f => f._id == self.$store.state.currentProductId)
    }
  },
  methods: {
    returnOrderItems() {
      let self = this
      self.$store.commit(types.SET_ORDER_MODE, enumerate.orderMode.productList)
    },
    loadRmark() {
      let self = this
      self.$http.get("/remark", { params: { type: enumerate.remarkType.product } }).then(resolve => {
        self.productRemark = resolve.data.data
      })
    },
    showRemarkInput() {
      this.reamrkInputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleCloseRemark(remark) {
      let self = this
      self.$http.delete("/remark", {
        data: remark._id
      }).then(() => {
        self.loadRmark()
      })
    },
    inputConfirmRemark() {
      let self = this
      let remakContent = this.remakContent;
      if (remakContent) {
        self.$http.post("/remark", { type: enumerate.remarkType.product, content: remakContent }).then(() => {
          self.loadRmark()
        })
      }
      this.reamrkInputVisible = false;
      this.remakContent = '';
    },
    setRemark(content) {
      let self = this
      self.savePorductItem({ remark: self.productItem.remark + content })
    },
    giftOrderItem() {
      let self = this
      self.savePorductItem({ isGift: !self.productItem.isGift })
    },
    timeOutOrderItem() {
      let self = this
      self.savePorductItem({ isTimeout: !self.productItem.isTimeout })
    },
    expediteOrderItem() {
      let self = this
      self.savePorductItem({ isExpedited: !self.productItem.isExpedited })
    },
    baleOrderItem() {
      let self = this
      self.savePorductItem({ isBale: !self.productItem.isBale })
    },
    deleteOrderItem() {
      let self = this
      let orderItemId = self.$store.state.currentProductId
      self.$http.delete("/orderItem", { data: { _id: orderItemId } }).then(() => {
        self.$store.commit(types.SET_ORDER_MODE, enumerate.orderMode.productList)
        self.$store.dispatch("feachOrderById")
        if (self.productItem.state === self.$Enumerate.productStatus.waitCooking) {
          self.$http.post("/scheduling/deleteWaitCookQueueChefOrderItem")
        }
      })
    },
    savePorductItem(updateBody) {
      let self = this
      let orderItemId = self.$store.state.currentProductId
      self.$http.put(`/orderItem?_id=${orderItemId}`, updateBody).then(() => {
        self.$store.dispatch("feachOrderById")
      })
    }
  },
  mounted() {
    var self = this
    self.loadRmark()
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