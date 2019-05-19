<template>
  <div id="container">
    <div class="product-list">
      <search></search>
      <ul>
        <li
          v-for="item in productList"
          @click="$emit('selected',item)"
          :key="item.id"
        >
          <span v-show="item.orderQuantity>0">{{item.orderQuantity}}</span>
          <span>{{item.name}}</span>
          <span :style="item.stock==0?'color:red;':''">还剩{{item.stock}}份</span>
          <span>{{item.price}}元</span>
        </li>
      </ul>
    </div>
    <minor-menus
      ref="rightMenus"
      @selected="switchMenu"
    ></minor-menus>
  </div>
</template>
<script>
import Search from '@/components/comm/Search.vue'
import MinorMenus from '@/components/comm/MinorMenus.vue'

export default {
  data: function () {
    return {
      productList: []
    }
  },
  methods: {
    switchMenu(parameter) {
      var self = this
      self.productList = self.$store.getters.products.filter(item => {
        return item.productMenuId == parameter
      })
    }
  },
  components: {
    Search,
    MinorMenus
  },
  mounted: function () {
    var self = this
    self.$store.dispatch("fetchProductAndMenu").then(() => {
      if (self.$store.getters.productMenus.length > 0) {
        self.$refs.rightMenus.menuList = self.$store.getters.productMenus.map(item => {
          return { name: item.name, parameter: item._id }
        })
        self.$refs.rightMenus.selected(self.$store.getters.productMenus[0]._id)
      }
    })
  }
}
</script>
<style scoped lang="scss">
#container {
  display: flex;
  flex-grow: 1;
  overflow-y: auto;
  .product-list {
    flex-grow: 1;
    ul {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      color: white;
      padding: 10px;
      li {
        width: 115px;
        height: 115px;
        background-color: white;
        border: 1px solid #3498db;
        border-radius: 10px;
        margin: 20px;
        position: relative;
        text-align: center;
        color: #3498db;
        display: flex;
        flex-direction: column;
        span:nth-child(1) {
          position: absolute;
          top: -10px;
          right: -10px;
          border: 1px solid rgb(52, 152, 219);
          border-radius: 50%;
          background-color: white;
          font-weight: 600;
          font-size: 16px;
          padding: 8px;
          line-height: 16px;
          width: 16px;
        }
        span:nth-child(2) {
          height: 50px;
          width: 100%;
          margin-top: 10px;
        }
        span:nth-child(3) {
          color: rgb(52, 152, 219);
        }
        span:nth-child(4) {
          background-color: rgb(52, 152, 219);
          color: white;
          width: 100%;
          padding: 5px 0 13px 0;
          border-radius: 0px 0px 10px 10px;
        }
      }
    }
  }
}
</style> 
