<template>
  <van-empty class="empty" description="功能开发中..." />
</template>

<script>
  import homeMixins from '@/mixins/homeMixins'
  export default {
    name: 'Rank',
    mixins: [homeMixins]
  }
</script>

<style lang="scss" scoped>
  .empty {
    height: 100%;
    margin-top: -100px;
  }
</style>
