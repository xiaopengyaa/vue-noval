<template>
  <div ref="reader" class="reader" @click="showTools">
    <div class="reader__top">{{ chapterInfo.title }}</div>
    <div class="reader__content">
      <article class="reader__article">
        <div class="title">{{ chapterInfo.title }}</div>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <section class="content" v-html="chapterInfo.content" />
      </article>
    </div>
    <read-tools
      :visible.sync="toolVisible"
      @back="back"
      @menu="handleMenu"
      @set="handleSet"
      @prev="change(chapterInfo.prevChapterId)"
      @next="change(chapterInfo.nextChapterId)"
    />
    <chapter-catalogue
      v-model="chapterId"
      :list="chapterList"
      :visible.sync="chapterVisible"
      @click="change"
    />
  </div>
</template>

<script>
  import ChapterCatalogue from '@components/menu/ChapterCatalogue'
  import ReadTools from '@components/menu/ReadTools'
  export default {
    name: 'DetailReaders',
    components: {
      ReadTools,
      ChapterCatalogue
    },
    data() {
      return {
        toolVisible: false,
        chapterVisible: false,
        bookId: '',
        chapterId: '',
        chapterList: [],
        bookInfo: {},
        chapterInfo: {}
      }
    },
    watch: {
      $route(to, from) {
        if (to.query.chapterId != from.query.chapterId) {
          this.init()
        }
      }
    },
    created() {
      this.init()
    },
    beforeDestroy() {
      // 记录最近阅读信息
      this.saveRecent()
    },
    methods: {
      async init() {
        this.bookId = this.$route.query.bookId
        this.chapterId = this.$route.query.chapterId
        if (this.bookId && this.chapterId) {
          const {
            bookInfo,
            chapterInfo
          } = await this.$api.detail.getChapterInfo(this.bookId, this.chapterId)
          this.bookInfo = bookInfo
          this.chapterInfo = chapterInfo
          // 记录最近阅读信息
          this.saveRecent()
          // 回到顶部
          this.$refs.reader.scrollIntoView()
        } else {
          this.back()
        }
      },
      // 记录最近阅读信息（只保存最新10条）
      saveRecent() {
        const LENGTH = 10
        const oldRecentArr = this.$utils.localStorage.get('recentArr') || []
        // 过滤重复bookId的数据
        const recentArr = oldRecentArr.filter(
          item => item.bookId !== this.bookId
        )
        // 开头插入最新的数据
        recentArr.unshift({
          bookId: this.bookId,
          chapterId: this.chapterId,
          title: this.chapterInfo.title,
          name: this.bookInfo.name,
          image: this.bookInfo.image,
          author: this.bookInfo.author,
          time: +new Date()
        })
        // 去掉超出的数据
        if (recentArr.length > LENGTH) {
          recentArr.pop()
        }
        // 保存
        this.$utils.localStorage.set('recentArr', recentArr)
      },
      // 小说跳转
      change(chapterId) {
        this.toolVisible = false
        this.chapterVisible = false
        // 不存在则跳回小说简介页面
        if (!chapterId) {
          this.back()
          return
        }
        // 小说章节跳转
        if (this.$route.query.chapterId !== chapterId) {
          this.$router.replace({
            path: '/detail/reader',
            query: {
              bookId: this.bookId,
              chapterId
            }
          })
          return
        }
      },
      back() {
        history.length > 0
          ? this.$router.go(-1)
          : this.$router.push({
              path: '/detail',
              query: {
                bookId: this.bookId
              }
            })
      },
      showTools() {
        this.toolVisible = true
      },
      // 获取目录
      async handleMenu() {
        this.chapterVisible = true
        if (this.chapterList.length === 0) {
          this.chapterList = await this.$api.detail.getChapterList(this.bookId)
        }
      },
      handleSet() {
        this.$toast({
          message: '功能开发中...',
          icon: 'fire'
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .reader {
    min-height: 100%;
    background: #c8e8c8;
    &__top {
      position: fixed;
      top: 0;
      right: 0;
      left: 0;
      height: 44px;
      line-height: 44px;
      color: rgba($color: $color-black, $alpha: 0.4);
      padding: 0 16px;
      background: #c8e8c8;
    }
    &__content {
      padding-top: 44px;
    }
    &__article {
      color: rgba($color: $color-black, $alpha: 0.85);
      padding: 0 16px;
      .title {
        font-size: 26px;
        padding: 30px 0;
        text-align: center;
      }
      .content {
        font-size: 18px;
        line-height: 22px;
        padding-bottom: 16px;
        text-align: justify;
      }
    }
  }
</style>
