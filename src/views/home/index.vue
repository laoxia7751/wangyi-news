<template>
  <div class="homePage" ref="wrapper">
    <div class="newItem" v-for="item in newList" :key="item.docid" @click="$router.push(`/article?id=${item.docid}`)">
      <div class="words">
        <h2 class="title">{{item.title}}</h2>
        <p class="attrs">
          <span class="scouce">{{item.source}}</span>
          <span class="time">{{item.time}}</span>
        </p>
      </div>
      <div class="img">
        <img :src="item.imgsrc" :alt="item.title" />
      </div>
    </div>
  </div>
</template>

<script>
import { getNewList } from '/@api'
import { reactive, onBeforeMount } from 'vue'
export default {
  setup () {
    const state = reactive({
      // 接口参数
      params: {
        start: 1,
        num: 10
      },
      // 新闻列表
      newList: []
    })
    // 获取新闻列表
    const getList = async (params = state.params) => {
      const data = await getNewList(params)
      const list = data.data.map(item => {
        item.time = item.time.split(' ').shift()
        return item
      })
      state.newList = params.start === 1 ? list : state.newList.concat(list)
    }

    onBeforeMount(() => {
      // 初始请求数据
      getList()
    })
    return state
  }
}
</script>

<style lang="scss" scoped>
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.homePage {
  padding: 3vw 3% 0;
  .newItem {
    border-radius: 4px;
    margin-bottom: 3vw;
    display: grid;
    grid-template-columns: 60% 36%;
    grid-column-gap: 4%;
    .words {
      display: grid;
      grid-template-rows: minmax(1.5em, 3em) 12px;
      align-content: space-between;
      .title {
        font-size: 15px;
        line-height: 1.5;
      }
      .attrs {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 4%;
        font-size: 12px;
        color: #999;
        justify-content: space-between;
        span {
          @extend .truncate;
        }
        .time {
          text-align: right;
        }
      }
    }
    .img {
      justify-items: end;
      img {
        width: 100%;
        height: 20vw;
        object-fit: cover;
      }
    }
  }
}
</style>
