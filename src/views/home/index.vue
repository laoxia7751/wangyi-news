<template>
  <div class="homePage">
    <scrollList pulldown listenScroll :scrollData="newList" @scrollEnd="handleScrollEnd">
      <div class="list" v-if="newList.length">
        <newItem v-for="item in newList" :key="item.docid" v-bind="item" />
      </div>
    </scrollList>
  </div>
</template>

<script>
import { getNewList } from '/@api'
import { reactive, onBeforeMount, toRefs } from 'vue'
import scrollList from '/@com/ScrollList.vue'
import newItem from '/@com/NewItem.vue'
export default {
  components: {
    scrollList,
    newItem
  },
  setup () {
    const state = reactive({
      // 接口参数
      params: {
        start: 1,
        num: 20
      },
      // 加载loading
      loading: false,
      // 新闻列表
      newList: [],
    })
    // 获取新闻列表
    const getList = async (params = state.params) => {
      state.loading = true
      const data = await getNewList(params)
      state.params = params
      const list = data.data.map(item => ({ ...item, time: item.time.split(' ').shift() }))
      let newList = params.start === 1 ? list : state.newList.concat(list)
      localStorage.setItem('newList', JSON.stringify(newList))
      state.newList = newList
      state.loading = false
    }
    // 滚动到底部监听
    const handleScrollEnd = () => {
      if (state.loading) return;
      getList({ ...state.params, start: state.params.start + state.params.num })
    }

    onBeforeMount(() => {
      // 初始请求数据
      let newList = localStorage.getItem('newList')
      newList ? (state.newList = JSON.parse(newList)) : getList()
    })
    return {
      ...toRefs(state),
      handleScrollEnd
    }
  },
}
</script>

<style lang="scss" scoped>
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.homePage {
  height: calc(100vh - 100px);
  padding-top: 3vw;
  .scroll-wrapper {
    padding: 0 3%;
  }
}
</style>
