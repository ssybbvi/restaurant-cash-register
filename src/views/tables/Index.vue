<template>
  <div id="container">
    <ul>
      <template v-for="item in tableListWithAreaId">
        <li v-if="item.status==$Enumerate.tableStatus.available "
            :key="item._id"
            :class="item.status|tabelStatusColor"
            @click="setSeat(item)">
          <div class="top">
            <span class="people">{{item.defaultSeat}}人</span>
            <span class="number">{{item.name}}</span>
          </div>
          <div class="center">
            <span>点击开台</span>
          </div>
          <div class="bottom">
            {{item.status|tableStatusTags}}
          </div>
        </li>
        <li v-if="item.status!==$Enumerate.tableStatus.available"
            :key="item._id"
            :class="item.status|tabelStatusColor"
            @click="$router.push({name:'shoppingcart',query:{orderId:item.orderId}})">
          <div class="top">
            <span class="people">{{item.seat}}人</span>
            <span class="number">{{item.name}}</span>
          </div>
          <div class="center">
            <span>{{item.startDateTime|spendTime}}</span>
          </div>
          <div class="bottom">
            {{item.status|tableStatusTags}}
          </div>
        </li>
      </template>
    </ul>
    <minor-menus ref="minorMenus"
                 :menu-list="tableAreaList.map(item=>item.name)"
                 @selected="switchMenu"
                 :top_menu_name="'全部'">
      <li>
        全部
      </li>
    </minor-menus>

    <el-dialog title="开台"
               :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="就餐人数"
                      :label-width="formLabelWidth">
          <el-input-number v-model="form.seat"
                           :min="1"
                           :max="10"
                           label="描述文字"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button type="primary"
                   @click="openTable()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import MinorMenus from '@/components/comm/MinorMenus.vue'
import { subscriptionSocket } from '../../webapi/socket-client'

export default {
  data() {
    return {
      tableList: [],
      tableAreaList: [],
      currentArea: "",
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
  computed: {
    tableListWithAreaId() {
      let self = this
      if (self.currentArea) {
        return self.tableList.filter(f => f.area === self.currentArea)
      } else {
        return self.tableList
      }
    }
  },
  methods: {
    switchMenu(parameter) {
      var self = this
      self.currentArea = parameter
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
      self.$http.post("/restaurant/opentable", this.form).then(resolve => {
        self.$router.push({ name: "shoppingcart", query: { orderId: resolve.data.data._id } })
      })
    },
    loadTableList() {
      let self = this
      self.$http.get("/table").then(resolve => {
        self.tableList = resolve.data.data
      })
    },
    loadTableAreaList() {
      let self = this
      self.$http.get("/tableArea").then(resolve => {
        self.tableAreaList = resolve.data.data
      })
    },

  },
  mounted() {
    let self = this
    self.loadTableList()
    self.loadTableAreaList()

    self.destroySocketList.push(subscriptionSocket('openTable', () => {
      self.loadTableList()
    }))

    self.destroySocketList.push(subscriptionSocket('paymentOrder', () => {
      self.loadTableList()
    }))

    self.destroySocketList.push(subscriptionSocket('cancelOrder', () => {
      self.loadTableList()
    }))

    self.destroySocketList.push(subscriptionSocket('changeSet', () => {
      self.loadTableList()
    }))

    self.destroySocketList.push(subscriptionSocket('changeTable', () => {
      self.loadTableList()
    }))
  },
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
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      width: 115px;
      height: 115px;
      border-radius: 10px;
      position: relative;
      font-size: 14px;
      margin: 20px;
      font-weight: 500;
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

      .top {
        display: flex;
        justify-content: space-around;
      }

      .center {
        display: flex;
        justify-content: center;

        span {
          width: 100px;
          background-color: #eee;
          text-align: center;
          padding: 2px 0;
        }
        color: #333;
      }

      .bottom {
        display: flex;
        justify-content: flex-end;
        padding-right: 5px;
      }
    }
  }
}
</style>
