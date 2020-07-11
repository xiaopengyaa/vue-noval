<template>
  <div class="sort">
    <scroll class="sort__side-bar" :data="typeList">
      <van-sidebar v-model="activeIndex" @change="onChange">
        <van-sidebar-item
          v-for="item in typeList"
          :key="item.type"
          :title="item.typeName"
        />
      </van-sidebar>
    </scroll>
    <scroll class="sort__list" :data="listMap[activeIndex]">
      <div class="scroll-content">
        <card-item
          v-for="(item, index) in listMap[activeIndex]"
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
    name: 'Sort',
    components: {
      Scroll,
      CardItem
    },
    mixins: [homeMixins],
    data() {
      return {
        activeIndex: 0,
        typeList: [],
        listMap: {
          0: []
        }
      }
    },
    created() {
      this.getSortType()
    },
    methods: {
      // 获取小说类型
      async getSortType() {
        const { typeList } = await this.$api.home.getSortType()
        typeList.forEach((item, index) => {
          // 增加响应式listMap属性
          this.$set(this.listMap, index, [])
        })
        // 初始化数据
        this.getTypeList(typeList[this.activeIndex].type)
        this.typeList = typeList
      },
      // 获取类型小说列表
      async getTypeList(type) {
        const { list } = await this.$api.home.getTypeList(type)
        this.listMap[this.activeIndex] = list
      },
      onChange(index) {
        if (this.listMap[index] && this.listMap[index].length > 0) return
        this.getTypeList(this.typeList[index].type)
      },
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
  .sort {
    display: flex;
    background: $color-white;
    overflow: hidden;
    &__side-bar {
      height: 100%;
      background: #f7f8fa;
    }
    &__list {
      flex: 1;
      overflow: auto;
    }
  }
</style>
