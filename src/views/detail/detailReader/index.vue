<template>
  <!-- eslint-disable vue/no-v-html -->
  <div
    ref="reader"
    :style="`background-color:${bgColor};font-family:${fontFamily}`"
    class="reader"
    @click="showTools"
  >
    <div
      :style="`background-color:${bgColor};color:${fontColor}`"
      class="reader__top"
    >
      {{ chapterInfo.title }}
    </div>
    <div class="reader__content">
      <article class="reader__article" @touchmove="scroll">
        <div
          :style="`font-size:${fontSize + 8}px;color:${fontColor}`"
          class="title"
        >
          {{ chapterInfo.title }}
        </div>
        <section
          :style="
            `font-size:${fontSize}px;line-height:${fontSize +
              4}px;color:${fontColor}`
          "
          class="content"
          v-html="chapterInfo.content"
        />
      </article>
    </div>
    <read-tools
      ref="readTool"
      :visible.sync="toolVisible"
      :in-bookshelf="inBookshelf"
      @back="back"
      @menu="handleMenu"
      @set="handleSet"
      @prev="change(chapterInfo.prevChapterId)"
      @next="change(chapterInfo.nextChapterId)"
      @changeFontSize="changeFontSize"
      @changeBgcolor="changeBgcolor"
      @changeMode="changeMode"
      @changeFontFamily="changeFontFamily"
      @toBookDetail="toBookDetail"
      @toBookshelf="toBookshelf"
      @insertBookshelf="insertBookshelf"
    />
    <chapter-catalogue
      v-model="chapterId"
      :list="chapterList"
      :visible.sync="chapterVisible"
      :page-params="pageParams"
      @pageChange="pageChange"
      @click="change"
    />
  </div>
</template>

<script>
  import ChapterCatalogue from '@components/menu/ChapterCatalogue'
  import ReadTools from '@components/menu/ReadTools'
  import { mapState, mapMutations } from 'vuex'
  import insertBookshelfMixin from '@/mixins/insertBookshelfMixin'

  export default {
    name: 'DetailReaders',
    components: {
      ReadTools,
      ChapterCatalogue
    },
    mixins: [insertBookshelfMixin],
    data() {
      return {
        toolVisible: false,
        chapterVisible: false,
        chapterId: '',
        chapterList: [],
        bookInfo: {},
        chapterInfo: {},
        pageParams: {
          page: 1,
          pageSize: 100,
          total: 0
        },
        fontSize: this.$utils.formatSize(18),
        fontFamily: 'Helvetica'
      }
    },
    computed: {
      ...mapState('base', ['viewMode', 'dayBgColor', 'user', 'bookshelfList']),
      bgColor() {
        return this.viewMode === 'day' ? this.dayBgColor : '#2b2929'
      },
      fontColor() {
        return this.viewMode === 'day' ? '#000' : 'rgba(255,255,255,.5)'
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
      ...mapMutations('base', [
        'SET_VIEW_MODE',
        'SET_DAYBGCOLOR',
        'SET_BOOKSHELFLIST'
      ]),
      scroll() {
        // console.log(e.target)
      },
      async init() {
        this.bookId = this.$route.query.bookId
        this.chapterId = this.$route.query.chapterId
        if (this.bookId && this.chapterId) {
          const {
            bookInfo,
            chapterInfo
          } = await this.$api.detail.getChapterInfo(this.bookId, this.chapterId)
          this.inBookshelf = bookInfo.collection === 1
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
      // 记录最近阅读信息（只保存最新10条）/ 保存书架最新信息
      async saveRecent() {
        const LENGTH = 10
        const oldRecentArr = this.$utils.localStorage.get('recentArr') || []
        const bookshelfArr = this.bookshelfList
        const book = bookshelfArr.find(item => {
          return item.bookId === this.bookId
        })
        if (book) {
          book.readAt = this.chapterInfo.title
          book.chapterId = this.chapterId
          book.time = +new Date()
          this.SET_BOOKSHELFLIST(bookshelfArr)
          //保存最新信息到数据库
          this.$api.user.setBookshelf({
            collection: 1,
            bookId: this.bookId,
            readAt: this.chapterInfo?.title || '',
            time: +new Date(),
            readId: this.chapterId
          })
        }

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
          this.getChapterList(this.pageParams.page)
        }
      },
      pageChange(page) {
        this.getChapterList(page)
      },
      async getChapterList(page) {
        const { list, total } = await this.$api.detail.getChapterList({
          bookId: this.bookId,
          page,
          pageSize: this.pageParams.pageSize
        })
        this.chapterList = list
        this.pageParams.total = total
      },
      handleSet() {
        this.$refs.readTool.toggleSetting()
      },
      changeFontSize(value) {
        this.fontSize = this.$utils.formatSize(value)
      },
      changeBgcolor(color) {
        this.SET_DAYBGCOLOR(color)
        this.SET_VIEW_MODE('day')
      },
      changeMode() {
        const mode = this.viewMode === 'night' ? 'day' : 'night'
        this.SET_VIEW_MODE(mode)
      },
      changeFontFamily(font) {
        this.fontFamily = font
      },
      toBookDetail() {
        this.$router.push({
          path: '/detail',
          query: { bookId: this.bookId }
        })
      },
      toBookshelf() {
        this.$router.push({
          path: '/bookshelf'
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
