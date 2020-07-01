<template>
  <div class="reader">
    <div class="reader__top">{{ chapterInfo.title }}</div>
    <div class="reader__content" @click="showTools">
      <article class="reader__article">
        <div class="title">{{ chapterInfo.title }}</div>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <section class="content" v-html="chapterInfo.content" />
      </article>
    </div>
    <read-tools
      :visible.sync="toolVisible"
      @menu="handleMenu"
      @set="handleSet"
    />
    <chapter-catalogue
      v-model="chapterId"
      :list="chapterList"
      :visible.sync="chapterVisible"
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
        chapterInfo: {}
      }
    },
    async created() {
      this.bookId = this.$route.query.bookId
      this.chapterId = this.$route.query.chapterId
      if (this.bookId && this.chapterId) {
        this.chapterInfo = await this.$api.detail.getChapterInfo(
          this.bookId,
          this.chapterId
        )
      } else {
        this.back()
      }
    },
    methods: {
      back() {
        window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
      },
      showTools() {
        this.toolVisible = true
      },
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
    background-color: #c4b395;
    &__top {
      position: fixed;
      top: 0;
      right: 0;
      left: 0;
      height: 44px;
      line-height: 44px;
      color: rgba($color: $color-black, $alpha: 0.4);
      padding: 0 16px;
      background: url('~@assets/images/base/skin-default-t.jpg') no-repeat
        center top;
      background-size: 100%;
    }
    &__content {
      padding-top: 44px;
      background: url('~@assets/images/base/skin-default-t.jpg') no-repeat
          center top,
        url('~@assets/images/base/skin-default-b.jpg') no-repeat center bottom,
        url('~@assets/images/base/skin-default-m.jpg') repeat-y center 119px;
      background-size: 100%;
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
        padding-bottom: 16px;
        text-align: justify;
      }
    }
  }
</style>
