<template>
  <div class="title">
    <div class="userTitle">
      <div class="titleWrap">
        <div class="left">
          <span :class="key==='/index'?'active':''" class="cursor" @click="pageShow('/')"> 幸运包首页</span>
          <span :class="key!=='/index'?'active':''" class="cursor" @click="pageShow('/control')">我的后台</span>
        </div>

        <div v-if="!name" class="right">
          <em class="cursor textB" @click="login()">登录</em> <span>|</span> <em class="cursor textB" @click="register()">免费注册</em>
        </div>
        <div v-else class="right loged">
          <Icon type="md-notifications-outline" size="16" class="cursor" @click="goNoticeList" />
          <span>账户余额：<span>{{ wealth }}元</span>
          </span> <em class="button-tip rechargeBtn" @click="goRecharge">充值</em>
          <strong class="cursor userInfo" @mouseover="yiRuUserInfo" @mouseout="yiChuUserInfo">Hi~{{ name }}
            <Icon type="ios-arrow-down" size="20" />
          </strong>
          <ul class="infoBox" style="overflow: hidden; padding-top: 0px; padding-bottom: 0px; overhide:hide;height:0;" @mouseover="yiRuUserInfo" @mouseout="yiChuUserInfo">
            <li class="head"><img src="http://182.61.16.69:8080/images/e27274b4-5ba5-4074-b495-e6edb7d34508.jpg" alt="用户头像"></li>
            <li class="userInfo">Hi~{{ name }}</li>
            <li class="level">
              <Icon type="ios-star" color="#FFB10F" style="padding-left:10px;padding-top:1px;" />
              <span>注册用户</span>
              <span>首重3.5元起</span>
            </li>
            <li class="balance"><span>账户余额</span> <strong>￥{{ wealth }}</strong></li>
            <li class="recharge">
              <span class="cursor" @click="openLogisticListModel">物流成本</span>
              <span class="cursor" @click="goMoneyRecord">资金明细</span>
            </li>
            <li class="changeQQ">
              <span class="cursor" @click="openUpdateModel">修改QQ/微信</span>
              <span class="cursor" @click="openUpdatePwdModel">修改密码</span>

            </li>
            <li class="exit cursor" @click="logout()">退出</li>
          </ul>
        </div>
      </div>
      <div class="alert">
        <Modal v-model="updateModel" :styles="modelStyle" title="修改QQ和微信">
          <Form ref="formValidate" :model="updateData" :rules="updateInfoValidRules" :label-width="80" class="updateFrom">
            <FormItem label="QQ" prop="qq">
              <i-input v-model="updateData.qq" placeholder="请输入QQ账号" style="width: 300px" />
            </FormItem>
            <FormItem label="微信" prop="wechat">
              <i-input v-model="updateData.wechat" placeholder="请输入微信账号" style="width: 300px" />
            </FormItem>
            <FormItem>
              <Button type="primary" @click="handleSubmit">保存</Button>
              <Button style="margin-left: 8px" @click="handleCancel">取消</Button>
            </FormItem>
          </Form>
          <div slot="footer" />
        </Modal>
        <Modal v-model="updatePwdModel" :styles="modelStyle" title="修改密码">
          <Form ref="updatePwdformValidate" :model="updatePwdForm" :rules="updatePwdValidRules" :label-width="85" class="updateFrom">
            <FormItem label="旧密码" prop="oldPassword">
              <i-input v-model="updatePwdForm.oldPassword" type="password" placeholder="请输入旧密码" style="width: 300px" />
            </FormItem>
            <FormItem label="新密码" prop="newPassword">
              <i-input v-model="updatePwdForm.newPassword" type="password" placeholder="请输入新密码" style="width: 300px" />
            </FormItem>
            <FormItem label="确认新密码" prop="confirmPwd">
              <i-input v-model="updatePwdForm.confirmPwd" type="password" placeholder="请输入确认新密码" style="width: 300px" />
            </FormItem>

            <FormItem>
              <Button type="primary" @click="updatePwdSbumit">保存</Button>
              <Button style="margin-left: 8px" @click="updatePwdCancel">取消</Button>
            </FormItem>
          </Form>
          <div slot="footer" />
        </Modal>

        <Modal v-model="logisticListModel" :styles="modelStyle" :width="800" :mask-closable="false" :closable="false">
          <div class="logisticList">
            <h2>圆通快递</h2>
            <ul class="price">
              <li>
                <strong>地区 / 重量</strong>
                <strong>0.5KG</strong>
                <strong>0.5-1KG</strong>
                <strong>续重(1KG以上)</strong>
              </li>
              <li>
                <strong> 普通地区</strong>
                <span>{{ express.firstPrice }} 元 / 单</span>
                <span>{{ express.middlePrice }} 元 / 单</span>
                <span>{{ express.endPrice }} 元 / KG</span>
              </li>
              <li>
                <strong>偏远地区</strong>
                <span>{{ express.farFirstPrice }} 元 / 单</span>
                <span>{{ express.farMidllePrice }} 元 / 单</span>
                <span>{{ express.farEndPrice }} 元 / KG</span>
              </li>
            </ul>
            <div class="desc">
              <span>*此物流费包含 <i>{{ express.description }}</i></span>
              <span>*偏远地区 <i> {{ express.note }}</i></span>
            </div>
          </div>
          <div slot="footer">
            <b class="button-n" @click="closeLogisticListModel">了解</b>
          </div>
        </Modal>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Message } from 'iview'
