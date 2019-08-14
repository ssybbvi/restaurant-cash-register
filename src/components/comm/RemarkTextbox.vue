<template>
  <div>
    <el-input type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="inputRemark"> </el-input>
    <el-tag :key="item._id"
            v-for="item in remarkList"
            :closable="remarkEditMode"
            :disable-transitions="false"
            @close="handleCloseRemark(item)"
            @click="setRemark(item.content)"
            style="margin-right:5px">
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
  props: {
    remark: {
      type: String,
      default: ""
    },
    reamrkType: {
      type: Number//self.$Enumerate.remarkType.product
    }
  },
  data() {
    return {
      reamrkInputVisible: false,
      remakContent: "",
      remarkEditMode: false,
      inputRemark: "",
      remarkList: []
    }
  },
  watch: {
    inputRemark(val) {
      let self = this
      self.$emit("remarkchange", val)
    },
    remark(val) {
      let self = this
      self.inputRemark = val
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
    loadRmark() {
      let self = this
      self.$http.get("/remark", { params: { type: self.reamrkType } }).then(resolve => {
        self.remarkList = resolve.data.data
      })
    },
    handleCloseRemark(item) {
      let self = this
      self.$http.delete("/remark", {
        params: {
          _id: item._id
        }
      }).then(() => {
        self.loadRmark()
      })
    },
    inputConfirmRemark() {
      let self = this
      let remakContent = this.remakContent;
      if (remakContent) {
        self.$http.post("/remark", { type: self.reamrkType, content: remakContent }).then(() => {
          self.loadRmark()
        })
      }
      self.reamrkInputVisible = false;
      self.remakContent = '';
      self.remarkEditMode = false
    },
    setRemark(content) {
      let self = this
      self.inputRemark = self.inputRemark + content + ' '
    }
  },
  mounted() {
    let self = this
    self.loadRmark()
    self.inputRemark = self.remark
  }
}
</script>
<style lang="scss" scoped>
</style>

