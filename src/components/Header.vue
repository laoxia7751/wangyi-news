<template>
  <div class="header">
    <div class="headerWrap">
      <span class="back" @click="$router.back()" v-if="!['home','user'].includes($route.name)">
        <i class="iconfont icon-fenzu"></i>
      </span>
      <h1>
        <span>网易</span>
        <span>新闻</span>
      </h1>
    </div>
  </div>
</template>

<script>
export default {
  setup () {
    return {}
  }
}
</script>

<style lang="scss">
.header {
  width: 100%;
  height: 50px;
  text-align: center;
  line-height: 50px;
  position: fixed;
  top: 0;
  z-index: 10;
  background-color: var(--bg);
  box-shadow: 0 1px 1px var(--shadow-color);
  .headerWrap {
    position: relative;
    .back {
      width: 50px;
      height: 50px;
      position: absolute;
      left: 0;
      top: 0;
      font-size: 20px;
      color: var(--text-color);
    }
  }
  h1 {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: normal;
    span:first-child {
      color: var(--primary-color);
    }
  }
}
</style>