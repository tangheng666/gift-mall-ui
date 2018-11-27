<template>
  <div class="showContent">
    <left-router />
    <div class="right">
      <div class="accountMoney">
        <h2>
          <strong>账户充值</strong>
        </h2>
        <h6><span>当前账户：</span> <strong>18823274880</strong></h6>
        <h6><span>账户余额：</span> <b>￥ {{ wealth }}</b></h6>
        <div>
          <div class="content">
            <div class="rechargeBase">
              <div class="payBox">
                <div class="payCode">
                  <div class="showCode">
                    <!-- <img src="http://106.14.154.124:8099/images/zfLogo.png" alt="l"></div> -->
                    <div class="boxsBlue">
                      <h6/>
                      <!-- <img src="http://106.14.154.124:8099/images/payCode.png" alt="c"> -->

                    </div>
                  </div>
                </div>
                <div class="tips">
                  <h2>
                    请打开微信扫一扫添加客服微信进行充值
                  </h2>
                  <div class="showTips">
                    <img src="http://182.61.16.69:8080/images/7eb81c88-66d0-4f0c-a68c-bcf87436931d.png" alt="p">

                  </div>
                  <h2>各位商家请联系我们客服进行充值,敬请谅解！</h2>
                </div>
              </div>
              <div class="footer"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { leftRouter } from './components'
import { mapGetters } from 'vuex'
export default {
  name: 'Recharge',
  components: {
    leftRouter
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['wealth'])
  },
  methods: {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.accountMoney {
  padding-left: 20px;
}

.accountMoney h2 {
  display: flex;
  align-items: center;
  line-height: 30px;
  margin-bottom: 10px;
}
.accountMoney h2 strong {
  font-size: 22px;
  line-height: 30px;
  color: #333;
  margin-right: 15px;
}

.accountMoney h2 span {
  font-size: 12px;
  line-height: 18px;
  color: #333;
  padding-left: 10px;
  border-left: 1px solid #eee;
  cursor: pointer;
  transition: all 0.2s;
}
.accountMoney h2 span:hover {
  color: #d01126;
}
.accountMoney h6 {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
}
.accountMoney h6 span {
  font-size: 14px;
  line-height: 20px;
  color: #666;
}
.accountMoney h6 strong {
  font-size: 16px;
  line-height: 22px;
  color: #333;
  font-weight: 700;
}
.accountMoney h6 b {
  font-size: 20px;
  line-height: 24px;
  color: #d01126;
  font-weight: 700;
}
.rechargeBase {
  padding: 20px 40px;
}
.rechargeBase .payBox {
  display: -ms-flexbox;
  display: flex;
  border-bottom: 1px dashed #999;
}
.rechargeBase .payBox .payCode {
  width: 260px;
}
.rechargeBase .payBox .payCode .showCode {
  box-shadow: 0 1px 2px #dedede;
  border-radius: 5px;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  -ms-flex-align: center;
  align-items: center;
}
.rechargeBase .footer {
  // text-align: center;
}
.payBox .tips h2 {
  margin-left: 18px;
  padding: 8px;
  display: flex;
  align-items: center;
  line-height: 30px;
  margin-bottom: 10px;
}
.payBox .tips .showTips {
  text-align: center;
}
.rechargeBase .footer > h2 {
  font-size: 16px;
  line-height: 30px;
  color: #444;
  margin-top: 20px;
  display: initial;
}
.button-n {
  color: #fff;
  background: #d01126;
  transition: all 0.3s;
}
</style>
