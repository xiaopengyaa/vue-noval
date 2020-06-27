<template>
  <div class="home">
    <div class="title">
      <div class="title-logo" />
    </div>
    <van-tabs v-model="activeName">
      <van-tab
        v-for="item in tabArr"
        :key="item.name"
        :title="item.title"
        :name="item.name"
        :to="item.path"
      />
    </van-tabs>
    <keep-alive>
      <router-view class="view" />
    </keep-alive>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    data() {
      return {
        title: process.env.VUE_APP_TITLE,
        activeName: 'recommend',
        tabArr: [
          {
            name: 'recommend',
            title: '推荐',
            path: '/recommend'
          },
          {
            name: 'sort',
            title: '分类',
            path: '/sort'
          },
          {
            name: 'rank',
            title: '排行',
            path: '/rank'
          },
          {
            name: 'new',
            title: '新书',
            path: '/new'
          }
        ]
      }
    },
    watch: {
      $route() {
        this.activeName = this.$route.name
      }
    }
  }
</script>

<style lang="scss" scoped>
  .home {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
  }
  .title {
    @include flex-center;
    font-size: 18px;
    color: $color-red;
    padding: 0 10px;
    height: 44px;
    line-height: 44px;
    background: $color-white;
    .title-logo {
      width: 120px;
      height: 36px;
      @include background-image('~@assets/images/base/title.png');
    }
  }
  .view {
    flex: 1;
  }
</style>
