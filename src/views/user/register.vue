<template>
  <div class="reg">
    <div class="newLogBase">
      <div class="contBox">
        <div class="leftBox">
          <h2>欢迎来到求新品</h2>
          <h3>我们提供赠品采购、发货、一站式服务。</h3>
          <div class="line"><span /><span class="active" /></div>
          <div class="box">
            <ul class="form">
              <li class="inputLi">
                <input v-model="formData.mobile" type="text" placeholder="请输入手机号">
              </li>
              <!-- <li class="inputLi">
                <input v-model="formData.code" type="text" placeholder="请输入验证码">
                <span class="getCode">获取验证码</span> <span class="runCode getCode" style="display: none;">s</span>
              </li> -->
              <li class="inputLi">
                <input v-model="formData.password" type="password" placeholder="请设置密码">
              </li>
              <li class="inputLi">
                <input v-model="formData.qq" type="text" placeholder="输入QQ号">
              </li>
              <li class="inputLi">
                <input v-model="formData.wechat" type="text" placeholder="输入微信号">
              </li>
            </ul>
            <div class="operate"><strong>QQ和微信便于我们的客服为你更好地服务。</strong>
              <router-link to="/login"><span>返回登录</span></router-link>
            </div>
            <div class="footer"><b class="toReg" @click="handleReg">完成注册</b></div>
          </div>
        </div>
        <div class="rightImg"><img src="http://106.14.154.124:8099/images/reg/登录_插图.png" alt="png"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { Message } from 'iview'
export default {
  components: {},
  data() {
    return {
      formData: {
        mobile: '',
        code: '666666',
        password: '',
        qq: '',
        wechat: ''
      },
      redirect: ''
    }
  },
  computed: {},
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    handleReg() {
      Message.destroy()
      if (!this.formData.mobile || this.formData.mobile.trim() === '') {
        Message.info('手机号不能为空')
        return
      }
      // if (!this.formData.code || this.formData.code.trim() === '') {
      //   Message.info('验证码不能为空')
      //   return
      // }
      if (!this.formData.password || this.formData.password.trim() === '') {
        Message.info('密码不能为空')
        return
      }
      if (!this.formData.qq || this.formData.qq.trim() === '') {
        Message.info('QQ不能为空')
        return
      }
      if (!this.formData.wechat || this.formData.wechat.trim() === '') {
        Message.info('微信不能为空')
        return
      }
      this.$store
        .dispatch('RegisterByUsername', this.formData)
        .then((res) => {
          if (res.returnCode === '0000') {
            this.$router.push({ path: this.redirect || '/' })
          } else {
            Message.info(res.returnMessage)
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.reg {
  width: 100%;
  height: 100%;
  .box {
    width: 360px;
  }
  a {
    text-decoration: none;
  }
}
.reg .box .form {
  border: 1px solid #ddd;
  border-radius: 10px;
}
.reg .box .form li {
  height: 60px;
  box-sizing: border-box;
  padding: 20px;
  display: -ms-flexbox;
  display: flex;
  border-bottom: 1px solid #ddd;
  -ms-flex-align: center;
  align-items: center;
}
.reg .box .form li:last-child {
  border: none;
}
.reg .box .form li input {
  -ms-flex: 1;
  flex: 1;
  border: none;
  outline: none;
  -webkit-appearance: none;
  font-size: 15px;
  line-height: 40px;
}
.reg .box .form li .getCode {
  min-width: 100px;
  font-size: 15px;
  line-height: 40px;
  color: #f16591;
  cursor: pointer;
  border-left: 1px solid #eee;
  text-align: center;
  padding-left: 20px;
}
.reg .box .form li .runCode {
  cursor: not-allowed;
}
.reg .box .operate {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: justify;
  justify-content: space-between;
  font-size: 12px;
  line-height: 18px;
  margin-bottom: 30px;
  margin-top: 5px;
}
.reg .box .operate strong {
  font-size: 12px;
  line-height: 18px;
  color: #999;
}
.reg .box .operate span {
  color: #f16591;
  cursor: pointer;
}
.reg .box .footer {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: center;
  justify-content: center;
}
.reg .box .footer b {
  width: 172px;
  height: 45px;
  line-height: 45px;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  border-radius: 10px;
  cursor: pointer;
  background: #f16591;
  color: #fff;
  box-shadow: 0 0 5px RGBA(241, 101, 145, 0.3);
}
</style>
