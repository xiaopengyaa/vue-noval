<template>
  <div id="app">
    <!-- 自定义keep-alive  -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>
