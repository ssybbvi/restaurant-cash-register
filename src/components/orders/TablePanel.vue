<template>
  <div id="max">
    <el-header>
      <el-row class="header-row">
        <el-col :span="8">A区域 </el-col>
        <el-col :span="8">填什么呢 </el-col>
        <el-col :span="8">
          <i class="el-icon-s-fold"
             style="font-size:24px"
             @click="switchToOrderItems"></i></el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-form label-width="70px"
               @submit.native.prevent>
        <el-form-item label="订单来源">
          美团外卖
        </el-form-item>
        <el-form-item label="开桌时间">
          {{$store.state.currentOrder.createAt|dataTime}}
        </el-form-item>
        <el-form-item label="会员信息">
          罗大佑（¥1290.34）
        </el-form-item>
        <el-form-item label="换桌">
          <el-select v-model="tableId"
                     filterable
                     @change="changeTable">
            <el-option v-for="item in tableList"
                       :key="item._id"
                       :label="changeTableName(item)"
                       :value="item._id"
                       :disabled="item.status!==$Enumerate.tableStatus.available">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <RemarkTextbox></RemarkTextbox>
        </el-form-item>

      </el-form>
    </el-main>
    <el-footer>
    </el-footer>
  </div>
</template>
<script>
import * as types from "@/store/mutation-types"
import RemarkTextbox from '@/components/comm/RemarkTextbox'
export default {
  data() {
    return {
      tableId: this.$store.state.currentOrder.tableId,
      tableList: [],
    }
  },
  components: {
    RemarkTextbox
  },
  methods: {
    changeTableName(item) {
      let self = this
      return item.status === self.$Enumerate.tableStatus.available ? item.name + "(可换桌)" : item.name + "(占用中)"
    },
    switchToOrderItems() {
      let self = this
      self.$store.commit(types.SET_ORDER_TABLE_MODE, self.$Enumerate.orderTableMode.orderItemList)
    },
    changeTable() {
      let self = this
      self.$http.put("/restaurant/changeTable", { orderId: self.$store.state.currentOrder._id, tableId: self.tableId }).then(() => {
        self.$notify({
          title: '成功',
          message: '换桌成功',
          type: 'success'
        });
      })
    },

    loadTableList() {
      let self = this
      self.$http.get("/table").then(resolve => {
        self.tableList = resolve.data.data
      })
    },
  },
  mounted() {
    let self = this
    self.loadTableList()
  }
}
</script>
<style scoped lang="scss">
#max {
  flex-basis: 300px;
  flex-shrink: 0;
  flex-direction: column;
  border-right: 1px solid #ccc;
  display: flex;
}

header {
  padding: 0;
}

.header-row {
  background-color: #173452;
  color: white;
  font-size: 16px;
  font-weight: 500;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    height: 55px;
  }
}

footer {
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: 1px solid #eee;
}
</style>


