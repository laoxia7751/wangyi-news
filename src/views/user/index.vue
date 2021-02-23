<template>
  <div class="userPage">
    <div class="top" :style="`background-image: url(${bgImg})`">
      <div class="avatar">
        <img src="https://tva4.sinaimg.cn/large/005ucgoIly1g3iihv8xsmj30b40b4acn.jpg" alt />
      </div>
      <p>管理员</p>
    </div>
    <div class="panelList">
      <listItem label="夜览模式">
        <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      </listItem>
      <listItem label="我的收藏" />
      <listItem label="我赞过的" />
      <listItem label="清除缓存" />
    </div>
  </div>
</template>

<script>
import listItem from './listItem.vue'
import { getBackgroundImg } from '/@api'
import { onBeforeMount, reactive } from 'vue'
export default {
  components: {
    listItem
  },
  data () {
    return {
      value: true
    }
  },
  setup () {
    const state = reactive({
      bgImg: '',
      user: {}
    })
    // 获取背景图
    const getBg = async () => {
      const data = await getBackgroundImg()
      state.bgImg = data.pic_url
    }
    !state.bgImg && onBeforeMount(() => {
      getBg()
    })
    return state
  }
}
</script>

<style lang="scss" scoped>
.top {
  padding: 15vw 0 10vw;
  background-color: #f1f1f1;
  .avatar {
    width: 20vw;
    height: 20vw;
    border-radius: 50%;
    overflow: hidden;
    margin: auto;
    border: 1px solid rgba(194, 115, 115, 0.1);
    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  p {
    text-align: center;
    margin-top: 1em;
    font-size: 14px;
  }
}
.panelList {
  border-top: 1px solid #f1f1f1;
}
</style>
