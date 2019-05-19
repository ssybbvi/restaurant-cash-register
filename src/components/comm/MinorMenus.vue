<template>
  <aside>
    <nav>
      <ul>
        <li
          :class="{'current':current==item._id}"
          v-for="item in menuList"
          :key="item.name"
          @click="selected(item._id)"
        >{{item.name}}</li>
        <li
          v-if="!!$listeners['set-fn']"
          @click="$emit('set-fn')"
        >
          <i
            class="icon-cog"
            style="font-size: 28px;"
          />
        </li>
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
  props: ["menu-list"],
  data() {
    return {
      current: ""
    }
  },
  methods: {
    selected(_id) {
      var self = this
      self.current = _id
      self.$emit('selected', _id)
    }
  },
  mounted() {
    var self = this
    console.log("xx", self.menuList)
  }
}
</script>