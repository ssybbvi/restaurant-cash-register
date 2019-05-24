<template>
  <div id="container">
    <div id="head"></div>
    <div id="body">
      <ul id="nav">
        <router-link
          to="/setting/table-area-list"
          tag="li"
        >
          桌面区域管理
        </router-link>
        <router-link
          to="/setting/table-list"
          tag="li"
        >
          桌面管理
        </router-link>
        <router-link
          to="/setting/product-list"
          tag="li"
        >
          菜品管理
        </router-link>
      </ul>
    </div>
  </div>

</template>
<style scoped  lang="scss">
#container {
  width: 100%;
}

#nav {
  margin-top: 20px;
  width: 100%;
}

#nav li {
  padding: 10px 30px;
  font-size: 24px;
  border-bottom: 1px solid #ccc;
}
</style>
<script>
export default {
  data() {
    return {}
  },
  mounted() {
    console.log("123")
  }
}
</script>


