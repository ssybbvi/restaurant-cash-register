<template>
  <div id="search">
    <i class="icon-search"></i>
    <input
      type="text"
      placeholder="搜索"
      v-model="keyword"
    />
  </div>
</template>
<style scoped>
#search {
  background-color: #ddd;
  position: relative;
}

#search i {
  position: absolute;
  left: 20px;
  top: 20px;
  font-size: 18px;
}

#search input {
  width: calc(100% - 20px);
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
  font-size: 18px;
  margin: 10px;
  text-indent: 28px;
  box-sizing: border-box;
}
</style>
<script>
export default {
  data() {
    return {
      keyword: ""
    }
  },
  watch: {
    keyword() {
      let self = this
      self.$emit("search-keyword", self.keyword)
    }
  }
}

</script>