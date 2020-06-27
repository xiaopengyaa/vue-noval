<template>
  <div class="detail" @scroll="handlerScroll">
    <back :mode="showTop ? 'light' : ''">
      <div class="avatar">
        <van-image
          v-show="showTop"
          class="avatar-img"
          width="26"
          height="36"
          fit="cover"
          src="https://www.biquge.com.cn/files/article/image/32/32883/32883s.jpg"
          alt="仙道九绝"
        />
        <div v-show="showTop" class="avatar-info">
          <div class="avatar-info__title">仙道九绝</div>
          <div class="avatar-info__desc">都市</div>
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
        src="https://www.biquge.com.cn/files/article/image/32/32883/32883s.jpg"
        alt="仙道九绝"
      />
      <div class="book-info">
        <div class="book-info__title">仙道九绝</div>
        <div class="book-info__author">剑啸龙翔</div>
        <div class="book-info__desc">
          <span class="type">都市</span>
          <span class="line">|</span>
          <span class="status">连载中</span>
        </div>
      </div>
    </div>
    <div class="detail__desc">
      <div class="intro van-hairline--bottom">
        经历过末日绝望的黄明哲，重回高考那一年，继承神秘的学习系统，努力弥补曾经的遗憾，带领人类迈向未知的命运，而人类的未来将何去何从?
        …… 在这娱乐至死的时代， 或许需要一些理性； 在这星空璀璨的宇宙，
        有多少真理的信徒； 如果没有科学的光芒， 人类将万古如长夜。
      </div>
      <van-cell is-link title-class="menu" value-class="time" value="14分钟前">
        <template #title>
          <van-icon name="bars" size="16" />
          <span class="new-chapter van-ellipsis">
            第994章 联邦重整！
          </span>
        </template>
      </van-cell>
    </div>
    <div class="detail__chapter">
      <div class="chapter-title van-hairline--bottom">最新章节预览</div>
      <van-cell value="第994章 联邦重整！" />
      <van-cell value="第993章 以战求团！" />
      <van-cell value="第992章 不怂！" />
      <van-cell value="第991章 沉睡之地！" />
      <van-cell value="第990章 再临道宫！" />
    </div>
    <div class="detail__btn-group">
      <van-button class="read-right-now" type="danger" @click="toRead">
        立即阅读
      </van-button>
    </div>
  </div>
</template>

<script>
  import Back from '@components/back'
  export default {
    name: 'Detail',
    components: {
      Back
    },
    data() {
      return {
        showTop: false
      }
    },
    methods: {
      back() {
        window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
      },
      toRead() {
        this.$router.push('/detail/reader')
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
