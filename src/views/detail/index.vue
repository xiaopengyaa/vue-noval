<template>
  <div class="detail" @scroll="handlerScroll">
    <back :mode="showTop ? 'light' : ''" @back="back">
      <div class="avatar">
        <van-image
          v-show="showTop"
          class="avatar-img"
          width="26"
          height="36"
          fit="cover"
          :src="detail.image"
          :alt="detail.name"
        />
        <div v-show="showTop" class="avatar-info">
          <div class="avatar-info__title">{{ detail.name }}</div>
          <div class="avatar-info__desc">{{ detail.type }}</div>
        </div>
      </div>
    </back>
    <div class="detail__title">
      <van-image
        class="book-img"
        width="100"
        height="134"
        fit="cover"
        radius="4"
        :src="detail.image"
        :alt="detail.name"
      />
      <div class="book-info">
        <div class="book-info__title">{{ detail.name }}</div>
        <div class="book-info__author">{{ detail.author }}</div>
        <div class="book-info__desc">
          <span class="type">{{ detail.type }}</span>
          <!-- <span class="line">|</span>
          <span class="status">{{ detail.status }}</span> -->
        </div>
      </div>
    </div>
    <div class="detail__desc">
      <div class="intro van-hairline--bottom">{{ detail.desc }}</div>
      <van-cell
        is-link
        title-class="menu"
        value-class="time"
        :value="relativeTime"
        @click="showCatalogue"
      >
        <template #title>
          <van-icon name="bars" size="16" />
          <span class="new-chapter van-ellipsis">
            {{ detail.newestChapterName }}
          </span>
        </template>
      </van-cell>
    </div>
    <div class="detail__chapter">
      <div class="chapter-title van-hairline--bottom">最新章节预览</div>
      <van-cell
        v-for="item in detail.recentChapterList"
        :key="item.chapterId"
        value-class="van-ellipsis"
        :value="item.chapterName"
        @click="toRead(bookId, item.chapterId)"
      />
    </div>
    <div class="detail__btn-group">
      <van-button
        class="read-right-now"
        type="danger"
        @click="toRead(bookId, detail.chapterId)"
      >
        立即阅读
      </van-button>
    </div>
    <chapter-catalogue
      v-model="activeId"
      :list="chapterList"
      :visible.sync="chapterVisible"
      @click="change"
    />
  </div>
</template>

<script>
  import Back from '@components/back'
  import ChapterCatalogue from '@components/menu/ChapterCatalogue'

  export default {
    name: 'Detail',
    components: {
      Back,
      ChapterCatalogue
    },
    data() {
      return {
        showTop: false,
        bookId: '',
        detail: {},
        relativeTime: '',
        activeId: '',
        chapterList: [],
        chapterVisible: false
      }
    },
    async created() {
      this.bookId = this.$route.query.bookId || ''
      if (this.bookId) {
        this.detail = await this.$api.detail.getBookInfo(this.bookId)
        this.relativeTime = this.$dayjs(this.detail.updateTime).fromNow()
      } else {
        this.back()
      }
    },
    methods: {
      back() {
        this.$router.push('/')
      },
      // 小说跳转
      change(chapterId) {
        this.chapterVisible = false
        // 不存在则跳回小说简介页面
        if (!chapterId) {
          this.back()
          return
        }
        if (this.$route.query.chapterId !== chapterId) {
          this.$router.push({
            path: '/detail/reader',
            query: {
              bookId: this.bookId,
              chapterId
            }
          })
          return
        }
      },
      toRead(bookId, chapterId) {
        this.$router.push({
          path: '/detail/reader',
          query: {
            bookId,
            chapterId
          }
        })
      },
      async showCatalogue() {
        this.chapterVisible = true
        if (this.chapterList.length === 0) {
          this.chapterList = await this.$api.detail.getChapterList(this.bookId)
        }
      },
      handlerScroll(e) {
        this.showTop = e.target.scrollTop > 60
      }
    }
  }
</script>

<style lang="scss" scoped>
  .detail {
    position: relative;
    height: 100%;
    padding-bottom: 64px;
    overflow: auto;
    .avatar {
      display: flex;
      align-items: center;
      .avatar-img {
        margin: 0 6px 0 2px;
      }
      .avatar-info {
        &__title {
          font-size: 14px;
          color: $color-black;
          margin-bottom: 3px;
        }
        &__desc {
          font-size: 12px;
          color: $color-pl;
        }
      }
    }
    &__title {
      display: flex;
      align-items: center;
      padding: 60px 20px 40px;
      background: linear-gradient(to bottom, #535351, #292929);
      .book-img {
        box-shadow: 2px 1px 8px rgba($color: $color-white, $alpha: 0.1);
        margin-right: 12px;
      }
      .book-info {
        font-size: 14px;
        color: $color-white;
        &__title {
          font-size: 18px;
          margin-bottom: 10px;
        }
        &__author {
          color: rgba($color: $color-white, $alpha: 0.9);
          margin-bottom: 10px;
        }
        &__desc {
          color: rgba($color: $color-white, $alpha: 0.7);
          .line {
            display: inline-block;
            height: 12px;
            margin: 0 8px;
            overflow: hidden;
          }
        }
      }
    }
    &__desc {
      padding-top: 20px;
      margin-top: -20px;
      border-radius: 20px;
      background: $color-white;
      .intro {
        padding-bottom: 16px;
        margin: 0 16px;
        line-height: 22px;
      }
      .menu {
        display: flex;
        align-items: center;
        overflow: hidden;
      }
      .time {
        flex: none;
        flex-shrink: 0;
        color: $color-pl;
      }
      .new-chapter {
        color: $color-pl;
        margin-left: 8px;
      }
    }
    &__chapter {
      padding-right: 16px;
      margin-top: 20px;
      background: $color-white;
      .chapter-title {
        font-size: 18px;
        padding: 16px 0;
        margin-left: 16px;
      }
    }
    &__btn-group {
      position: fixed;
      bottom: 0;
      width: 100%;
      height: 44px;
      background: $color-white;
      box-shadow: 0 0 1px rgba($color: $color-black, $alpha: 0.1);
      .read-right-now {
        float: right;
        padding: 0 40px;
      }
    }
  }
</style>