// import { expressFee } from '@/api/common'

export default {
  components: {},
  data() {
    const valiConfirmPwd = (rule, value, callback) => {
      if (value !== this.updatePwdForm.newPassword) {
        callback(new Error('两次输入的密码不一致'))
      } else {
        callback()
      }
    }

    return {
      show: false,
      updateModel: false,
      updateData: {
        qq: this.$store.getters.qq,
        wechat: this.$store.getters.wechat
      },
      updatePwdForm: {
        oldPassword: '',
        newPassword: '',
        confirmPwd: ''
      },
      updateInfoValidRules: {
        qq: [{ required: true, message: 'QQ号码不能为空' }],
        wechat: [{ required: true, message: '微信不能为空' }]
      },
      updatePwdValidRules: {
        oldPassword: [
          { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          {
            type: 'string',
            min: 6,
            message: '密码至少为6位字符',
            trigger: 'blur'
          },
          {
            type: 'string',
            max: 20,
            message: '密码最多为20位字符',
            trigger: 'blur'
          }
        ],
        confirmPwd: [
          { required: true, message: '请确认确定密码', trigger: 'blur' },
          {
            validator: valiConfirmPwd,
            message: '两次输入的密码不一致',
            trigger: 'blur'
          }
        ]
      },

      modelStyle: {
        'margin-top': '50px'
      },
      logisticListModel: false,
      updatePwdModel: false
    }
  },
  computed: {
    ...mapGetters(['name', 'wealth', 'express']),
    key() {
      return this.$route.path
    }
  },
  created() {},
  methods: {
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()
      })
    },
    goNoticeList() {
      this.$router.push('/control/noticeList')
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
    goMoneyRecord() {
      this.$router.push('/control/fundsDetail')
    },
    goRecharge() {
      this.$router.push('/control/recharge')
    },
    showInfo() {
      this.show = !this.show
    },
    openUpdateModel() {
      this.updateModel = true
    },
    handleSubmit() {
      Message.destroy()
      this.$refs.formValidate.validate(valid => {
        if (valid) {
          this.$store
            .dispatch('UpdateInfo', this.updateData)
            .then(res => {
              if (res.returnCode === '0000') {
                Message.success('修改成功')
                this.updateModel = false
              } else {
                Message.info(res.returnMessage)
              }
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          Message.error('请输入必填参数 !')
        }
      })
    },
    openUpdatePwdModel() {
      this.updatePwdModel = true
    },
    updatePwdSbumit() {
      // 修改密码

      Message.destroy()
      this.$refs.updatePwdformValidate.validate(valid => {
        if (valid) {
          this.$store
            .dispatch('updatePwd', this.updatePwdForm)
            .then(res => {
              if (res.returnCode === '0000') {
                Message.success('修改成功')
                this.updatePwdModel = false
                this.$store.dispatch('LogOut').then(() => {
                  location.reload()
                })
              } else {
                Message.info(res.returnMessage)
              }
            })
            .catch(err => {
              console.log(err)
            })
        }
      })
    },
    updatePwdCancel() {
      this.$refs.updatePwdformValidate.resetFields()
      this.updatePwdModel = false
    },
    handleCancel() {
      this.$refs.formValidate.resetFields()
      this.updateModel = false
    },
    yiRuUserInfo() {
      const elem = document.getElementsByClassName('infoBox')
      elem[0].style.height = '300px'
    },
    yiChuUserInfo() {
      const elem = document.getElementsByClassName('infoBox')
      elem[0].style.height = '0px'
    },
    openLogisticListModel() {
      this.logisticListModel = true
    },
    closeLogisticListModel() {
      this.logisticListModel = false
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
.userTitle .titleWrap .ivu-dropdown-item img {
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
  content: '';
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
  top: 48px;
  right: 0;
  padding: 0 20px;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06);
  border: 1px solid #eee;
  box-sizing: border-box;
  border-radius: 4px;
  transition: height 0.6s ease;
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
.userTitle .titleWrap .loged .infoBox .changePwd {
  display: flex;
  justify-content: space-between;
}
.userTitle .titleWrap .loged .infoBox .changePwd span {
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
  animation: bounce-in 0.6s;
}
.bounce-leave-active {
  animation: bounce-in 0.4s reverse;
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
.updateFrom {
  margin-top: 20px;
}

.logisticList {
  padding: 30px 40px;
  h2 {
    padding: 4px;
  }
  .price {
    border: 1px solid #979797;
    border-radius: 4px;
    li {
      display: flex;
      justify-content: space-between;
      padding: 14px;
      border: 1px #dedede;
      font-size: 16px;
      color: #303133;
      line-height: 22px;
      padding: 14px;
      text-align: center;
      border-bottom: 1px solid #979797;
      strong {
        font-weight: 700;
        flex: 1;
      }
      span {
        flex: 1;
      }
    }
  }
  .desc {
    text-align: left;
    padding: 12px;
    span {
      line-height: 22px;
      font-size: 16px;
      display: block;
      padding: 22px;
      i {
        margin-left: 5px;
        color: #ff3341;
      }
    }
  }
}
</style>
