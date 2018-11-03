<template>
  <div class="login">
    <div class="newLogBase">
      <div class="contBox">
        <div class="leftBox">
          <h2>欢迎来到求新品</h2>
          <h3>我们提供赠品采购、发货、一站式服务。</h3>
          <div class="line"><span class="active"/><span
            class=""/></div>
          <div class="box">
            <ul class="form">
              <li class="inputLi"><span
                class="admin"/>
                <input v-model="formData.username" type="text" placeholder="帐号">
              </li>
              <li class="inputLi"><span
                class="lock"/>
                <input v-model="formData.password" type="password" placeholder="密码">
              </li>
            </ul>
            <div class="operate">
              <span/>
              <span>忘记密码？</span>
            </div>
            <div class="footer"><b class="login" @click="handleLogin">登录</b>
            <b class="toReg" @click="goReg">去注册</b></div>
          </div>
        </div>
        <div class="rightImg"><img
          src="http://106.14.154.124:8099/images/reg/登录_插图.png"
          alt="png"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { Message } from 'iview'
export default {
  name: 'Login',
  components: {},
  data() {
    return {
      formData: {
        username: '',
        password: ''
      },
      redirect: undefined
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
    goReg() {
      this.$router.push('/register')
    },
    handleLogin() {
      Message.destroy()
      if (!this.formData.username || this.formData.username.trim() === '') {
        Message.info('账号不能为空')
        return
      }
      if (!this.formData.password || this.formData.password.trim() === '') {
        Message.info('密码不能为空')

        return
      }
      this.$store.dispatch('LoginByUsername', this.formData).then(() => {
        this.$router.push({ path: this.redirect || '/' })
      }).catch(() => {
        Message.info('账号或密码错误')
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.login {
	width: 100%;
	height: 100%
}
.login .box {
	width: 410px
}
.login .box .form {
	border: 1px solid #ddd;
	border-radius: 10px
}
.login .box .form li {
	height: 72px;
	box-sizing: border-box;
	padding: 20px;
	display: -ms-flexbox;
	display: flex;
	border-bottom: 1px solid #ddd
}
.login .box .form li:last-child {
	border: none
}
.login .box .form li span {
	width: 20px;
	margin-right: 20px;
	vertical-align: middle
}
.login .box .form li input {
	-ms-flex: 1;
	flex: 1;
	border: none;
	outline: none;
	-webkit-appearance: none;
	font-size: 20px;
	line-height: 50px
}
.login .box .form li .admin {
background:url(http://106.14.154.124:8099/images/mobile/个人.png) no-repeat;
	background-size: 100%
}
.login .box .form li .lock {
background:url(http://106.14.154.124:8099/images/mobile/密码.png) no-repeat;
	background-size: 100%
}
.login .box .operate {
	display: -ms-flexbox;
	display: flex;
	-ms-flex-pack: justify;
	justify-content: space-between;
	font-size: 20px;
	line-height: 28px;
	color: #333;
	cursor: pointer;
	margin-bottom: 60px;
	margin-top: 10px
}
.login .box .operate .forget, .login .box .operate span {
	font-size: 14px;
	line-height: 18px;
	color: #333
}
.login .box .footer {
	display: -ms-flexbox;
	display: flex;
	-ms-flex-align: center;
	align-items: center
}
.login .box .footer b {
	width: 172px;
	height: 45px;
	line-height: 45px;
	text-align: center;
	font-size: 20px;
	font-weight: 700;
	margin-right: 50px;
	border-radius: 10px;
	cursor: pointer
}
.login .box .footer .login {
	background: #f16591;
	box-shadow: 8px 5px 11px RGBA(241,101,145,.3);
	color: #fff
}
.login .box .footer a {
  text-decoration: none;
}
.login .box .footer .toReg {
	background: #fff;
	box-shadow: 0 -1px 11px RGBA(241,101,145,.23);
	color: #f16591
}
</style>
