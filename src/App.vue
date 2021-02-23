<template>
  <div class="main">
    <Head />
    <div class="container">
      <router-view />
    </div>
    <Foot />
  </div>
</template>

<script>
import Head from '/@com/header/index.vue'
import Foot from '/@com/footer/index.vue'
import { useStore } from 'vuex'
export default {
  components: {
    Head,
    Foot
  },
  setup () {
    const store = useStore()
    let user = localStorage.getItem('user')
    if (user) {
      store.commit('login', JSON.parse(user))
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 50px 0;
}
</style>

