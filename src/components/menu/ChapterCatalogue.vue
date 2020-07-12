<template>
  <transition name="van-slide-right">
    <div v-show="visible" class="chapter-catalogue">
      <back mode="light" @back="goBack">
        <div class="chapter-catalogue__title">
          目录
          <span v-show="pageParams.total > 0">
            （{{ pageParams.total }}章）
          </span>
        </div>
        <van-icon
          class="chapter-catalogue__icon"
          size="20"
          :name="order"
          @click="orderList"
        />
      </back>
      <scroll
        ref="scroll"
        :data="chapterList"
        class="chapter-catalogue__scroll"
      >
        <div class="chapter-catalogue__list">
          <van-cell
            v-for="item in chapterList"
            :key="item.chapterId"
            :class="{
              'chapter-catalogue__item': true,
              'active-item': value == item.chapterId
            }"
            :value-class="{
              'van-ellipsis': true,
              'cell-active': value == item.chapterId
            }"
            :value="item.chapterName"
            @click="handleClick(item)"
          />
        </div>
      </scroll>
      <van-pagination
        v-show="pageParams.total > pageParams.pageSize"
        v-model="pageParams.page"
        :total-items="pageParams.total"
        :items-per-page="pageParams.pageSize"
        @change="pageChange"
      />
    </div>
  </transition>
</template>

<script>
  import Scroll from '@components/scroll'
  import Back from '@components/back'
  export default {
    name: 'ChapterCatalogue',
    components: {
      Scroll,
      Back
    },
    model: {
      prop: 'value',
      event: 'click'
    },
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      value: {
        type: String,
        default: ''
      },
      list: {
        type: Array,
        default() {
          return []
        }
      },
      pageParams: {
        type: Object,
        default() {
          return {
            page: 1,
            pageSize: 20,
            total: 0
          }
        }
      }
    },
    data() {
      return {
        order: 'descending'
      }
    },
    computed: {
      chapterList() {
        let list = JSON.parse(JSON.stringify(this.list))
        return this.order === 'descending' ? list : list.reverse()
      }
    },
    watch: {
      visible(flag) {
        // 滚动到active元素
        flag && this.scrollIntoActive()
      },
      order() {
        this.scrollIntoActive()
      }
    },
    methods: {
      orderList() {
        this.order = this.order === 'descending' ? 'ascending' : 'descending'
      },
      handleClick(item) {
        this.$emit('click', item.chapterId)
      },
      goBack() {
        this.$emit('update:visible', false)
      },
      pageChange(page) {
        this.$emit('pageChange', page)
      },
      scrollIntoActive() {
        this.$nextTick(() => {
          this.$refs.scroll.refresh()
          this.$refs.scroll.scrollToElement(
            this.$el.querySelector('.active-item')
          )
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .chapter-catalogue {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    background: $color-white;
    z-index: 29;
    &__title {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 16px;
    }
    &__icon {
      vertical-align: top;
      float: right;
      padding: 10px 0 10px 10px;
    }
    &__scroll {
      flex: 1;
      margin-top: 44px;
      overflow: auto;
    }
    &__item {
      font-size: 16px;
      .cell-active {
        color: #ee0a24;
      }
    }
  }
</style>
