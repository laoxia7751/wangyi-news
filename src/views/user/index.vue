<template>
  <div class="userPage">
    <div class="top" :style="`background-image: url(${bgImg})`">
      <div class="avatar">
        <img :src="user.avatar" alt />
      </div>
      <p>{{user.nickname}}</p>
    </div>
    <div class="panelList">
      <listItem label="夜览模式">
        <el-switch v-model="night" active-color="#f00" inactive-color="#ccc" @change="handleThemeChange"></el-switch>
      </listItem>
      <listItem label="我的收藏" />
      <listItem label="我赞过的" />
      <listItem label="清除缓存" @handleclick="clearStorage" />
    </div>
  </div>
</template>

<script>
import listItem from './listItem.vue'
import { getBackgroundImg } from '/@api'
import { onBeforeMount, reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
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
    const store = useStore()
    const state = reactive({
      bgImg: 'https://tva3.sinaimg.cn/large/0080xEK2ly1gb1eawg7r2j306y06ya9y.jpg',
      isLogin: store.state.isLogin,
      user: store.state.user,
      night: store.state.theme === 'dark-theme'
    })
    // 获取背景图
    const getBg = async () => {
      const data = await getBackgroundImg()
      state.bgImg = data.pic_url
    }
    !state.bgImg && onBeforeMount(() => {
      getBg()
    })
    // 夜览模式switch改变监听
    const handleThemeChange = status => {
      store.commit('toggleTheme', status ? 'dark-theme' : '')
    }
    // 清除缓存
    const clearStorage = () => {
      ElMessage.success('清除成功！');
    }
    return {
      ...toRefs(state),
      handleThemeChange,
      clearStorage
    }
  }
}
</script>

<style lang="scss" scoped>
.top {
  padding: 15vw 0 10vw;
  background-color: var(--bg);
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
  border-top: 1px solid var(--shadow-color);
}
</style>
