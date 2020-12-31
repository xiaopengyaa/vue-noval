<template>
  <transition name="van-fade">
    <div
      v-show="visible"
      class="read-tools"
      @click.stop="hideTools"
      @touchmove.stop="touchmove"
    >
      <transition name="van-slide-down">
        <back v-show="visible" mode="dark" @back="back">
          <div class="tools-wrap">
            <van-icon name="ellipsis" @click="more" />
          </div>
        </back>
      </transition>
      <transition name="van-slide-up">
        <van-tabbar
          v-show="visible"
          v-model="active"
          class="read-tools__bottom"
          active-color="#fff"
          inactive-color="#fff"
          :border="false"
        >
          <van-tabbar-item
            v-for="(item, index) in tabArr"
            :key="index"
            class="item"
            :icon="item.icon"
            @click.stop="handleClick(item)"
          >
            {{ item.label }}
          </van-tabbar-item>
        </van-tabbar>
      </transition>
      <div class="setting-wrapper">
        <setting
          ref="setting"
          :setting-flag="settingFlag"
          @changeBgcolor="changeBgcolor"
          @changeFontSize="changeFontSize"
          @changeMode="changeMode"
          @changeFontFamily="changeFontFamily"
        />
      </div>
      <transition name="fade">
        <div v-show="moreFlag" class="more" @click.stop>
          <div class="insert-bookshelf" @click="insertBookshelf">
            <i
              :class="{ active: inBookshelf && login }"
              class="iconfont icon-jiarushujia"
            />
            <span :class="{ active: inBookshelf && login }">
              {{ inBookshelf && login ? '已加书架' : '加入书架' }}
            </span>
          </div>
          <div class="to-bookdetail" @click="toBookDetail">
            <i class="iconfont icon-shuji" />
            <span>书籍详情</span>
          </div>
          <div class="to-bookshelf" @click="toBookshelf">
            <i class="iconfont icon-shujia" />
            <span>返回书架</span>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
  import Back from '@components/back'
  import Setting from '@components/setting'
  import { mapState } from 'vuex'

  export default {
    name: 'ReadTools',
    components: {
      Back,
      Setting
    },
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      inBookshelf: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        moreFlag: false,
        settingFlag: false,
        active: -1,
        tabArr: [
          {
            name: 'prev',
            label: '上一章',
            icon: 'home-o'
          },
          {
            name: 'menu',
            label: '目录',
            icon: 'bars'
          },
          {
            name: 'set',
            label: '设置',
            icon: 'setting-o'
          },
          {
            name: 'next',
            label: '下一章',
            icon: 'home-o'
          }
        ]
      }
    },
    computed: {
      ...mapState('base', ['login'])
    },
    methods: {
      hideTools() {
        this.moreFlag = false
        this.settingFlag = false
        this.$refs.setting && this.$refs.setting.hideFontFamilySetting()
        this.$emit('update:visible', false)
      },
      handleClick(item) {
        this.$emit(item.name)
      },
      touchmove() {
        this.hideTools()
      },
      back() {
        this.$emit('back')
      },
      more() {
        this.moreFlag = !this.moreFlag
      },
      toggleSetting() {
        this.settingFlag = !this.settingFlag
      },
      changeFontSize(value) {
        this.$emit('changeFontSize', value)
      },
      changeBgcolor(color) {
        this.$emit('changeBgcolor', color)
      },
      changeMode() {
        this.$emit('changeMode')
      },
      changeFontFamily(font) {
        this.$emit('changeFontFamily', font)
      },
      toBookDetail() {
        this.$emit('toBookDetail')
      },
      toBookshelf() {
        this.$emit('toBookshelf')
      },
      insertBookshelf() {
        this.$emit('insertBookshelf', this.inBookshelf)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .read-tools {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 19;
    .tools-wrap {
      flex: 1;
      display: flex;
      align-items: center;
      flex-direction: row-reverse;
    }
    &__bottom {
      background-color: rgba($color: $color-black, $alpha: 0.9);
      .item {
        background-color: rgba($color: $color-black, $alpha: 0.9);
      }
    }
    .setting-wrapper {
      position: absolute;
      left: 0;
      bottom: 50px;
      width: 100%;
      height: 180px;
    }
    .more {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: absolute;
      right: 6px;
      top: 48px;
      background-color: #000;
      color: #fff;
      padding: 10px 20px;
      border-radius: 10px;
      div {
        display: flex;
        align-items: center;
        padding: 5px 10px;
        height: 40px;
        &:not(:last-child) {
          border-bottom: 1px solid #444;
        }
        .active {
          color: rgba(255, 255, 255, 0.5);
        }
        .iconfont {
          font-size: 20px;
          margin-right: 10px;
        }
        span {
          font-size: 16px;
        }
      }
    }
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.2s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
</style>
