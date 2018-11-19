<template>

  <div class="showContent">
    <left-router />
    <div class="right">
      <my />
    </div>
  </div>
</template>

<script>
import { leftRouter, my } from './components'
export default {
  name: 'Index',
  components: {
    leftRouter,
    my
  },
  data() {
    return {}
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
