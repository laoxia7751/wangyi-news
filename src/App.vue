<template>
  <div class="main">
    <Head />
    <div class="container">
      <router-view class="router-view" v-slot="{ Component }">
        <transition :name="transitionName">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
    <Foot />
  </div>
</template>

<script>
import Head from '/@com/Header.vue'
import Foot from '/@com/Footer.vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { toRefs, reactive } from 'vue'
export default {
  components: {
    Head,
    Foot
  },
  setup () {
    // 登录状态判断
    const store = useStore()
    let user = localStorage.getItem('user')
    if (user) {
      store.commit('login', JSON.parse(user))
    }
    const router = useRouter()
    const state = reactive({
      transitionName: 'slide-left'
    })
    router.beforeEach((to, from) => {
      if (to.meta.index > from.meta.index) {
        state.transitionName = 'slide-left'
      } else if (to.meta.index < from.meta.index) {
        // 由次级到主级
        state.transitionName = 'slide-right'
      } else {
        state.transitionName = ''
      }
    })
    return {
      ...toRefs(state)
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  min-height: 100vh;
}
.container {
  padding: 50px 0;
}
</style>

