
<template>
  <div id="max">
    <header>
      <div id="right-space">
        <div id="">{{userInfo.name}}</div>

        <div>
          <i class="el-icon-bell"></i>
        </div>
        <div @click="logOut">
          <i class="el-icon-switch-button"></i>
        </div>
      </div>
    </header>
    <main>
      <main-menus></main-menus>
      <router-view></router-view>
    </main>
    <footer></footer>
  </div>
</template>

<script>
import MainMenus from '@/components/comm/MainMenus.vue'
import { delToken, getUserInfo } from "../webapi/tool"
export default {
  data() {
    return {
      userInfo: {}
    }
  },
  components: {
    MainMenus
  },
  methods: {
    logOut() {
      let self = this
      self.$confirm('是否退出?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delToken()
        self.$router.replace("/login")
      }).catch(_ => { })
    }
  },
  mounted() {
    this.userInfo = getUserInfo() ? getUserInfo().userInfo : {};
  }
}
</script>



<style  lang="scss" scoped >
#max {
  display: flex;
  flex-direction: column;
  height: 100%;
}

header {
  flex-basis: 50px;
  background-color: #3498db;
  border-bottom: 1px solid #53a4eb;
  color: white;
  display: flex;
  justify-content: flex-end;

  #right-space {
    display: flex;
    justify-content: space-around;
    width: 200px;
    align-items: center;
    font-size: 16px;
    font-weight: 800;
  }
}

main {
  height: 100%;
  flex-grow: 1;
  display: flex;
}

footer {
  display: none;
  flex-basis: 100px;
  background-color: black;
}
</style>
