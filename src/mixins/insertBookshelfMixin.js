import { mapState } from 'vuex'

export default {
  data() {
    return {
      inBookshelf: false,
      bookId: ''
    }
  },
  computed: {
    ...mapState('base', ['login'])
  },
  methods: {
    insertBookshelf(inBookshelf) {
      const bookshelfArr = this.$utils.localStorage.get('bookShelfArr') || []
      if (!this.login) {
        this.$router.push({
          path: '/login'
        })
      } else if (!inBookshelf) {
        bookshelfArr.unshift({
          bookId: this.bookId,
          chapterId: this.chapterId || this.detail.chapterId,
          title: this.chapterInfo?.title || '未阅读',
          name: this.bookInfo?.name || this.detail.name,
          image: this.bookInfo?.image || this.detail.image,
          author: this.bookInfo?.author || this.detail.author,
          newest:
            this.bookInfo?.newestChapterName || this.detail.newestChapterName,
          time: +new Date()
        })
        this.$utils.localStorage.set('bookShelfArr', bookshelfArr)
        this.inBookshelf = true
      } else {
        const index = bookshelfArr.findIndex(item => {
          return item.bookId === this.bookId
        })
        bookshelfArr.splice(index, 1)
        this.$utils.localStorage.set('bookShelfArr', bookshelfArr)
        this.inBookshelf = false
      }
    },
    isInBookshelf() {
      this.inBookshelf = false
      const arr = this.$utils.localStorage.get('bookShelfArr') || []
      this.inBookshelf = arr.some(item => {
        return item.bookId === this.bookId
      })
    }
  }
}
