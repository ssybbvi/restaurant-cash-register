<template>
  <el-dialog title="管理折扣列表"
             :visible.sync="dialogFormVisible">

    <el-row :gutter="20"
            v-for="(item,index) in discountPriceList"
            :key="item._id"
            style="margin-bottom:5px">

      <el-col :span="8">
        <el-input placeholder="折扣名称"
                  v-model="item.name" />
      </el-col>
      <el-col :span="10">
        <el-input-number v-model="item.discountPrice"
                         :min="0.01"
                         :max="1"
                         :step="0.01"
                         label="描述文字"></el-input-number>
      </el-col>
      <el-col :span="6">
        <el-button @click="deleteItem(index)">删除</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
      </el-col>
      <el-col :span="12">
      </el-col>
      <el-col :span="4">
        <el-button @click="addItem">新增</el-button>
      </el-col>
    </el-row>
    <div slot="footer"
         class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary"
                 @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>
<style lang="scss" scoped>
</style>
<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      discountPriceList: []
    }
  },
  watch: {
    dialogFormVisible(val) {
      let self = this
      self.dialogFormVisible = val
    }
  },
  methods: {
    loadConfigs() {
      let self = this
      self.$http.get("/configs", { params: { key: 0 } }).then((resolve) => {
        self.discountPriceList = resolve.data.data && resolve.data.data.value
      })
    },
    addItem() {
      let self = this
      self.discountPriceList.push({
        name: "",
        discountPrice: 1,
        _id: Date.now()
      })
    },
    save() {
      let self = this

      let discountList = self.discountPriceList.map(item => {
        return item.discountPrice
      })

      if (new Set(discountList).size !== self.discountPriceList.length) {
        self.$notify({
          title: '错误',
          message: '折扣不能相同',
          type: 'error'
        });
        return
      }

      self.$http.put("/configs", { key: 0, value: self.discountPriceList }).then(() => {
        self.$emit("refresh")
        self.dialogFormVisible = false
      })
    },
    deleteItem(index) {
      let self = this
      self.discountPriceList.splice(index, 1)
    }
  },
  mounted() {
    let self = this
    self.loadConfigs()
  }
}
</script>