<template>
  <section>
    <div class="product-status">
      <el-button @click="deleteOrderItem">删除</el-button>
      <el-button
        @click="giftOrderItem"
        :class="{'gift':productItem.isGift}"
      >{{productItem.isGift?"取消赠菜":"赠菜"}}</el-button>
      <el-button
        @click="timeOutOrderItem"
        :class="{'time-out':productItem.isTimeout}"
      >{{productItem.isTimeout?"取消暂停":"暂停"}}</el-button>
      <el-button
        @click="expediteOrderItem"
        :class="{'expedited':productItem.isExpedited}"
      >{{productItem.isExpedited?"取消加急":"加急"}}</el-button>
      <el-button
        @click="baleOrderItem"
        :class="{'bale':productItem.isBale}"
      >{{productItem.isBale?"取消打包":"打包"}}</el-button>
      <el-button @click="$emit('set-mode',1)">返回</el-button>
    </div>
    <div class="product-info">
      <el-form label-width="80px">
        <el-form-item label="菜名">
          {{productItem.name}}
        </el-form-item>
        <el-form-item
          label="数量"
          v-if="false"
        >
          <span id="quantity">
            <el-input-number
              v-model="productItem.quantity"
              @change="savePorductItem"
              :min="0"
              :max="10"
            ></el-input-number>
          </span>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="productItem.remark"
          > </el-input>
        </el-form-item>
        <el-form-item label="">
          <el-tag
            :key="item._id"
            v-for="item in productRemark"
            :closable="remarkEditMode"
            :disable-transitions="false"
            @close="handleCloseRemark(item)"
            @click="selectRemark(item)"
          >
            {{item.content}}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="reamrkInputVisible"
            v-model="remakContent"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="inputConfirmRemark"
            @blur="inputConfirmRemark"
          >
          </el-input>
          <el-button
            v-else
            v-show="remarkEditMode"
            class="button-new-tag"
            size="small"
            @click="showRemarkInput"
          >创建快速备注</el-button>
          <i
            v-if="remarkEditMode"
            @click="remarkEditMode=!remarkEditMode"
            class="el-icon-s-tools"
            style="font-size:24px;margin-left:10px;position: relative;top: 4px;"
          ></i>
          <i
            v-if="!remarkEditMode"
            @click="remarkEditMode=!remarkEditMode"
            class="el-icon-setting"
            style="font-size:24px;margin-left:10px;position: relative;top: 4px;"
          ></i>
        </el-form-item>
      </el-form>
    </div>
  </section>
</template>

<script>
import restaurantApi from '@/webapi/restaurant'
import * as types from '@/store/mutation-types'
import enumerate from '@/filter/enumerate'

export default {
  props: {
    productItem: {
      type: Object
    }
  },
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
  methods: {
    loadRmark() {
      let self = this
      restaurantApi.fetchRemark({ params: { type: enumerate.remarkType.product } }).then(resolve => {
        self.productRemark = resolve.data.data
      })
    },
    showRemarkInput() {
      this.reamrkInputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleCloseRemark(remark) {
      let self = this
      restaurantApi.deleteRemark({ _id: remark._id }).then(resolve => {
        self.loadRmark()
      })
    },
    inputConfirmRemark() {
      let self = this
      let remakContent = this.remakContent;
      if (remakContent) {
        restaurantApi.createRemark({ type: enumerate.remarkType.product, content: remakContent }).then(resolve => {
          self.loadRmark()
        })
      }
      this.reamrkInputVisible = false;
      this.remakContent = '';
    },
    selectRemark(remark) {
      let self = this
      self.productItem.remark = self.productItem.remark + remark.content
      self.savePorductItem()
    },
    giftOrderItem() {
      let self = this
      self.productItem.isGift = !self.productItem.isGift
      self.savePorductItem()
    },
    timeOutOrderItem() {
      let self = this
      self.productItem.isExpedited = false
      self.productItem.isTimeout = !self.productItem.isTimeout
      self.savePorductItem()
    },
    expediteOrderItem() {
      let self = this
      self.productItem.isTimeout = false
      self.productItem.isExpedited = !self.productItem.isExpedited
      self.savePorductItem()
    },
    baleOrderItem() {
      let self = this
      self.productItem.isBale = !self.productItem.isBale
      self.savePorductItem()
    },
    deleteOrderItem() {
      let self = this
      self.productItem.isDelete = true
      self.savePorductItem()
    },
    savePorductItem() {
      let self = this
      self.$emit("update-product-item", self.productItem)
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