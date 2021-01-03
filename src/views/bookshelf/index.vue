<template>
  <div class="bookshelf">
    <div v-show="!user" class="login-btn-wrapper">
      <van-button round class="login-btn" @click="showLogin">
        登录
      </van-button>
      <p>登录后同步书架</p>
    </div>
    <div v-show="user" class="bookshelf-wrapper">
      <scroll
        v-show="bookshelfList.length > 0"
        ref="scroll"
        class="bookshelf__list"
        :data="bookshelfList"
      >
        <div class="scroll-content">
          <van-swipe-cell
            v-for="(item, index) in bookshelfList"
            :key="item.bookId"
          >
            <div class="card-item-wrap" @click="toDetail(item)">
              <card-item
                class="item"
                :size="imageSize"
                :title="item.name"
                :name="item.author"
                :src="item.image"
                :latest="`最新：${item.newestChapterName}`"
                :remark="item.readAt ? `已读至：${item.readAt}` : '未阅读'"
              />
              <div v-if="item.readAt" class="extra">
                {{ $dayjs(item.time).fromNow() }}
              </div>
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
        v-show="bookshelfList.length === 0"
        class="empty"
        description="暂无书籍"
      />
    </div>
  </div>
</template>

<script>
  import homeMixins from '@/mixins/homeMixins'
  import CardItem from '@components/card/CardItem'
  import Scroll from '@components/scroll'
  import { mapState, mapMutations } from 'vuex'

  export default {
    components: {
      CardItem,
      Scroll
    },
    mixins: [homeMixins],
    data() {
      return {
        imageSize: {
          width: this.$utils.formatSize(90),
          height: this.$utils.formatSize(120)
        }
      }
    },
    computed: {
      ...mapState('base', ['user', 'bookshelfList'])
    },
    watch: {
      user: {
        async handler() {
          const list = await this.$api.user.getBookshelf()
          this.SET_BOOKSHELFLIST(list)
        },
        immediate: true
      }
    },
    methods: {
      ...mapMutations('base', ['SET_USER', 'SET_BOOKSHELFLIST']),
      showLogin() {
        this.$router.push({
          path: '/login'
        })
      },
      toDetail(item) {
        this.$router.push({
          path: '/detail/reader',
          query: { bookId: item.bookId, chapterId: item.readId }
        })
      },
      deleteItem(index) {
        const list = this.bookshelfList.slice()
        //删除书籍
        this.$api.user.setBookshelf({
          collection: 0,
          bookId: list[index].bookId
        })
        list.splice(index, 1)
        this.SET_BOOKSHELFLIST(list)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .bookshelf {
    position: relative;
    background: $color-white;
    overflow: hidden;
    .login-btn {
      position: absolute;
      left: 50%;
      top: 44%;
      transform: translate(-50%, -50%);
      width: 80%;
      color: $color-white;
      background-color: $color-red;
    }
    p {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      color: #969ba3;
    }
    .bookshelf-wrapper {
      height: 100%;
      .bookshelf__list {
        height: 100%;
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
  }
</style>
