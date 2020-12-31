<template>
  <div class="home">
    <div class="title">
      <div class="title-logo" />
      <van-icon
        class="title-search"
        :size="$utils.formatSize(18)"
        name="search"
        @click="search"
      />
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
    <!-- 自定义keep-alive  -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" class="view" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" class="view" />
    <search :visible.sync="searchVisible" />
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  import Search from '@components/search'
  export default {
    name: 'Home',
    components: {
      Search
    },
    data() {
      return {
        title: process.env.VUE_APP_TITLE,
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
            name: 'finish',
            title: '完结',
            path: '/finish'
          },
          {
            name: 'recent',
            title: '最近',
            path: '/recent'
          },
          {
            name: 'bookshelf',
            title: '书架',
            path: '/bookshelf'
          }
        ],
        searchVisible: false
      }
    },
    computed: {
      ...mapState('base', ['baseRouteName']),
      activeName: {
        get() {
          return this.baseRouteName
        },
        set(val) {
          this.SET_BASE_ROUTE_NAME(val)
        }
      }
    },
    watch: {
      $route() {
        this.SET_BASE_ROUTE_NAME(this.$route.name)
      }
    },
    methods: {
      ...mapMutations('base', ['SET_BASE_ROUTE_NAME']),
      search() {
        this.searchVisible = true
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
    position: relative;
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
    .title-search {
      position: absolute;
      right: 10px;
      padding: 10px;
      color: $color-black;
    }
  }
  .view {
    flex: 1;
  }
</style>
