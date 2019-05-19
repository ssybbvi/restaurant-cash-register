<template>
  <div id="container">
    <ul>
      <li
        :class="statusColor[item.status]"
        @click="$emit('selected',item)"
        v-for="item in $store.state.restaurant.tables"
        :key="item.id"
      >
        <span class="people">{{item.defaultSeat}}人</span>
        <span class="number">{{item.name}}</span>
        <span
          class="datetime"
          v-show="item.status==0"
        >点击开台</span>
        <span
          class="datetime"
          v-show="item.status>0"
        >1h23m43s</span>
        <span class="status">{{statusRemark[item.status]}}</span>
      </li>
    </ul>
    <minor-menus
      ref="minorMenus"
      :menu-list="$store.state.restaurant.tableAreas"
      @selected="switchMenu"
      @set-fn="setFn()"
    ></minor-menus>
  </div>
</template>
<script>
import MinorMenus from '@/components/comm/MinorMenus.vue'

export default {
  data() {
    return {
      statusColor: ["green", "blue", "red", "gray"],
      statusRemark: ["未开台", "点菜中", "用餐中", "待清桌"],
      tableList: []
    }
  },
  components: {
    MinorMenus
  },
  methods: {
    switchMenu(parameter) {
      var self = this
      self.tableList = self.$store.getters.tables.filter(item => {
        return item.tableAreaId == parameter
      })
    },
    setFn() {
      console.log("zxc")
      this.$router.push('/edit-tables')
    }
  },
  mounted() {
    let self = this
    self.$store.dispatch("fetchTables")
    self.$store.dispatch("fetchTableAreas")
    // self.$refs.minorMenus.menuList = self.$store.state.restaurant.tableAreas.map(item => {
    //   return { name: item.name, parameter: item._id }
    // })
  },
  destroyed() {
  }
}
</script>
<style scoped lang="scss">
#container {
  display: flex;
  flex-grow: 1;
  ul {
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    color: white;
    padding: 10px;
    li {
      width: 115px;
      height: 115px;
      border-radius: 10px;
      position: relative;
      font-size: 14px;
      margin: 20px;
      &.green {
        background-color: #3cc05b;
      }
      &.blue {
        background-color: #3498db;
      }
      &.red {
        background-color: #df3f5d;
      }
      &.gray {
        background-color: #ccc;
      }
      .people {
        position: absolute;
        top: 10px;
        left: 10px;
      }

      .number {
        position: absolute;
        top: 10px;
        left: 70px;
      }

      .datetime {
        position: absolute;
        top: 45px;
        left: 10px;
        text-align: center;
        width: 95px;
        background-color: #eee;
        display: block;
        color: #333;
        padding: 5px 0;
      }

      .status {
        position: absolute;
        top: 90px;
        left: 63px;
      }
    }
  }
}
</style>
