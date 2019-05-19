
<template>
  <div id="max">
    <header>AAA</header>
    <main>
      <main-menus></main-menus>
      <router-view></router-view>
    </main>
    <footer></footer>
  </div>
</template>

<script>
import MainMenus from '@/components/comm/MainMenus.vue'
export default {
  components: {
    MainMenus
  }
}
</script>



<style>
html {
  height: 100%;
}

body {
  display: flex;
  flex-direction: column;
  height: 100%;
}

#max {
  display: flex;
  flex-direction: column;
  height: 100%;
}

header {
  display: none;
  flex-basis: 50px;
  background-color: black;
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
