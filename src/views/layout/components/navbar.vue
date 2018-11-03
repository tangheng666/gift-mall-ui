<template>
  <div class="title">
    <div class="userTitle">
      <div class="titleWrap">
        <div class="left">
          <span :class="key==='/index'?'active':''" class="cursor" @click="pageShow('/')"> 求新品首页</span>
          <span :class="key!=='/index'?'active':''" class="cursor" @click="pageShow('/control')">我的后台</span>
        </div>

        <div v-if="!name" class="right">
          <em class="cursor textB" @click="login()">登录</em> <span>|</span> <em class="cursor textB" @click="register()">免费注册</em>
        </div>
        <div v-else class="right loged">
          <Icon type="md-notifications-outline" size="16" class="cursor"/>
          <span>账户余额：<span>{{ balance }}元</span>
          </span> <em class="button-tip rechargeBtn">充值</em>
          <strong class="cursor userInfo" @click="showInfo()">Hi~{{ name }}
          <Icon :type="show?'ios-arrow-up':'ios-arrow-down'" size="20"/></strong>
          <transition name="bounce">
            <ul
              v-show="show"
              class="infoBox"
              style="overflow: hidden; padding-top: 0px; padding-bottom: 0px;"
              data-old-padding-top="0px"
              data-old-padding-bottom="0px"
              data-old-overflow="hidden">
              <li class="head" ><img src="http://106.14.154.124:8099/images/head.jpg" alt="用户头像"></li>
              <li class="userInfo">Hi~{{ name }}</li>
              <li class="level"><Icon type="ios-star" color="#FFB10F"/>
                <span>注册用户</span>
                <span>首重3.5元起</span>
              </li>
              <li class="balance"><span>账户余额</span> <strong>￥{{ balance }}</strong></li>
              <li class="recharge"><span class="cursor">物流成本</span> <span class="cursor">资金明细</span></li>
              <li class="changeQQ"><span class="cursor">修改QQ/微信</span></li> <li class="exit cursor" @click="logout()">退出</li>
            </ul>
          </transition>
        </div>
      </div>
      <div class="alert">
        <div class="el-dialog__wrapper" style="display: none;">
          <div class="el-dialog" style="margin-top: 15vh; width: 600px;">
            <div class="el-dialog__header"><span class="el-dialog__title">修改QQ/微信</span>
              <button type="button" aria-label="Close" class="el-dialog__headerbtn"><i class="el-dialog__close el-icon el-icon-close" /></button>
            </div>
            <!---->
            <div class="el-dialog__footer"><span class="dialog-footer"><b class="button-w">取消</b> <b class="button-n">确定</b></span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  components: {},
  data() {
    return {
      show: false
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'balance'
    ]),
    key() {
      return this.$route.path
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()
      })
    },
    pageShow(target) {
      this.$router.push(target)
    },
    login() {
      this.$router.push('/login')
    },
    register() {
      this.$router.push('/register')
    },
    showInfo() {
      this.show = !this.show
    }

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.userTitle {
  height: 48px;
  line-height: 48px;
  background: #24242a;
  display: -ms-flexbox;
  display: flex;
  padding: 0 100px;
  box-shadow: 0 1px 2px #dedede;
  -ms-flex-pack: center;
  justify-content: center;
  font-size: 14px;
  .cursor {
    cursor: pointer;
  }
  .titleWrap {
    display: -ms-flexbox;
    display: flex;
    width: 100%;
    -ms-flex-pack: justify;
    justify-content: space-between;
    max-width: 1240px;
    .left {
      text-align: left;
      span {
        color: #888;
        margin-right: 30px;
      }
    }
  }
}
.userTitle .titleWrap .ivu-dropdown-item  img {
    text-align: center;
    line-height: 1;
    margin-top: 30px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.userTitle .titleWrap .left span:hover {
  color: #d01126;
}
.userTitle .titleWrap .left .active {
  color: #fff;
}
.userTitle .titleWrap .right {
  text-align: right;
  position: relative;
}
.userTitle .titleWrap .right .rechargeBtn {
  color: #fff;
  background: #d01126;
}
.userTitle .titleWrap .right .textB {
  color: #999;
}
.userTitle .titleWrap .right b,
.userTitle .titleWrap .right i,
.userTitle .titleWrap .right span {
  color: #888;
}
.userTitle .titleWrap .right span {
  margin: 0 8px;
}
.userTitle .titleWrap .right strong {
  margin-left: 24px;
  color: #fff;
}
.userTitle .titleWrap .loged b {
  color: #999;
}
.userTitle .titleWrap .loged > span {
  margin: 0 22px;
  font-size: 14px;
  color: #999;
}
.userTitle .titleWrap .loged > span > span {
  margin: 0;
  color: #ddd;
}
.userTitle .titleWrap .loged .notice {
  position: relative;
}
.userTitle .titleWrap .loged .notice:after {
  content: "";
  position: absolute;
  top: -2px;
  right: -2px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #d01126;
}
.userTitle .titleWrap .loged .infoBox {
  position: absolute;
  z-index: 99;
  top: 45px;
  right: 0;
  padding: 0 20px;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06);
  border: 1px solid #eee;
  border-radius: 4px;
}
.userTitle .titleWrap .loged .infoBox li {
  line-height: 38px;
}
.userTitle .titleWrap .loged .infoBox .head {
  text-align: center;
  line-height: 1;
  margin-top: 30px;
}
.userTitle .titleWrap .loged .infoBox .head img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.userTitle .titleWrap .loged .infoBox .userInfo {
  text-align: center;
  font-size: 14px;
  color: #888;
}
.userTitle .titleWrap .loged .infoBox .level {
  height: 20px;
  line-height: 20px;
  margin: 9px 0;
  background: RGBA(255, 4, 55, 0.08);
  border-radius: 10px;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: justify;
  justify-content: space-between;
}
.userTitle .titleWrap .loged .infoBox .level i {
  color: #ffae03;
  font-size: 16px;
}
.userTitle .titleWrap .loged .infoBox .level span {
  font-size: 12px;
  line-height: 20px;
  color: #d01126;
}
.userTitle .titleWrap .loged .infoBox .balance {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: justify;
  justify-content: space-between;
}
.userTitle .titleWrap .loged .infoBox .balance span {
  font-size: 14px;
  line-height: 38px;
  color: #888;
}
.userTitle .titleWrap .loged .infoBox .balance strong {
  font-size: 16px;
  line-height: 38px;
  color: #444;
}
.userTitle .titleWrap .loged .infoBox .recharge {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: justify;
  justify-content: space-between;
}
.userTitle .titleWrap .loged .infoBox .recharge span {
  font-size: 14px;
  line-height: 38px;
  color: #d01126;
}
.userTitle .titleWrap .loged .infoBox .recharge em {
  -ms-flex-item-align: center;
  align-self: center;
}
.userTitle .titleWrap .loged .infoBox .changeQQ {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: justify;
  justify-content: space-between;
}
.userTitle .titleWrap .loged .infoBox .changeQQ span {
  font-size: 14px;
  line-height: 38px;
  color: #d01126;
}
.userTitle .titleWrap .loged .infoBox .exit {
  text-align: center;
  border-top: 1px solid #d8d8d8;
  font-size: 14px;
  line-height: 38px;
  color: #888;
}
.userTitle .alert .list {
  padding: 0 20px;
  font-size: 14px;
  color: #525f75;
  margin-top: 20px;
}
.userTitle .alert .list span {
  display: inline-block;
  min-width: 100px;
  text-align: right;
  margin-right: 20px;
}
.bounce-enter-active {
  animation: bounce-in .6s;
}
.bounce-leave-active {
  animation: bounce-in .4s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
