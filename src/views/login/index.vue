<template>
  <transition name="slide">
    <div class="login">
      <div class="header">
        <back class="back" @back="back" />
      </div>
      <div class="login-wrapper">
        <div class="img" />
        <div class="account">
          <i class="iconfont icon-account" />
          <van-field
            v-model="account"
            class="input account-input"
            type="text"
            placeholder="请输入账号"
          />
        </div>
        <div class="password">
          <i class="iconfont icon-password" />
          <van-field
            ref="password"
            v-model="password"
            class="input password-input"
            :type="hidePassword ? 'password' : 'text'"
            placeholder="请输入密码"
          />
          <i
            :class="{
              iconfont: true,
              'icon-24gf-eyeHide': hidePassword,
              'icon-24gf-eye': !hidePassword
            }"
            @click="togglePasswordType"
          />
        </div>
        <div class="text">
          <span>忘记密码</span>
          <span>用户注册</span>
        </div>
      </div>
      <div class="login-btn">
        <van-button
          ref="loginText"
          round
          class="login-text"
          :class="{ active: canLogin }"
          @click="login"
        >
          登录
        </van-button>
      </div>
    </div>
  </transition>
</template>
<script>
  import Back from '@components/back'
  import { mapMutations } from 'vuex'

  export default {
    components: {
      Back
    },
    props: {},
    data() {
      return {
        account: '',
        password: '',
        hidePassword: true
      }
    },
    computed: {
      info() {
        return this.account + this.password
      },
      canLogin() {
        return this.account && this.password
      }
    },
    methods: {
      ...mapMutations('base', ['SET_LOGIN']),
      back() {
        this.$router.back()
      },
      login() {
        if (this.canLogin) {
          this.SET_LOGIN(true)
          this.$router.back()
        }
      },
      togglePasswordType() {
        this.hidePassword = !this.hidePassword
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
  .login {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    background: $color-white;
    .header {
      position: relative;
      @include background-image('~@assets/images/base/login-bg.png');
      width: 100%;
      height: 80px;
      .back {
        top: 18px;
      }
    }
    .login-wrapper {
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
            right: 0;
          }
        }
      }
    }
    .login-btn {
      width: 80%;
      margin: 0px auto;
      .login-text {
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
