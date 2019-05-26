<template>
  <div id="container">
    <ul>
      <template v-for="item in tableList">
        <li
          v-if="item.status==1"
          :key="item._id"
          :class="item.status|tabelStatusColor"
        >
          <span class="people">{{item.defaultSeat}}人</span>
          <span class="number">{{item.name}}</span>
          <span
            class="datetime"
            @click="setSeat(item)"
          >点击开台</span>
          <span class="status">{{item.status|tableStatusTags}}</span>
        </li>
        <li
          v-if="item.status>1"
          :key="item._id"
          :class="item.status|tabelStatusColor"
          @click="$router.push({name:'shoppingcart',query:{orderId:item.orderId}})"
        >
          <span class="people">{{item.seat}}人</span>
          <span class="number">{{item.name}}</span>
          <span class="datetime">{{moment(item.startDateTime).toNow()}}</span>
          <span class="status">{{item.status|tableStatusTags}}</span>
        </li>
      </template>
    </ul>
    <minor-menus
      ref="minorMenus"
      :menu-list="$store.state.restaurant.tableAreas"
      @selected="switchMenu"
    ></minor-menus>

    <el-dialog
      title="开台"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="form">
        <el-form-item
          label="就餐人数"
          :label-width="formLabelWidth"
        >
          <el-input-number
            v-model="form.seat"
            :min="1"
            :max="10"
            label="描述文字"
          ></el-input-number>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="openTable()"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import MinorMenus from '@/components/comm/MinorMenus.vue'
import restaurantWebApi from '@/webapi/restaurant'

export default {
  data() {
    return {
      tableList: [],
      dialogFormVisible: false,
      form: {
        tableId: "",
        seat: 0
      },
      formLabelWidth: '120px'
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
    setSeat(item) {
      this.form = {
        tableId: item._id,
        seat: item.defaultSeat
      }
      this.dialogFormVisible = true
    },
    openTable() {
      let self = this
      self.dialogFormVisible = false
      restaurantWebApi.openTable(this.form).then(resolve => {
        self.$router.push({ name: "shoppingcart", query: { orderId: resolve.data.data._id } })
      })
    }
  },
  mounted() {
    let self = this
    restaurantWebApi.fetchTables().then(resolve => {
      self.tableList = resolve.data.data
    })
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
