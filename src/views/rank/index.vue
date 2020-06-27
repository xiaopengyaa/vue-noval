<template>
  <div>
    <van-empty description="功能开发中..." />
  </div>
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
