<template>
  <div class="index">
    <navbar/>
    <app-main/>
  </div>
</template>

<script>
import { navbar, appMain } from './components'

export default {
  name: 'Layout',
  components: {
    navbar,
    appMain
  },
  computed: {},
  methods: {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .index {
    width: 100%;
    height: 100%;
    min-width: 1450px;
    // display: -ms-flexbox;
    display: flex;
    // -ms-flex: 1;
    flex: 1;
    // -ms-flex-direction: column;
    flex-direction: column;
    .title {
      height: 48px;
      width: 100%
    }
    .contWrap {
      // -ms-flex: 1;
      flex: 1;
      overflow: auto
    }
  }
  .index ::-webkit-scrollbar {
    width: 8px;
    display: block;
    height: 8px
  }

  .index ::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background: RGBA(136, 136, 136, .1)
  }

  .index ::-webkit-scrollbar-thumb:hover {
    background: RGBA(136, 136, 136, .4)
  }

</style>
