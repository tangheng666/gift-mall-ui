<template>
  <div class="contWrap">
    <div class="backStage">
      <adrift-notice />
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
    }
  }
}
</script>

<style scoped>
</style>

