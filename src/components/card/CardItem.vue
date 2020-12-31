<template>
  <div class="card-item" @click="handleClick">
    <van-image
      class="book-img van-hairline--surround"
      :width="$utils.formatSize(size.width)"
      :height="$utils.formatSize(size.height)"
      fit="cover"
      :src="src"
      :alt="title"
    />
    <div class="book-info">
      <div v-if="title" class="book-info__title van-ellipsis">{{ title }}</div>
      <div
        v-if="desc"
        :class="{
          'book-info__desc': true,
          'van-ellipsis': remark,
          'van-multi-ellipsis--l2': !remark
        }"
      >
        {{ desc }}
      </div>
      <div v-if="name" class="book-info__author">
        <van-icon name="manager" :size="$utils.formatSize(18)" />
        <span class="text">{{ name }}</span>
      </div>
      <div v-if="latest" class="book-info__latest van-ellipsis">
        {{ latest }}
      </div>
      <div v-if="remark" class="book-info__remark van-ellipsis">
        {{ remark }}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CardItem',
    props: {
      size: {
        type: Object,
        default() {
          return {
            width: 75,
            height: 100
          }
        }
      },
      title: {
        type: String,
        default: ''
      },
      desc: {
        type: String,
        default: ''
      },
      name: {
        type: String,
        default: ''
      },
      src: {
        type: String,
        default: ''
      },
      latest: {
        type: String,
        default: ''
      },
      remark: {
        type: String,
        default: ''
      }
    },
    methods: {
      handleClick() {
        this.$emit('click')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .card-item {
    display: flex;
    align-items: center;
    background: $color-white;
    padding: 20px 0;
    margin: 0 16px;
    .book-img {
      padding: 1px;
      margin-right: 16px;
    }
    .book-info {
      flex: 1;
      font-size: 14px;
      color: $color-pl;
      line-height: 20px;
      overflow: hidden;
      &__title {
        font-size: 16px;
        color: $color-dark;
        margin-bottom: 8px;
      }
      &__desc {
        margin-bottom: 8px;
      }
      &__author {
        display: flex;
        align-items: center;
        .text {
          margin-left: 4px;
        }
      }
      &__latest {
        margin-top: 8px;
      }
      &__remark {
        margin-top: 8px;
      }
    }
  }
</style>
