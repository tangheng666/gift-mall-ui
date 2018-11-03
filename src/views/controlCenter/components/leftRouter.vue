<template>
  <ul class="left">
    <li :class="key==='/control/index'?'active':''" class="tabs" @click="pageShow('/control/index')"><i class="icons homeIconA" />
      <span>个人主页</span>
      <div class="list" style="display: none;"/>
    </li>
    <li :class="key==='/control/gift'?'active':''" class="tabs" @click="pageShow('/control/gift')"><i class="icons shopsIcon"/> <span>礼品商城</span>
      <div class="list" style="display: none;"/>
    </li>
    <li :class="key==='/control/buy'?'active':''" class="tabs" @click="pageShow('/control/buy')"><i class="icons shopNowIcon"/> <span>立即采购</span>
      <div class="list" style="display: none;"/>
    </li>
    <li :class="key==='/control/order'?'active':''" class="tabs" @click="pageShow('/control/order')"><i class="icons orderMangerIcon"/>
      <span>订单管理</span>
      <div class="list" style="display: none;"/>
    </li>
    <li :class="key==='/control/check'?'active':''" class="tabs" @click="pageShow('/control/check')"><i class="icons el-icon-search"/>
      <span>查件/补发</span>
      <div class="list" style="display: none;"/>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'LeftRouter',
  components: {},
  data() {
    return {}
  },
  computed: {
    key() {
      return this.$route.path
    }
  },
  methods: {
    pageShow(target) {
      this.$router.push(target)
    }
  }
}

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.backStage .showContent .left .active {
  color: #d01126;
  border-right: 2px solid #d01126
}
</style>
