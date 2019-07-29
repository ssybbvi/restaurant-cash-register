<template>
  <div>
    <el-input type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="remark"> </el-input>
    <el-tag :key="item._id"
            v-for="item in remarkList"
            :closable="remarkEditMode"
            :disable-transitions="false"
            @close="handleCloseRemark(item)"
            @click="setRemark(item.content)">
      {{item.content}}
    </el-tag>
    <el-input v-if="remarkEditMode"
              class="input-new-tag"
              v-model="remakContent"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="inputConfirmRemark"
              @blur="inputConfirmRemark">
    </el-input>
    <i v-if="remarkEditMode"
       @click="colseEditMode"
       class="el-icon-s-tools"
       style="font-size:24px;margin-left:10px;position: relative;top: 4px;"></i>
    <i v-if="!remarkEditMode"
       @click="openEditMode"
       class="el-icon-setting"
       style="font-size:24px;margin-left:10px;position: relative;top: 4px;"></i>
  </div>

</template>
<script>
export default {
  data() {
    return {
      reamrkInputVisible: false,
      remakContent: "",
      remarkEditMode: false,
      remark: "",
      remarkList: []
    }
  },
  methods: {
    openEditMode() {
      let self = this
      self.remarkEditMode = true
      self.$nextTick(() => {
        self.$refs.saveTagInput.$refs.input.focus();
      });
    },
    colseEditMode() {
      let self = this
      self.remarkEditMode = false
    },
    loadRmark() {
      let self = this
      self.$http.get("/remark", { params: { type: self.$Enumerate.remarkType.product } }).then(resolve => {
        self.remarkList = resolve.data.data
      })
    },
    handleCloseRemark(remark) {
      let self = this
      self.$http.delete("/remark", {
        params: {
          _id: remark._id
        }
      }).then(() => {
        self.loadRmark()
      })
    },
    inputConfirmRemark() {
      let self = this
      let remakContent = this.remakContent;
      if (remakContent) {
        self.$http.post("/remark", { type: self.$Enumerate.remarkType.product, content: remakContent }).then(() => {
          self.loadRmark()
        })
      }
      this.reamrkInputVisible = false;
      this.remakContent = '';

    },
    setRemark(content) {
      let self = this
      self.remark = self.remark + content + ' '
    },
  },
  mounted() {
    let self = this
    self.loadRmark()
  }
}
</script>
<style lang="scss" scoped>
</style>

