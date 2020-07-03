<template>
  <transition name="van-slide-right">
    <div v-show="visible" class="search">
      <form action="/">
        <van-search
          v-model="searchValue"
          class="van-hairline--bottom"
          show-action
          placeholder="请输入搜索关键词"
          @search="onSearch"
          @cancel="onCancel"
        />
      </form>
      <scroll ref="scroll" class="search__scroll" :data="list">
        <div class="search__list">
          <card-item
            v-for="item in list"
            :key="item.bookId"
            :title="item.name"
            :name="item.author"
            :src="item.image"
            :desc="item.desc"
            class="search__item van-hairline--bottom"
            @click="toDetail(item)"
          />
        </div>
        <van-empty
          v-show="list.length === 0"
          class="empty"
          description="暂无搜索结果"
        />
      </scroll>
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
        searchValue: '',
        list: []
      }
    },
    watch: {
      visible(flag) {
        flag &&
          this.$nextTick(() => {
            this.$refs.scroll.refresh()
          })
      }
    },
    methods: {
      async onSearch(val) {
        if (val) {
          this.list = await this.$api.home.search(val)
        } else {
          this.list = []
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
      onCancel() {
        this.$emit('update:visible', false)
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
  ::v-deep {
    .van-search__action {
      padding: 0 12px;
    }
  }
</style>
