<template>
  <footer class="footer" v-if="['home','user'].includes($route.name)">
    <div class="footItem" :class="$route.name === item.name && 'active'" v-for="item in links" :key="item.name" @click="$router.push(item.name)">
      <i :class="`iconfont icon-${item.icon}`"></i>
      <span>{{item.title}}</span>
    </div>
  </footer>
</template>

<script>
import { reactive } from 'vue'
export default {
  setup () {
    const links = reactive([
      { name: 'home', icon: 'shiyanshifangjian', title: '首页' },
      { name: 'user', icon: 'shiyanshirenyuan', title: '我的' },
    ])
    return { links }
  },
}
</script>

<style lang="scss" scoped>
.footer {
  position: fixed;
  width: 100%;
  height: 50px;
  bottom: 0;
  background: var(--bg);
  box-shadow: 0 1px 5px var(--shadow-color);
  display: grid;
  grid-template-columns: 50% 50%;
  z-index: 100;
  .footItem {
    height: 100%;
    display: flex;
    text-align: center;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #999;
    &.active {
      color: #ee1a1a;
    }
    span {
      font-size: 12px;
      line-height: 1;
      margin-top: 2px;
    }
    i {
      font-size: 22px;
    }
  }
}
</style>