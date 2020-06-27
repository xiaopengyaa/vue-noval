<template>
  <div class="card-item">
    <van-image
      class="book-img van-hairline--surround"
      width="75"
      height="100"
      fit="cover"
      :src="src"
      :alt="title"
    />
    <div class="book-info">
      <div class="book-info__title">{{ title }}</div>
      <div class="book-info__desc van-multi-ellipsis--l2">{{ desc }}</div>
      <div class="book-info__author">
        <van-icon name="manager" size="18" />
        <span class="text">{{ name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CardItem',
    props: {
      title: {
        type: String,
        default: '仙道九绝'
      },
      desc: {
        type: String,
        default:
          '创业青年魂穿修道世界，用现代科技跟修道系统死磕，各种打脸虐渣。'
      },
      name: {
        type: String,
        default: '剑啸龙翔'
      },
      src: {
        type: String,
        default:
          'https://www.biquge.com.cn/files/article/image/32/32883/32883s.jpg'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .card-item {
    display: flex;
    align-items: center;
    background: $color-white;
    .book-img {
      padding: 1px;
      margin-right: 16px;
    }
    .book-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      font-size: 14px;
      color: $color-pl;
      line-height: 20px;
      &__title {
        font-size: 16px;
        color: $color-dark;
        margin-bottom: 8px;
      }
      &__desc {
        flex: 1;
        margin-bottom: 8px;
      }
      &__author {
        display: flex;
        align-items: center;
        .text {
          margin-left: 4px;
        }
      }
    }
  }
</style>
