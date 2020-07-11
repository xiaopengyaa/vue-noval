<template>
  <div class="finish">
    <scroll ref="scroll" class="finish__list" :data="list">
      <div class="scroll-content">
        <card-item
          v-for="(item, index) in list"
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
    </scroll>
  </div>
</template>

<script>
  import homeMixins from '@/mixins/homeMixins'
  import Scroll from '@components/scroll'
  import CardItem from '@components/card/CardItem'
  export default {
    name: 'Finish',
    components: {
      Scroll,
      CardItem
    },
    mixins: [homeMixins],
    data() {
      return {
        type: 'quanben',
        list: []
      }
    },
    created() {
      this.getTypeList()
    },
    methods: {
      toDetail(item) {
        this.$router.push({
          path: '/detail',
          query: {
            bookId: item.bookId
          }
        })
      },
      // 获取类型小说列表
      async getTypeList() {
        const { list } = await this.$api.home.getTypeList(this.type)
        this.list = list
      }
    }
  }
</script>

<style lang="scss" scoped>
  .finish {
    background: $color-white;
    overflow: hidden;
    &__list {
      height: 100%;
      overflow: auto;
    }
  }
</style>
