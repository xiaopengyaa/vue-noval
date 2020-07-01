<template>
  <van-empty class="empty" description="功能开发中..." />
</template>

<script>
  import { mapMutations } from 'vuex'
  export default {
    name: 'Rank',
    activated() {
      this.SET_BASE_ROUTE_NAME(this.$route.name)
    },
    methods: {
      ...mapMutations('base', ['SET_BASE_ROUTE_NAME'])
    }
  }
</script>

<style lang="scss" scoped>
  .empty {
    height: 100%;
    margin-top: -100px;
  }
</style>
