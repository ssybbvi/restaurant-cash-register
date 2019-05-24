<template>
  <div id="container">
    <div class="settlement-info">
      <el-form
        ref="form"
        label-width="80px"
      >
        <el-form-item label="应收">
          <!-- {{$store.state.restaurant.currentTable.orderItems.reduce((sum,item)=>{return sum+ item.price},0)}} -->
        </el-form-item>
        <el-form-item label="优惠">

        </el-form-item>
        <el-form-item label="未收">
        </el-form-item>
        <el-form-item label="现金">
        </el-form-item>
        <el-form-item label="实收">
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
          >将备注保存为常用备注</el-button>
        </el-form-item>
        <el-form-item label="">

        </el-form-item>
      </el-form>
    </div>
    <minor-menus
      ref="MinorMenus"
      @selected="menuSelect"
    ></minor-menus>
  </div>
</template>
<script>

import MinorMenus from '@/components/comm/MinorMenus.vue'

export default {
  data() {
    return {
      amount: 0
    }
  },
  components: {
    MinorMenus
  },
  methods: {
    menuSelect() {

    },
    form() { }
  },
  mounted() {
    var self = this
  }
}
</script>

<style scoped lang="scss">
</style>
