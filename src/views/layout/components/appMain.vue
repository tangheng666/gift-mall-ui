<template>
  <div class="contWrap">
    <div class="backStage">
      <adrift-notice v-show="isShowNotice" />
      <transition name="fade-transform" mode="out-in">
        <!-- <keep-alive> -->
        <router-view :key="key" />
        <!-- </keep-alive> -->
      </transition>
    </div>
  </div>
</template>

<script>
import adriftNotice from './adriftNotice'

export default {
  name: 'AppMain',
  components: {
    adriftNotice
  },
  computed: {
    key() {
      return this.$route.fullPath
    },
    isShowNotice() {
      if (this.$route.fullPath !== '/index') {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style scoped>
</style>

