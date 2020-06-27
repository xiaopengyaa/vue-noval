<template>
  <div
    class="go-back"
    :class="{
      'go-back--light': mode === 'light',
      'go-back--dark': mode === 'dark'
    }"
    @click.stop
  >
    <van-icon
      size="18"
      class="go-back__arrow"
      name="arrow-left"
      @click="back"
    />
    <div v-if="$slots.default" class="go-back__slot">
      <slot />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Back',
    props: {
      mode: {
        type: String,
        default: ''
      },
      autoHandle: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      back() {
        this.$emit('back')
        if (this.autoHandle) {
          window.history.length > 1
            ? this.$router.go(-1)
            : this.$router.push('/')
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .go-back {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    align-items: center;
    height: 44px;
    padding: 6px;
    color: $color-white;
    transition: ease-in-out 0.2s;
    z-index: 9;
    &__arrow {
      padding: 10px;
    }
    &__slot {
      flex: 1;
      padding-right: 10px;
    }
    &--light {
      color: $color-dark;
      background: $color-white;
      box-shadow: 0 0 5px rgba($color: $color-black, $alpha: 0.2);
    }
    &--dark {
      color: $color-white;
      background-color: rgba($color: $color-black, $alpha: 0.9);
    }
  }
</style>
