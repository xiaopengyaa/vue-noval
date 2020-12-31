const OFFSET = 0.1

export default {
  data() {
    return {
      baseArr: ['recommend', 'sort', 'finish', 'recent', 'bookshelf'],
      touch: {}
    }
  },
  methods: {
    touchStart(e) {
      this.touch.initiated = true
      this.touch.startX = e.touches[0].pageX
      this.touch.startY = e.touches[0].pageY
    },
    touchMove(e) {
      if (!this.touch.initiated) {
        return
      }
      const touch = e.touches[0]
      const deltaX = touch.pageX - this.touch.startX
      const deltaY = touch.pageY - this.touch.startY
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        this.touch.percent = 0
        return
      }
      const offsetWidth = Math.min(
        window.innerWidth,
        Math.max(-window.innerWidth, deltaX)
      )
      this.touch.percent = offsetWidth / window.innerWidth
    },
    touchEnd(type) {
      const index = this.baseArr.findIndex(item => {
        return item === type
      })
      let next = index + 1 === 5 ? 0 : index + 1
      let prev = index - 1 === -1 ? 4 : index - 1
      if (this.touch.percent < -OFFSET) {
        this.$router.push({
          path: `/${this.baseArr[next]}`
        })
      } else if (this.touch.percent > OFFSET) {
        this.$router.push({
          path: `/${this.baseArr[prev]}`
        })
      }
      this.touch.initiated = false
      this.touch.percent = 0
    }
  }
}
