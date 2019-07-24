<template>
  <aside>
    <nav>
      <ul>
        <li
          :class="{'current':current==''}"
          v-if="!!top_menu_name"
          @click="selected('')"
        >
          {{top_menu_name}}
        </li>
        <li
          :class="{'current':current==item._id}"
          v-for="item in menuList"
          :key="item"
          @click="selected(item)"
        >{{item}}</li>
      </ul>
    </nav>
  </aside>
</template>
<style scoped lang="scss">
aside {
  flex-basis: 100px;
  flex-shrink: 0;
  border-left: 1px solid #ccc;
  background-color: #eee;
  overflow-y: auto;
  ul li {
    list-style-type: none;
    text-align: center;
    border-bottom: 1px solid #ccc;
    padding: 15px 0;
    box-sizing: border-box;
    height: 55px;
    &:hover {
      border-left: 4px solid red;
      color: red;
      background-color: white;
    }
    &.current {
      border-left: 4px solid red;
      color: red;
      background-color: white;
    }
  }
}
</style>

<script>
export default {
  props: ["menu-list", "top_menu_name"],
  data() {
    return {
      current: ""
    }
  },
  methods: {
    selected(item) {
      var self = this
      self.current = item
      self.$emit('selected', item)
    }
  },
  mounted() {
    //var self = this
  }
}
</script>