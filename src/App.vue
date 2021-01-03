<template>
  <div id="app">
    <!-- 自定义keep-alive  -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'

  export default {
    name: 'App',
    created() {
      this.getUser()
    },
    methods: {
      ...mapMutations('base', ['SET_USER']),
      async getUser() {
        const { user } = await this.$api.user.getUser()
        this.SET_USER(user)
      }
    }
  }
</script>
