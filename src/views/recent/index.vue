<template>
  <div class="recent">
    <scroll
      v-show="recentList.length > 0"
      ref="scroll"
      class="recent__list"
      :data="recentList"
    >
      <div class="scroll-content">
        <van-swipe-cell v-for="(item, index) in recentList" :key="item.bookId">
          <div class="card-item-wrap" @click="toDetail(item)">
            <card-item
              class="item"
              :class="{ 'van-hairline--top': index > 0 }"
              :title="item.name"
              :name="item.author"
              :src="item.image"
              :remark="`已读至：${item.title}`"
            />
            <div class="extra">{{ $dayjs(item.time).fromNow() }}</div>
          </div>
          <template #right>
            <van-button
              square
              text="删除"
              type="danger"
              class="delete-button"
              @click="deleteItem(index)"
            />
          </template>
        </van-swipe-cell>
      </div>
    </scroll>
    <van-empty
      v-show="recentList.length === 0"
      class="empty"
      description="暂无阅读记录"
    />
  </div>
</template>

<script>
  import homeMixins from '@/mixins/homeMixins'
  import Scroll from '@components/scroll'
  import CardItem from '@components/card/CardItem'
  export default {
    name: 'Recent',
    components: {
      Scroll,
      CardItem
    },
    mixins: [homeMixins],
    data() {
      return {
        recentList: []
      }
    },
    activated() {
      this.getRecentList()
    },
    methods: {
      getRecentList() {
        this.recentList = this.$utils.localStorage.get('recentArr') || []
      },
      toDetail(item) {
        this.$router.push({
          path: '/detail/reader',
          query: {
            bookId: item.bookId,
            chapterId: item.chapterId
          }
        })
      },
      deleteItem(index) {
        this.recentList.splice(index, 1)
        this.$utils.localStorage.set('recentArr', this.recentList)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .recent {
    background: $color-white;
    overflow: hidden;
    &__list {
      height: 100%;
      overflow: auto;
      .card-item-wrap {
        position: relative;
        display: flex;
        align-items: center;
        .item {
          flex: 1;
          overflow: hidden;
          padding-right: 100px;
          margin-right: 0;
        }
      }
      .extra {
        position: absolute;
        right: 16px;
        bottom: 34px;
        width: 80px;
        text-align: right;
        color: #999;
      }
      .delete-button {
        font-size: 16px;
        height: 100%;
      }
    }
    .empty {
      height: 100%;
      margin-top: -50px;
    }
  }
</style>
