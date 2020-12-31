<template>
  <scroll ref="scroll" class="recommend" :data="recommendList">
    <div
      ref="content"
      class="scroll-content"
      @touchstart.prevent="touchStart"
      @touchmove.prevent="touchMove"
      @touchend="touchEnd('recommend')"
    >
      <div v-show="recommendList.length > 0" class="card-list">
        <div class="card-list__title">
          <i class="card-list__icon" />
          热门小说
        </div>
        <div class="card-list__content">
          <card-item
            v-for="(item, index) in recommendList"
            :key="item.bookId"
            :class="{
              item: true,
              'van-hairline--top': index > 0
            }"
            :title="item.name"
            :desc="item.desc"
            :name="item.author"
            :src="item.image"
            @click="toDetail(item)"
          />
        </div>
      </div>
      <div v-for="item in sortList" :key="item.bookId" class="card-list">
        <div class="card-list__title">
          <i class="card-list__icon" />
          {{ item.type }}
        </div>
        <div class="card-list__content">
          <card-item
            :title="item.name"
            :desc="item.desc"
            :name="item.author"
            :src="item.image"
            class="item van-hairline--bottom"
            @click="toDetail(item)"
          />
          <van-cell
            v-for="cItem in item.list.slice(0, 5)"
            :key="cItem.bookId"
            is-link
            @click="toDetail(cItem)"
          >
            <template #title>
              <span class="item-title">{{ cItem.name }}</span>
              <span class="item-line">-</span>
              <span class="item-author">{{ cItem.author }}</span>
            </template>
          </van-cell>
        </div>
      </div>
    </div>
    <van-empty v-show="showNoContent" class="empty" description="暂无内容" />
  </scroll>
</template>

<script>
  import homeMixins from '@/mixins/homeMixins'
  import Scroll from '@components/scroll'
  import CardItem from '@components/card/CardItem'
  import touchMoveMixin from '@/mixins/touchMoveMixin'

  export default {
    name: 'Recommend',
    components: {
      Scroll,
      CardItem
    },
    mixins: [homeMixins, touchMoveMixin],
    data() {
      return {
        recommendList: [],
        sortList: []
      }
    },
    computed: {
      showNoContent() {
        return this.recommendList.length === 0 && this.sortList.length === 0
      }
    },
    async created() {
      const data = await this.$api.home.getRecommend()
      this.recommendList = data.recommendList
      this.sortList = data.sortList
    },
    methods: {
      toDetail(item) {
        this.$router.push({
          path: '/detail',
          query: {
            bookId: item.bookId
          }
        })
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
    margin-bottom: 20px;
    background: $color-white;
    &:last-child {
      margin-bottom: 0;
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
  .empty {
    height: 100%;
    margin-top: -50px;
  }
</style>
