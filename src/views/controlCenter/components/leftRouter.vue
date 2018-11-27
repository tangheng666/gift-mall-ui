<template>
  <ul class="left">
    <li :class="key==='/control/index'?'active':''" class="tabs" @click="pageShow('/control/index')">
      <svg-icon icon-class="zhuye" class="icon" />
      <span>个人主页</span>
      <div class="list" style="display: none;" />
    </li>
    <li :class="key==='/control/gift'?'active':''" class="tabs" @click="pageShow('/control/gift')">
      <svg-icon icon-class="lipin" class="icon" /> <span>礼品商城</span>
      <div class="list" style="display: none;" />
    </li>
    <li :class="key==='/control/buy'?'active':''" class="tabs" @click="pageShow('/control/buy')">

      <svg-icon icon-class="goumai" class="icon" />
      <span>立即采购</span>
      <div class="list" style="display: none;" />
    </li>
    <li :class="key==='/control/order'?'active':''" class="tabs" @click="pageShow('/control/order')">
      <svg-icon icon-class="dingdan" class="icon" />
      <span>订单管理</span>
      <div class="list" style="display: none;" />
    </li>
    <li :class="key==='/control/check'?'active':''" class="tabs" @click="pageShow('/control/check')">
      <svg-icon icon-class="chaxun1" class="icon" />
      <span>补发情况</span>
      <div class="list" style="display: none;" />
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
.backStage .showContent .left {
  width: 162px;
  min-width: 162px;
  box-sizing: border-box;
  position: relative;
  border-right: 1px solid #ddd;
}

.backStage .showContent .left .tabs {
  font-size: 16px;
  line-height: 40px;
  color: #444;
  cursor: pointer;
  margin-bottom: 15px;
  transition: all 0.2s;
}

.backStage .showContent .left .tabs:hover {
  color: #d01126;
}

.backStage .showContent .left .tabs svg {
  margin-right: 10px;
}

.backStage .showContent .left .tabs span {
  font-weight: 500;
}

.backStage .showContent .left .tabs .downIcon {
  margin-left: 20px;
  transition: all 0.2s;
}

.backStage .showContent .left .tabs .rote {
  transform: rotate(180deg);
}

.backStage .showContent .left .tabs .list {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
}

.backStage .showContent .left .tabs .list strong {
  margin-left: 26px;
  font-size: 16px;
  line-height: 1;
  color: #999;
  margin-top: 15px;
  transition: all 0.2s;
}

.backStage .showContent .left .tabs .list .activeChild,
.backStage .showContent .left .tabs .list strong:hover {
  color: #d01126;
}

.backStage .showContent .left .help {
  width: 90px;
  margin: 0 auto;
  text-align: center;
  cursor: pointer;
  margin-top: 100px;
}

.backStage .showContent .left .help i {
  font-size: 30px;
}

.backStage .showContent .left .help p {
  font-size: 14px;
}

.backStage .showContent .left .help a {
  text-decoration: none;
  color: #ff3341;
  transition: all 0.2s;
}

.backStage .showContent .left .help a:hover {
  color: #ff3341;
}

.backStage .showContent .left .server {
  position: relative;
  width: 90px;
  margin: 0 auto;
  margin-top: 20px;
  text-align: center;
  padding: 8px 10px;
  background: rgba(32, 32, 32, 0.05);
}

.backStage .showContent .left .server h6 {
  font-size: 14px;
  line-height: 20px;
  color: #444;
}

.backStage .showContent .left .server p {
  font-size: 10px;
  line-height: 18px;
  color: #888;
  letter-spacing: 1px;
}

.backStage .showContent .left .server .img-s {
  width: 70px;
}

.backStage .showContent .left .server .img-l {
  position: absolute;
  background: #fff;
  z-index: 999;
  bottom: 0;
  left: 110px;
  width: 200px;
}
.backStage .showContent .left .active {
  color: #d01126;
  border-right: 2px solid #d01126;
}
</style>
