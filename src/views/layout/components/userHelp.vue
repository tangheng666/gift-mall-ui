<template>
  <div class="help">
    <div class="helpBase">
      <div class="helpBox" @mouseover="nextShow" @mouseout="nextHide">
        <div class="heleHead">
          <svg-icon icon-class="zhinan2" class="icon" />
          <h6> 联系客服</h6>
        </div>
        <img src="http://182.61.16.69:8080/images/7eb81c88-66d0-4f0c-a68c-bcf87436931d.png" alt="联系客服" class="img-s" @mouseover="nextShow" @mouseout="nextHide">
        <img ref="daImg" src="http://182.61.16.69:8080/images/7eb81c88-66d0-4f0c-a68c-bcf87436931d.png" alt="联系客服" class="img-l" @mouseover="nextShow" @mouseout="nextHide">

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserHelp',
  components: {},
  data() {
    return {}
  },
  created() {},
  methods: {
    nextShow() {
      this.$refs.daImg.style.display = 'block'
    },
    nextHide() {
      this.$refs.daImg.style.display = 'none'
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.helpBase {
  z-index: 10;
  bottom: 10vh;
  border: none;
  position: fixed;
  left: 10px;
  .helpBox {
    padding: 20px;
    .heleHead {
      background-color: #ffffff;

      svg {
        width: 60px;
        height: 30px;
        margin-top: 10px;
      }
      h6 {
        padding: 5px;
        margin-bottom: 15px;
        font-size: 14px;
        line-height: 20px;
        color: #444;
      }
    }

    .img-s {
      width: 68px;
      height: 62px;
      cursor: pointer;
      // padding:4px;
      // border: 2px solid #ffffff;
    }
    // display: block;

    .img-l {
      position: absolute;
      background: #fff;
      margin-left: 10px;
      z-index: 999;
      bottom: 0;
      left: 90px;
      width: 200px;
      display:none;
    }
  }
}
</style>
