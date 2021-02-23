<template>
  <div class="c_item">
    <span class="title">{{label}}</span>
    <slot>
      <i class="el-icon-arrow-right"></i>
    </slot>
  </div>
</template>

<script>
export default {
  props: ['label'],
  setup (props) {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.c_item {
  border-bottom: 1px solid #f1f1f1;
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 3%;
  font-size: 14px;
  color: #404040;
}
</style>