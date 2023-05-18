<template>
  <div>
    <div class="main">
      <form class="container" @mousedown.stop>
        <div class="title">
          <span class="loginTitle">登 录</span>
          <span class="registerTitle">注 册</span>
        </div>
        <div class="input-field userName">
          <i class="iconfont icon-people"></i>
          <input
            type="text"
            placeholder="用户名"
            v-model="userLoginInfo.username"
            @blur="verificationLogin"
            @input="removeWarning($event)"
            onkeydown="javascript:if(event.keyCode == 32)event.returnValue = false;"
          />
          <div class="warningDialog">
            <i class="iconfont icon-warn"></i>
            <span class="userNameWarnText">{{ userNameWarningTipText }}</span>
          </div>
        </div>
        <div class="input-field passWord">
          <i class="iconfont icon-lock"></i>
          <input
            maxlength="16"
            type="password"
            placeholder="密码"
            v-model="userLoginInfo.password"
            @blur="verificationLogin"
            @input="removeWarning($event)"
            class="passwordInput"
            required
            style.imeMode="disabled"
            onkeyup="value=value.replace(/[^\w\.\/]/ig,'')"
            onkeypress="javascript:if(event.keyCode == 32) event.returnValue = false;"
          />
          <div class="eye-password" @click="changeShowPassword">
            <i class="iconfont icon-eye1" v-show="showPassword"></i>
            <i class="iconfont icon-eye" v-show="!showPassword"></i>
          </div>
          <div class="warningDialog">
            <i class="iconfont icon-warn"></i>
            <span class="userNameWarnText">{{ passwordWarningTipText }}</span>
          </div>
        </div>

        <div class="input-field phoneRegister phoneNum">
          <i class="iconfont icon-shouji1"></i>
          <input
            minlength="11"
            maxlength="11"
            placeholder="手机号（选填）"
            @blur="verificationLogin"
            @input="removeWarning($event)"
            class="phoneNumberInput"
            required
          />
          <div class="warningDialog">
            <i class="iconfont icon-warn"></i>
            <span class="userNameWarnText">格式不正确</span>
          </div>
        </div>

        <div class="input-field phoneRegister verificationCode">
          <input
            minlength="11"
            maxlength="11"
            placeholder="短信验证码（选填）"
            @blur="verificationLogin"
            @input="removeWarning($event)"
            class="phoneNumberInput"
          />
          <div class="warningDialog">
            <i class="iconfont icon-warn"></i>
            <span class="userNameWarnText">验证码错误</span>
          </div>
          <span>获取短信</span>
        </div>
        <div class="btn">
          <input
            type="button"
            value="登 录"
            class="form-submit login"
            @click="verificationIsNull('login')"
          />
          <input
            type="button"
            value="注 册"
            class="form-submit register"
            @click="verificationIsNull('register')"
          />
        </div>
        <div class="togglePage">
          <span class="login" @click="changePage">首次访问？</span>
          <span class="register" @click="changePage">已是我们一员?</span>
        </div>
        <div class="closeLoginDialog" @click="hiddenDialog">
          <i class="iconfont icon-searchclose"></i>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignIn',
  data () {
    return {
      showPassword: true,
      userLoginInfo: {
        username: 'JALIR12',
        password: '123456'
      },
      vshow_username: Boolean,
      userNameWarningTipText: '',
      passwordWarningTipText: '',
      allowSend: false
    }
  },
  methods: {
    // 点击外部隐藏整个页面
    hiddenDialog () {
      this.$parent.toggleSignInDialog()
    },
    // 密码显示与隐藏
    changeShowPassword () {
      const type = $('.passwordInput')
      type.attr('type') === 'text'
        ? type.attr('type', 'password')
        : type.attr('type', 'text')
      this.showPassword = !this.showPassword
    },
    // 注册与登录的切换
    changePage () {
      this.removeAllWarning()
      $('.main').toggleClass('register')
    },
    // 发送请求
    async loginUserInfo () {
      const { data: msg } = await this.$http.post(
        '/user/login',
        this.userLoginInfo
      )
      if (msg.status !== 200) return this.usernameWarningTip(msg.msg)
      localStorage.setItem('token', msg.token)
      localStorage.setItem('user', msg.username)
      this.$parent.toggleSignInDialog()
      window.location.reload()
    },
    async registerUserInfo () {
      const { data: msg } = await this.$http.post(
        '/user/register',
        this.userLoginInfo
      )
      if (msg.status !== 200) return this.usernameWarningTip(msg.msg)
      localStorage.setItem('token', msg.token)
      localStorage.setItem('user', msg.username)
      this.$store.commit('changeLoginState', true)
      this.$parent.toggleSignInDialog()
      window.location.reload()
    },
    // 登录前校验是否为空以及符合规范
    verificationIsNull (text) {
      if (!this.verificationLogin()) return false
      if (!this.userLoginInfo.username) {
        this.userNameWarningTipText = '用户名不能为空'
        $('.userName').addClass('showNameWarning')
        return false
      } else if (!this.userLoginInfo.password) {
        this.passwordWarningTipText = '密码不能为空'
        $('.passWord').addClass('showPasswordWarning')
        return false
      }
      if (text === 'register') return this.registerUserInfo()
      this.loginUserInfo()
    },
    // 离开焦点后校验是否符合规范
    verificationLogin () {
      const USERNAME = /^[a-zA-Z0-9_-]{5,20}$/g
      const PASSWORD = /^(\w){5,16}$/g
      if (
        this.userLoginInfo.username &&
        !USERNAME.test(this.userLoginInfo.username)
      ) {
        this.usernameWarningTip('用户名为5~20位英文及数字')
      } else if (
        this.userLoginInfo.password &&
        !PASSWORD.test(this.userLoginInfo.password)
      ) {
        this.passwordWarningTip('密码为6~16位字母及数字')
      } else {
        return true
      }
    },
    removeWarning (event) {
      $(event.currentTarget.parentElement).removeClass(
        'showNameWarning showPasswordWarning showPhoneRegisterWarning showVerificationWarning'
      )
    },
    removeAllWarning () {
      $('.userName').removeClass('showNameWarning')
      $('.passWord').removeClass('showPasswordWarning')
      $('.phoneNum').removeClass('showPhoneRegisterWarning')
      $('.verificationCode').removeClass('showVerificationWarning')
    },
    usernameWarningTip (text) {
      this.userNameWarningTipText = text
      $('.userName').addClass('showNameWarning')
    },
    passwordWarningTip (text) {
      this.passwordWarningTipText = text
      $('.passWord').addClass('showPasswordWarning')
    }
  }
}
</script>

