<template>
  <aside>
    <nav>
      <ul>
        <router-link
          to="/tables"
          tag="li"
        >
          <i class="icon-table"></i>
          <span>桌面</span>
        </router-link>
        <router-link
          to="/products"
          tag="li"
        >
          <i class="icon-food"></i>
          <span>菜品</span>
        </router-link>
        <!-- <router-link
          to="/queues"
          tag="li"
        >
          <i class="icon-building"></i>
          <span>排队</span>
        </router-link>
        <router-link
          to="/takeaways/list"
          tag="li"
        >
          <i class="icon-tablet"></i>
          <span>外卖</span>
        </router-link>
        <li>
          <i class="icon-file-alt"></i>
          <span>订单</span>
        </li>
        <li>
          <em>5</em>
          <i class="icon-bell"></i>
          <span>消息</span>
        </li> -->
        <router-link
          to="/setting/home"
          tag="li"
        >
          <i class="icon-cog"></i>
          <span>设置</span>
        </router-link>
      </ul>
    </nav>
  </aside>
</template>

<style scoped lang="scss">
aside {
  flex-shrink: 0;
  flex-basis: 100px;
  height: 100%;
  overflow-y: auto;
  background-color: rgb(52, 152, 219);

  nav {
    height: 100%;
    ul li {
      position: relative;
      list-style-type: none;
      display: inline-block;
      width: 100%;
      text-align: center;
      padding: 15px 0;
      border-bottom: 1px solid #44aff6;
      color: white;
      &:hover {
        background-color: rgb(50, 164, 241);
      }
      .current {
        background-color: rgb(50, 164, 241);
      }
      i {
        display: block;
        font-size: 28px;
      }
      em {
        line-height: 20px;
        text-align: center;
        display: inline-block;
        position: absolute;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        color: #fff;
        top: 8px;
        right: 10px;
        font-size: 14px;
        background-color: red;
      }
    }
  }
}
</style>

<script></script>