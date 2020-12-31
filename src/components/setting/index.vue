<template>
  <transition name="fade">
    <div v-show="settingFlag" class="setting">
      <div class="setting-wrapper" @click.stop @touchmove.stop.prevent>
        <div class="font setting">
          <div class="decreaseSize" @click="value > 12 && (value -= 2)">
            <span>A-</span>
          </div>
          <van-slider
            v-model="value"
            class="slider"
            min="12"
            max="40"
            step="2"
            active-color="#ee0a24"
          >
            <div slot="button" class="custom-button">{{ value }}</div>
          </van-slider>
          <div class="addSize" @click="value < 40 && (value += 2)">
            <span>A+</span>
          </div>
        </div>
        <scroll
          ref="scroll"
          :data="color"
          class="scroll setting"
          :scroll-x="true"
        >
          <ul class="bgcolor">
            <li
              v-for="(item, index) in color"
              :key="index"
              class="bgcolor-select"
              @click="selectBgcolor(item.color)"
            >
              <div
                class="color-item"
                :style="`background-color:${item.color}`"
              />
              <van-icon
                v-show="dayBgColor === item.color"
                class="success"
                name="success"
              />
            </li>
          </ul>
        </scroll>
        <div class="eyeshield setting">
          <div class="eyeshieldBtn-wrapper">
            <div class="eyeshieldBtn" @click="changeMode">
              <i
                class="iconfont"
                :class="{
                  'icon-yejian': viewMode === 'day',
                  'icon-day': viewMode !== 'day'
                }"
              />
              <p>{{ viewMode === 'day' ? '夜间' : '日间' }}</p>
            </div>
          </div>
          <div class="font-family-wrapper">
            <van-button round class="button" @click="showFont = true">
              {{ actions[fontIndex].name }} >
            </van-button>
          </div>
          <van-action-sheet
            v-model="showFont"
            :actions="actions"
            class="actionsheet"
            title="字体"
            close-icon="arrow-down"
            :overlay="false"
            :round="false"
            @select="changeFontFamily"
          />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import Scroll from '@components/scroll'
  import { mapState } from 'vuex'

  export default {
    components: {
      Scroll
    },
    props: {
      settingFlag: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        fontIndex: 0,
        value: 18,
        color: [
          { color: '#c4b395' },
          { color: '#cad9e8' },
          { color: '#d1edd1' },
          { color: '#e6e6e6' },
          { color: '#fff' },
          { color: '#e0b6c4' }
        ],
        actions: [
          {
            name: '系统字体',
            className: 'Helvetica active',
            enName: 'Helvetica'
          },
          { name: '宋体', className: 'SimSun', enName: 'simsun' },
          { name: '黑体', className: 'SimHei', enName: 'heiti' },
          { name: '楷体', className: 'KaiTi', enName: 'KaiTi' }
        ],
        showFont: false
      }
    },
    computed: {
      ...mapState('base', ['viewMode', 'dayBgColor'])
    },
    watch: {
      value(newValue) {
        this.$emit('changeFontSize', newValue)
      },
      color() {
        this.$refs.scroll.refresh()
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.$refs.scroll.refresh()
      })
    },
    methods: {
      selectBgcolor(color) {
        this.$emit('changeBgcolor', color)
      },
      changeMode() {
        this.$emit('changeMode')
      },
      changeFontFamily(item, index) {
        if (this.fontIndex === index) return
        this.fontIndex = index
        this.actions.forEach(item => {
          item.className = item.className.replace('active', '').trim()
        })
        item.className = item.className + ' active'
        this.$emit('changeFontFamily', item.enName)
      },
      hideFontFamilySetting() {
        this.showFont = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .setting {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #000;
    font-family: 'Helvetica';
    .setting-wrapper {
      display: flex;
      flex-direction: column;
      height: 100%;
      .setting {
        width: 100%;
        height: 60px;
        &:not(:last-child) {
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }
      }
      .font {
        display: flex;
        align-items: center;
        padding: 0 10px;
        .decreaseSize,
        .addSize {
          width: 30px;
          height: 30px;
          text-align: center;
          line-height: 30px;
          span {
            font-size: 16px;
            color: #fff;
          }
        }
        .slider {
          margin: 0 20px;
          .custom-button {
            height: 26px;
            width: 26px;
            color: #fff;
            font-size: 10px;
            line-height: 26px;
            text-align: center;
            background-color: #ee0a24;
            border-radius: 100px;
          }
        }
      }
      .scroll {
        position: relative;
        overflow: hidden;
        .bgcolor {
          position: absolute;
          top: 15px;
          padding: 0 20px;
          white-space: nowrap;
          li {
            display: inline-block;
            position: relative;
            width: 90px;
            .color-item {
              width: 68px;
              height: 30px;
              border-radius: 3px;
            }
            .success {
              position: absolute;
              top: 5px;
              left: 25px;
              font-size: 20px;
              color: red;
            }
          }
        }
      }
      .eyeshield {
        display: flex;
        .eyeshieldBtn-wrapper,
        .font-family-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          flex: 1;
          .button {
            font-size: 16px;
          }
          .eyeshieldBtn {
            display: flex;
            justify-content: center;
            border: 2px solid #fff;
            border-radius: 50px;
            width: 100px;
            line-height: 36px;
            height: 36px;
            padding: 0px 10px;
            align-items: center;
            .iconfont {
              font-size: 25px;
              color: #fff;
            }
            p {
              font-size: 16px;
              color: #fff;
              margin: 0;
            }
          }
        }
        .font-family-wrapper {
          flex: 1;
          .button {
            width: 116px;
            height: 36px;
            line-height: 36px;
            color: #fff;
            background-color: #000;
            border: 2px solid #fff;
          }
        }
        .actionsheet {
          background: #ccc;
          border: 1px solid #eee;
          .van-icon {
            color: #000;
          }
          .van-action-sheet__item {
            position: relative;
            font-size: 18px;
            background: #ccc;
            border-bottom: 1px solid #eee;
            width: 300px;
            margin: 0 auto;
            &.active::after {
              content: '*';
              font-size: 40px;
              position: absolute;
              right: 10%;
              top: 45%;
              font-family: 'Helvetica';
            }
            &.Helvetica {
              font-family: 'Helvetica';
            }
            &.SimSun {
              font-family: 'SimSun';
            }
            &.SimHei {
              font-family: 'SimHei';
            }
            &.KaiTi {
              font-family: 'KaiTi';
            }
          }
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
