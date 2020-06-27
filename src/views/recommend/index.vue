<template>
  <div class="recommend">
    <div class="card-list">
      <div class="card-list__title" @click="toDetail">
        <i class="card-list__icon" />
        热门小说
      </div>
      <div class="card-list__content">
        <card-item class="item" />
        <card-item class="item van-hairline--top" />
        <card-item class="item van-hairline--top" />
        <card-item class="item van-hairline--top" />
        <card-item class="item van-hairline--top" />
      </div>
    </div>
    <div class="card-list">
      <div class="card-list__title">
        <i class="card-list__icon" />
        玄幻小说
      </div>
      <div class="card-list__content">
        <card-item class="item van-hairline--bottom" />
        <van-cell is-link class="sub-item">
          <template #title>
            <span class="item-title">万古神帝</span>
            <span class="item-line">-</span>
            <span class="item-author">飞天鱼</span>
          </template>
        </van-cell>
        <van-cell is-link class="sub-item">
          <template #title>
            <span class="item-title">万古神帝</span>
            <span class="item-line">-</span>
            <span class="item-author">飞天鱼</span>
          </template>
        </van-cell>
        <van-cell is-link class="sub-item">
          <template #title>
            <span class="item-title">万古神帝</span>
            <span class="item-line">-</span>
            <span class="item-author">飞天鱼</span>
          </template>
        </van-cell>
        <van-cell is-link class="sub-item">
          <template #title>
            <span class="item-title">万古神帝</span>
            <span class="item-line">-</span>
            <span class="item-author">飞天鱼</span>
          </template>
        </van-cell>
      </div>
    </div>
    <div class="card-list">
      <div class="card-list__title">
        <i class="card-list__icon" />
        修真小说
      </div>
      <div class="card-list__content">
        <card-item class="item van-hairline--bottom" />
        <van-cell is-link class="sub-item">
          <template #title>
            <span class="item-title">万古神帝</span>
            <span class="item-line">-</span>
            <span class="item-author">飞天鱼</span>
          </template>
        </van-cell>
        <van-cell is-link class="sub-item">
          <template #title>
            <span class="item-title">万古神帝</span>
            <span class="item-line">-</span>
            <span class="item-author">飞天鱼</span>
          </template>
        </van-cell>
        <van-cell is-link class="sub-item">
          <template #title>
            <span class="item-title">万古神帝</span>
            <span class="item-line">-</span>
            <span class="item-author">飞天鱼</span>
          </template>
        </van-cell>
        <van-cell is-link class="sub-item">
          <template #title>
            <span class="item-title">万古神帝</span>
            <span class="item-line">-</span>
            <span class="item-author">飞天鱼</span>
          </template>
        </van-cell>
      </div>
    </div>
    <div class="card-list">
      <div class="card-list__title">
        <i class="card-list__icon" />
        都市小说
      </div>
      <div class="card-list__content">
        <card-item class="item van-hairline--bottom" />
        <van-cell is-link class="sub-item" :clickable="false">
          <template #title>
            <span class="item-title">万古神帝</span>
            <span class="item-line">-</span>
            <span class="item-author">飞天鱼</span>
          </template>
        </van-cell>
        <van-cell is-link class="sub-item">
          <template #title>
            <span class="item-title">万古神帝</span>
            <span class="item-line">-</span>
            <span class="item-author">飞天鱼</span>
          </template>
        </van-cell>
        <van-cell is-link class="sub-item">
          <template #title>
            <span class="item-title">万古神帝</span>
            <span class="item-line">-</span>
            <span class="item-author">飞天鱼</span>
          </template>
        </van-cell>
        <van-cell is-link class="sub-item">
          <template #title>
            <span class="item-title">万古神帝</span>
            <span class="item-line">-</span>
            <span class="item-author">飞天鱼</span>
          </template>
        </van-cell>
      </div>
    </div>
  </div>
</template>

<script>
  import CardItem from '@components/card/CardItem'
  export default {
    name: 'Recommend',
    components: {
      CardItem
    },
    methods: {
      toDetail() {
        this.$router.push('/detail')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .recommend {
    overflow: auto;
  }
  .card-list {
    padding-top: 20px;
    margin-top: 20px;
    background: $color-white;
    &:last-child {
      margin-bottom: 20px;
    }
    &__title {
      display: flex;
      align-items: center;
      font-size: 18px;
      color: $color-dark;
      padding: 0 16px;
    }
    &__icon {
      display: inline-block;
      width: 5px;
      height: 20px;
      background: $color-red;
      border-radius: 4px;
      margin-right: 10px;
    }
    &__content {
      .item {
        padding: 20px 0;
        margin: 0 16px;
      }
      .item-title {
        font-size: 16px;
        color: $color-dark;
      }
      .item-line {
        font-size: 14px;
        color: $color-pl;
        margin: 0 8px;
      }
      .item-author {
        font-size: 14px;
        color: $color-pl;
      }
    }
  }
</style>
