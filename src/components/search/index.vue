<template>
  <transition name="van-slide-right">
    <div v-show="visible" class="search">
      <form action="/">
        <van-search
          v-model="keyword"
          class="van-hairline--bottom"
          show-action
          placeholder="请输入搜索关键词"
          @search="search"
        >
          <template #action>
            <div @click="cancel">取消</div>
          </template>
        </van-search>
      </form>
      <scroll
        v-show="list.length > 0"
        ref="scroll"
        class="search__scroll"
        :pullup="true"
        :data="list"
        @scrollToEnd="more"
      >
        <div class="search__list">
          <card-item
            v-for="(item, index) in list"
            :key="index"
            :title="item.name"
            :name="item.author"
            :src="item.image"
            :desc="item.desc"
            class="search__item van-hairline--bottom"
            @click="toDetail(item)"
          />
          <p v-show="showText" class="is-bottom">我已经到底啦</p>
        </div>
      </scroll>
      <van-empty
        v-show="list.length === 0"
        class="empty"
        description="暂无搜索结果"
      />
    </div>
  </transition>
</template>

<script>
  import CardItem from '@components/card/CardItem'
  import Scroll from '@components/scroll'
  export default {
    name: 'Search',
    components: {
      CardItem,
      Scroll
    },
    props: {
      visible: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        keyword: '',
        page: 1,
        totalPage: 0,
        showText: false,
        locked: false,
        list: []
      }
    },
    watch: {
      visible(flag) {
        if (flag) {
          this.updateScroll()
        }
      }
    },
    methods: {
      async getList() {
        this.locked = true
        const { list, totalPage } = await this.$api.home.search({
          keyword: this.keyword,
          page: this.page
        })
        this.locked = false
        this.list = this.list.concat(list)
        this.totalPage = totalPage
      },
      async search() {
        this.page = 1
        this.showText = false
        this.list = []
        if (this.keyword) {
          await this.getList()
          this.$refs.scroll && this.$refs.scroll.scrollTo(0, 0)
        }
      },
      // 查找更多
      more() {
        if (!this.keyword) return
        if (this.page < this.totalPage) {
          if (this.locked) return
          this.page++
          this.getList()
        } else {
          this.totalPage > 1 && (this.showText = true)
        }
      },
      toDetail(item) {
        this.$router.push({
          path: '/detail',
          query: {
            bookId: item.bookId
          }
        })
      },
      cancel() {
        this.$emit('update:visible', false)
      },
      updateScroll() {
        this.$nextTick(() => {
          this.$refs.scroll && this.$refs.scroll.refresh()
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .search {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    background: $color-white;
    z-index: 9;
    &__scroll {
      flex: 1;
      overflow: auto;
    }
    &__list {
      padding: 2px 0;
    }
    &__item {
      padding: 16px;
      margin: 16px;
      box-shadow: 0 0 10px rgba($color: $color-black, $alpha: 0.1);
    }
  }
  .empty {
    height: 100%;
    margin-top: -50px;
  }
  .is-bottom {
    color: #999;
    text-align: center;
  }
  ::v-deep {
    .van-search__action {
      padding: 0 12px;
    }
  }
</style>
