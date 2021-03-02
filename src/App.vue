<template>
  <div class="main" :class="theme">
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
import { toRefs, reactive, computed } from 'vue'
export default {
  components: {
    Head,
    Foot
  },
  setup () {
    const store = useStore()
    const router = useRouter()
    // 登录状态判断
    let user = localStorage.getItem('user')
    user && store.commit('login', JSON.parse(user))

    const state = reactive({
      transitionName: 'slide-left'
    })

    const theme = computed(() => {
      return store.state.theme;
    });

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
      theme,
      ...toRefs(state)
    }
  }
}
</script>

<style lang="scss">
.main {
  min-height: 100vh;
}
.container {
  padding: 50px 0;
}
:root {
  --bg: white;
  --text-color: #404040;
  --primary-color: #ee1a1a;
  --shadow-color: #f5f5f5;
}
.main {
  background-color: var(--bg);
  color: var(--text-color);
  transition: all 0.3s linear;
}
.dark-theme {
  --bg: #2d2d2d;
  --text-color: #ccc;
  --primary-color: red;
  --shadow-color: #666;
}
</style>

