<template>
  <div class="userCenter">
    <div class="userBox">
      <div class="userBoxLeft">
        <div class="topRule invitorImgBox"><img src="http://106.14.154.124:8099/images/userCenter/regUser.png" alt="invitor">
          <h2 class="upLevel">邀请3人注册免费升级</h2>
          <h3 class="vip"><span>VIP</span></h3>
          <div class="regUser levelBox"><span>当前等级</span>
            <img src="http://106.14.154.124:8099/images/userCenter/银色.png" alt="" class="regImg"> <span>注册用户</span>
            <strong>
          <i>3.5</i> 元/单 </strong></div>
          <div class="vipUser levelBox"><span>升级成为</span> <img src="http://106.14.154.124:8099/images/userCenter/VIP.png" alt="" class="vipImg"> <span>VIP用户</span> <strong>
            <!----><i>3.2</i> 元/单 </strong></div>
          <b class="regLink"> 复制链接邀请注册 </b>
          <div class="regedBox"><strong><i>0</i>/3 </strong> <em><b class="b0" /></em> <span> 还差3人 </span> <b class="invitorInfo">·
          点击查看详情 ·</b>
          </div>
        </div>
        <div class="bottomImg"><img src="http://106.14.154.124:8099/images/userCenter/needBanner.png" alt="online"></div>
      </div>
      <div class="userBoxright">
        <div class="topInfo">
          <div class="title"><strong><i class="userIcon" /> {{ name }} </strong> <span>完善资料</span></div>
          <div class="money"><span>当前余额</span>
          <strong>{{ wealth }}</strong> <b class="button-n">充值</b></div>
        </div>
        <div class="bottomPrice">
          <div class="title"><strong>圆通快递</strong>
          </div>
          <ul class="priceList">
            <li><span>区域</span> <span>普通地区</span></li>
            <li><span>首重{{ express.firstWeight }}kg内</span> <span>{{ express.firstPrice }}元/单</span></li>
            <li><span>{{ express.firstWeight }}-{{ express.middleWeight }}kg</span> <span>{{ express.middlePrice }}元/单</span></li>
            <li><span>1kg续重</span> <span>{{ express.endPrice }}元/kg</span></li>
          </ul>
        </div>
        <div class="serverGiter">
          <div class="title"><strong>服务指南</strong>
          </div>
          <div class="allBox">
            <div class="server"><img src="http://182.61.16.69:8080/images/b269f0ff-b133-48d7-981b-06444e5d04a9.png" alt=""> <span>专属运营：运营1号</span></div>
            <!---->
            <!---->
            <div class="singleImg"><img src="http://182.61.16.69:8080/images/7eb81c88-66d0-4f0c-a68c-bcf87436931d.png" alt="code" class="img-s" @mouseover="nextShow" @mouseout="nextHide">
            <img ref="daImg" src="http://182.61.16.69:8080/images/7eb81c88-66d0-4f0c-a68c-bcf87436931d.png" alt="code" class="img-l" style="display: none;"></div>
          </div>
          <div class="footer">
            <h2>
              <!-- <a href="../../../../static/html/help.html" target="_blank">帮助中心</a> -->
              <a href="../../../../static/html/video.html" target="_blank">视频介绍</a>
            </h2>
          </div>
        </div>
      </div>
    </div>
    <div class="navTitle">
      <ul class="navTitle">
        <li class="nav active">采购订单</li>
        <li class="lastRight">
          <div class="slots">
            <a href="../../../../static/html/video.html" target="_blank" class="text-button-b gift">发货教程</a>
          <b class="button-n" @click="goBuy">立即采购</b></div>
        </li>
      </ul>
    </div>
    <div class="orderList">
      <div class="noCont">
        <img src="http://106.14.154.124:8099/images/noContainer.svg" alt="">
        <p>暂无数据</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'My',
  components: {},
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['name', 'wealth', 'express'])
  },
  methods: {
    goBuy() {
      this.$router.push('/control/buy')
    },
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
.userCenter {
  padding-left: 20px;
}
</style>
