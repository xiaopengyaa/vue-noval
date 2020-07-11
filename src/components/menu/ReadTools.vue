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
            :icon="item.icon"
            @click.stop="handleClick(item)"
          >
            {{ item.label }}
          </van-tabbar-item>
        </van-tabbar>
      </transition>
    </div>
  </transition>
</template>

<script>
  import Back from '@components/back'
  export default {
    name: 'ReadTools',
    components: {
      Back
    },
    props: {
      visible: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
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
    methods: {
      hideTools() {
        this.$emit('update:visible', false)
      },
      handleClick(item) {
        this.$emit(item.name)
      },
      touchmove() {
        this.$emit('update:visible', false)
      },
      back() {
        this.$emit('back')
      },
      more() {
        this.$toast({
          message: '功能开发中...',
          icon: 'fire'
        })
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
    }
  }
</style>
