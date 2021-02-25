<template>
  <div class="articlePage">
    <div class="title">{{article.title}}</div>
    <div class="attrs">
      <span>{{article.ptime}}</span>
      <span>{{article.source}}</span>
    </div>
    <article class="article" v-html="article.body" />

    <div class="articleFooter">
      <div class="footItem" @click="likeTooggle">
        <i class="iconfont icon-zan3"></i>
        <span>点赞</span>
      </div>
      <div class="footItem" @click="collectTooggle">
        <i class="iconfont icon-shoucang3"></i>
        <span>收藏</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getNewDetails } from '/@api'
import { useRoute } from 'vue-router';
import { reactive, onBeforeMount } from 'vue'
export default {
  setup (props, content) {
    const route = useRoute();
    const state = reactive({
      docid: route.query.id,
      article: {},
    })
    // 请求新闻详情
    const getDetails = async (docid) => {
      const data = await getNewDetails(docid)
      let { body, img } = data.data
      // 获取新闻图片列表，插入到文章的body中
      body = body.replace(/<!--IMG#\d{1}-->/g, function (str) {
        let imgItem = img.find(i => i.ref === str)
        return `<img src='${imgItem.src}'/>`
      })
      state.article = { ...data.data, body }
    }
    onBeforeMount(() => {
      // 初始请求数据
      state.docid && getDetails(state.docid)
    })

    return state
  }
}
</script>

<style lang="scss">
.articlePage {
  padding: 3vw 3%;
  .title {
    font-size: 20px;
    line-height: 1.2;
    margin-bottom: 10px;
  }
  .attrs {
    font-size: 14px;
    color: #999;
    span {
      padding-right: 3vw;
    }
  }
  .article {
    font-size: 16px;
    word-break: break-all;
    color: #404040;
    line-height: 1.5;
    p {
      text-align: justify;
      margin: 1em 0;
    }
    img {
      display: block;
      max-width: 100%;
      margin: auto;
    }
    ul li {
      padding-left: 0.5em;
      position: relative;
      margin: 1em 0;
      p {
        margin: 0;
        text-indent: 0;
        &:empty {
          display: none;
        }
      }
      &:before {
        content: "";
        width: 6px;
        height: 6px;
        border-radius: 50%;
        position: absolute;
        left: 0;
        top: 9px;
        background: #404040;
      }
    }
  }
  .articleFooter {
    display: grid;
    grid-template-columns: 50% 50%;
    position: fixed;
    height: 50px;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
    z-index: 10;
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.1);
    .footItem {
      height: 100%;
      display: flex;
      text-align: center;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #666;
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
}
</style>
