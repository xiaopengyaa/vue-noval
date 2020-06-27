<template>
  <transition name="van-slide-right">
    <div v-show="visible" class="chapter-catalogue">
      <back mode="light" :auto-handle="false" @back="goBack">
        <div class="chapter-catalogue__title">
          目录（共{{ list.length }}章）
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
            v-for="(item, index) in chapterList"
            :key="index"
            class="chapter-catalogue__item"
            :class="{
              'active-item': active == index
            }"
            :value-class="{
              'van-ellipsis': true,
              'cell-active': active == index
            }"
            :value="`${item.text}-${index + 1}`"
          />
        </div>
      </scroll>
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
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      active: {
        type: String,
        default: '15'
      },
      list: {
        type: Array,
        default() {
          return [
            {
              text: '第一章 人间美味1'
            },
            {
              text: '第一章 人间美味2'
            },
            {
              text: '第一章 人间美味3'
            },
            {
              text: '第一章 人间美味4'
            },
            {
              text: '第一章 人间美味5'
            },
            {
              text: '第一章 人间美味6'
            },
            {
              text: '第一章 人间美味7'
            },
            {
              text: '第一章 人间美味8'
            },
            {
              text: '第一章 人间美味9'
            },
            {
              text: '第一章 人间美味10'
            },
            {
              text: '第一章 人间美味'
            },
            {
              text: '第一章 人间美味'
            },
            {
              text: '第一章 人间美味'
            },
            {
              text: '第一章 人间美味'
            },
            {
              text: '第一章 人间美味'
            },
            {
              text: '第一章 人间美味'
            },
            {
              text: '第一章 人间美味'
            },
            {
              text: '第一章 人间美味'
            },
            {
              text: '第一章 人间美味'
            },
            {
              text: '第一章 人间美味'
            },
            {
              text: '第一章 人间美味'
            },
            {
              text: '第一章 人间美味'
            },
            {
              text: '第一章 人间美味'
            },
            {
              text: '第一章 人间美味'
            },
            {
              text: '第一章 人间美味'
            },
            {
              text: '第一章 人间美味'
            },
            {
              text: '第一章 人间美味'
            },
            {
              text: '第一章 人间美味'
            },
            {
              text: '第一章 人间美味'
            },
            {
              text: '第一章 人间美味'
            },
            {
              text: '第一章 人间美味'
            },
            {
              text: '第一章 人间美味'
            },
            {
              text: '第一章 人间美味'
            },
            {
              text: '第一章 人间美味'
            },
            {
              text: '第一章 人间美味'
            },
            {
              text: '第一章 人间美味'
            },
            {
              text: '第一章 人间美味'
            },
            {
              text: '第一章 人间美味'
            },
            {
              text: '第一章 人间美味'
            },
            {
              text: '第一章 人间美味'
            },
            {
              text: '第一章 人间美味'
            },
            {
              text: '第一章 人间美味'
            },
            {
              text: '第一章 人间美味'
            },
            {
              text: '第一章 人间美味'
            },
            {
              text: '第一章 人间美味'
            },
            {
              text: '第一章 人间美味'
            },
            {
              text: '第一章 人间美味'
            },
            {
              text: '第一章 人间美味'
            },
            {
              text: '第一章 人间美味'
            },
            {
              text: '第一章 人间美味'
            }
          ]
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
      }
    },
    methods: {
      orderList() {
        this.order = this.order === 'descending' ? 'ascending' : 'descending'
      },
      goBack() {
        this.$emit('update:visible', false)
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
