<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>

require('./assets/css/font-awesome.min.css')

export default {
  name: 'app',
  components: {
  }
}

</script>
<style lang="scss">
* {
  vertical-align: baseline;
  font-weight: inherit;
  font-family: inherit;
  font-style: inherit;
  font-size: 100%;
  outline: 0;
  padding: 0;
  margin: 0;
  border: 0;
}

html,
body {
  height: 100%;
}

body {
  font-size: 16px;
  color: #000;
  font-family: 微软雅黑, arial;
  background: #fff;
  margin: 0px;
  padding: 0px;
  /*background: url(assets/bg1.jpg) center !important;
		background-size: cover;*/
  // background: #1F2D3D;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, SimSun, sans-serif;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
}

ul {
  list-style: none;
}

#app {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
}
</style>
