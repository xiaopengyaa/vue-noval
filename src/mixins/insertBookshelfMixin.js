import { Toast } from 'vant'
import { mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {
      inBookshelf: false,
      bookId: ''
    }
  },
  computed: {
    ...mapState('base', ['user', 'bookshelfList'])
  },
  methods: {
    ...mapMutations('base', ['SET_BOOKSHELFLIST']),
    async insertBookshelf(inBookshelf) {
      const bookshelfArr = this.bookshelfList
      if (!inBookshelf) {
        bookshelfArr.unshift({
          bookId: this.bookId,
          chapterId: this.chapterId || this.detail.chapterId,
          title: this.chapterInfo?.title || '',
          name: this.bookInfo?.name || this.detail.name,
          image: this.bookInfo?.image || this.detail.image,
          author: this.bookInfo?.author || this.detail.author,
          newestChapterName:
            this.bookInfo?.newestChapterName || this.detail.newestChapterName,
          time: +new Date()
        })
        this.SET_BOOKSHELFLIST(bookshelfArr)
        //添加书籍
        const data = await this.$api.user.setBookshelf({
          collection: 1,
          bookId: this.bookId,
          readAt: this.chapterInfo?.title || '',
          time: +new Date(),
          readId: this.chapterId || this.detail.chapterId
        })
        if (data.code === 200) {
          this.inBookshelf = true
          Toast.success(data.message)
        }
      } else {
        const index = bookshelfArr.findIndex(item => {
          return item.bookId === this.bookId
        })
        bookshelfArr.splice(index, 1)
        this.SET_BOOKSHELFLIST(bookshelfArr)
        //删除书籍
        const data = await this.$api.user.setBookshelf({
          collection: 0,
          bookId: this.bookId
        })
        if (data.code === 200) {
          this.inBookshelf = false
          Toast.success(data.message)
        }
      }
    }
  }
}