<style lang="less" scoped>
@dark-background: #000;
@iconfont-size: 26px;
//showNameWarning showPasswordWarning showPhoneRegisterWarning showVerificationWarning register

.main {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.2);
  //font-family: 'Poppins', sans-serif;
}

.main .container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 80%;
  max-width: 420px;
  //height: 550px;
  padding: 30px 20px;
  border-radius: 5px;
  background-color: var(--background-color);
  box-shadow: 0 0.125rem 1.625rem -1.1875rem rgba(0, 0, 0, 0.5);
  animation: show 200ms linear;
}

@keyframes show {
  0% {
    top: 49.8%;
  }
  100% {
    top: 50%;
    opacity: 1;
  }
}

.container .closeLoginDialog {
  position: absolute;
  right: 40px;
  top: 40px;
  cursor: pointer;
}

.container .title {
  font-size: 32px;
  font-weight: 500;
  margin-bottom: 30px;
  color: var(--color);

  .registerTitle {
    display: none;
    transition: 1s;
  }
}

.register .title {
  .registerTitle {
    display: block;
    transition: 1s;
  }

  .loginTitle {
    display: none;
    transition: 1s;
  }
}

.main .container .input-field {
  //display: flex;
  position: relative;
  max-width: 380px;
  min-width: 240px;
  width: 80%;
  height: 55px;
  padding: 0 18px;
  margin: 18px 0;
  border: 1px solid var(--color);
  border-radius: 55px;
  transition: 500ms;

  i {
    float: left;
    text-align: center;
    padding: (@iconfont-size / 2) 0;
    font-size: @iconfont-size;
    color: var(--color);
  }

  input {
    flex: 1;
    width: 80%;
    height: 100%;
    margin-left: 8px;
    font-weight: 400;
    color: var(--color);

    &::-webkit-input-placeholder {
      opacity: 0.4;
      color: var(--color);
    }
  }
}

.register .container .input-field {
  margin: 10px 0;
  transition: 500ms;
}

// 手机注册区域
.main .phoneRegister {
  display: none;
  align-items: center;
  transition: 1s;

  input {
    width: 50%;
  }

  span {
    cursor: pointer;
    width: 80px;
  }
}

.register .phoneRegister {
  display: flex;
  transition: 1s;
}

// 手机注册区域

.container .btn {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 380px;
  min-width: 240px;
  width: 80%;
  height: 55px;
  //max-width: 600px;
  margin-top: 18px;

  .register {
    display: none;
  }
}

.register .btn {
  margin-top: 12px;

  .login {
    display: none;
  }

  .register {
    display: block;
  }
}

.container .btn .form-submit {
  flex: 1;
  height: 100%;
  cursor: pointer;
  border: 1px solid var(--color);
  border-radius: 40px;
  color: var(--color);
}

.eye-password {
  cursor: pointer;
  position: absolute;
  right: 20px;
  top: 0;
}

.main .warningDialog {
  position: absolute;
  left: 0;
  bottom: -20px;
  width: 100%;
  height: 20px;
  line-height: 20px;
  padding: 0 22px;
  font-size: 16px;
  font-weight: 400;
  transition: 1s;
  display: none;

  i.iconfont {
    padding: 0;
    font-size: 18px;
    margin-right: 10px;
  }
}

.main .togglePage {
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  width: 80%;
  padding: 0 18px;
  height: 55px;

  span {
    cursor: pointer;
  }

  .register {
    display: none;
  }
}

.register .togglePage {
  .register {
    display: block;
  }

  .login {
    display: none;
  }
}

.main .showNameWarning .warningDialog,
.main .showPasswordWarning .warningDialog,
.main .showPhoneRegisterWarning .warningDialog {
  display: block;
  animation: move 0.5s linear;
}

@keyframes move {
  0%,
  100% {
    -webkit-transform: translateX(0);
  }
  16%,
  48%,
  82% {
    -webkit-transform: translateX(-5px);
  }
  32%,
  64%,
  60% {
    -webkit-transform: translateX(5px);
  }
}
</style>
