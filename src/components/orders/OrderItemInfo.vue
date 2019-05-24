<template>
  <section>
    <div class="product-status">
      <el-button @click="$store.commit('SWITCH_ORDERITEMS',{})">返回</el-button>
      <el-button
        @click="giftOrderItem"
        :class="{'gift':$store.state.restaurant.currentOrderItem.isGift}"
      >{{$store.state.restaurant.currentOrderItem.isGift?"取消赠菜":"赠菜"}}</el-button>
      <el-button
        @click="timeOutOrderItem"
        :class="{'time-out':$store.state.restaurant.currentOrderItem.isTimeout}"
      >{{$store.state.restaurant.currentOrderItem.isTimeout?"取消暂停":"暂停"}}</el-button>
      <el-button
        @click="expediteOrderItem"
        :class="{'expedited':$store.state.restaurant.currentOrderItem.isExpedited}"
      >{{$store.state.restaurant.currentOrderItem.isExpedited?"取消加急":"加急"}}</el-button>
      <el-button
        @click="baleOrderItem"
        :class="{'bale':$store.state.restaurant.currentOrderItem.isBale}"
      >{{$store.state.restaurant.currentOrderItem.isBale?"取消打包":"打包"}}</el-button>
      <!-- <el-button @click="">返回菜单</el-button> -->
    </div>
    <div class="product-info">
      <el-form label-width="80px">
        <el-form-item label="菜名">
          {{$store.state.restaurant.currentOrderItem.name}}
        </el-form-item>
        <el-form-item label="数量">
          <span id="quantity">
            <el-button
              icon="edit"
              @click="quantity--"
            ></el-button>
            <el-input :value="quantity"></el-input>
            <el-button
              icon="edit"
              @click="quantity++"
            ></el-button>
          </span>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
          > </el-input>
          <el-button
            class="button-new-tag"
            size="small"
            @click="handleInputConfirmTag"
          >将备注保存为常用备注</el-button>
        </el-form-item>
        <el-form-item label="">
          <ul id="tags">
            <li
              v-for="item in dynamicTags"
              :key="item"
            >
              <div>
                <span>
                  <i></i>
                </span>
                <span @click="selectTag(item)">{{item}}</span>
              </div>
              <div>
                <i
                  class="icon-remove"
                  @click="handleCloseTag(item)"
                ></i>
              </div>
            </li>
          </ul>
        </el-form-item>
      </el-form>
    </div>
  </section>
</template>

<script>
import restaurantApi from '@/webapi/restaurant'
import * as types from '@/store/mutation-types'

export default {
  props: ['currentOrderItem'],
  data() {
    return {
      dynamicTags: ['标签一', '标签二', '标签三'],
    }
  },
  components: {
  },
  sockets: {

  },
  computed: {
    quantity: {
      get() {
        return this.$store.state.restaurant.currentOrderItem.quantity
      },
      set(value) {
        let self = this
        restaurantApi.quantityOrderItem({
          tableId: self.$route.query.tableId,
          orderItemId: self.$store.state.restaurant.currentOrderItem._id,
          quantity: value
        })
      }
    }
  },
  methods: {
    handleCloseTag(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    handleInputConfirmTag() {
      let self = this
      if (self.$store.state.restaurant.currentOrderItem.remarks) {
        self.dynamicTags.push(self.$store.state.restaurant.currentOrderItem.remarks);
      }
    },
    selectTag(tag) {
      let self = this
      self.$store.state.restaurant.currentOrderItem.remarks = self.$store.state.restaurant.currentOrderItem.remarks + tag
    },



    giftOrderItem() {
      let self = this
      restaurantApi.giftOrderItem({
        tableId: self.$route.query.tableId,
        orderItemId: self.$store.state.restaurant.currentOrderItem._id,
      })
    },
    timeOutOrderItem() {
      let self = this
      restaurantApi.timeOutOrderItem({
        tableId: self.$route.query.tableId,
        orderItemId: self.$store.state.restaurant.currentOrderItem._id,
      })
    },
    expediteOrderItem() {
      let self = this
      restaurantApi.expediteOrderItem({
        tableId: self.$route.query.tableId,
        orderItemId: self.$store.state.restaurant.currentOrderItem._id,
      })
    },
    baleOrderItem() {
      let self = this
      restaurantApi.baleOrderItem({
        tableId: self.$route.query.tableId,
        orderItemId: self.$store.state.restaurant.currentOrderItem._id,
      })
    },
  },
  mounted() {
    var self = this
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

  #tags {
    display: flex;
    flex-wrap: wrap;
    font-size: 14px;
    li {
      display: flex;
      i {
        margin-left: 10px;
        margin-right: 20px;
      }
    }
  }
}

#quantity {
  display: flex;
}
</style>