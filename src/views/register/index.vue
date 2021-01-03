<template>
  <transition name="slide">
    <div class="register">
      <div class="header">
        <back class="back" @back="back" />
      </div>
      <div class="register-wrapper">
        <div class="img" />
        <div class="account">
          <i class="iconfont icon-account" />
          <van-field
            v-model="account"
            class="input account-input"
            type="text"
            placeholder="请输入账号（6-10位数字）"
          />
        </div>
        <div class="password">
          <i class="iconfont icon-password" />
          <van-field
            ref="password"
            v-model="password"
            class="input password-input"
            type="password"
            placeholder="请输入密码（6-10位数字、字母）"
          />
        </div>
        <div class="password">
          <i class="iconfont icon-password" />
          <van-field
            ref="password"
            v-model="password2"
            class="input password-input"
            type="password"
            placeholder="请再次确认密码"
          />
        </div>
        <div class="text">
          <!-- <span>忘记密码</span> -->
          <!-- <span>用户注册</span> -->
        </div>
      </div>
      <div class="register-btn">
        <van-button
          ref="registerText"
          round
          class="register-text"
          :class="{ active: canRegister }"
          @click="register"
        >
          注册
        </van-button>
      </div>
    </div>
  </transition>
</template>
<script>
  import Back from '@components/back'
  import { Toast } from 'vant'
  // import { mapMutations } from 'vuex'

  export default {
    components: {
      Back
    },
    props: {},
    data() {
      return {
        account: '',
        password: '',
        password2: ''
      }
    },
    computed: {
      canRegister() {
        return this.account && this.password && this.password2
      }
    },
    methods: {
      back() {
        this.$router.back()
      },
      async register() {
        if (
          /^\d{6,10}$/.test(this.account) &&
          /^\w{6,10}$/.test(this.password) &&
          /^\w{6,10}$/.test(this.passwor2)
        ) {
          if (this.password !== this.password2) {
            Toast.fail('密码不一致')
          } else {
            const data = await this.$api.user.register({
              username: this.account,
              password: this.password
            })
            if (data.code == 200) {
              this.$router.back()
            }
          }
        } else {
          Toast.fail('账号密码格式不正确')
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .slide-enter-active,
  .slide-leave-active {
    transition: all 0.2s;
  }
  .slide-enter,
  .slide-leave-to {
    transform: translate3d(100%, 0, 0);
  }
  .register {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    background: $color-white;
    .header {
      position: relative;
      @include background-image('~@assets/images/base/register-bg.png');
      width: 100%;
      height: 80px;
      .back {
        top: 18px;
      }
    }
    .register-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      padding: 0 10%;
      background: #fff;
      border-radius: 8px 8px 0 0;
      position: relative;
      margin: -5px auto 0;
      .img {
        width: 48px;
        height: 48px;
        margin: 24px;
        @include background-image('~@assets/images/base/logo.png');
      }
      .account,
      .password {
        display: flex;
        align-items: center;
        width: 100%;
        height: 49px;
        border-bottom: 1px solid #eee;
        margin-bottom: 16px;
        i {
          color: #999;
          font-size: 16px;
          margin: 0 16px 0 6px;
        }
        .password-input::after {
          border: none;
        }
      }
      .text {
        position: relative;
        font-size: 12px;
        width: 100%;
        line-height: 12px;
        height: 12px;
        text-align: center;
        margin-bottom: 24px;
        span {
          color: #0091de;
          position: absolute;
          &:first-child {
            left: 0;
          }
          &:last-child {
            text-align: right;
            right: 0;
          }
        }
      }
    }
    .register-btn {
      width: 80%;
      margin: 0px auto;
      .register-text {
        width: 100%;
        height: 48px;
        background: $color-red2;
        color: $color-white;
        &.active {
          background: $color-red;
        }
      }
    }
  }
</style>
