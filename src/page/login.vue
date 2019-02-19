<template>
    <div class="login-container" ref="wrapper">
        <el-form
            ref="loginForm"
            :model="loginForm"
            :rules="loginRules"
            class="login-form"
            label-position="left"
        >
          <div class="title"><img src="../common/img/login/icon.png"><span>青客物联网监控面板</span></div>
          <p class="warn" v-show="showWarn">*{{this.message}}</p>
          <el-form-item prop="username" class="group">
            <img src="../common/img/login/user.png" alt="">
            <el-input
                v-model="loginForm.username"
                placeholder="请输入用户名"
                name="username"
                type="text"
                autocomplete="off"
            />
          </el-form-item>
          <el-form-item prop="password" class="group">
            <img src="../common/img/login/psd.png" alt="">
            <el-input
                :type="passwordType"
                v-model="loginForm.password"
                placeholder="请输入密码"
                name="password"
                @keyup.enter.native="handleLogin"
                @focus="focus"
                autocomplete="off"
            />
          </el-form-item>
          <el-button
              class="botton"
              :loading="loading"
              type="primary"
              style="width:100%;margin-bottom:30px;"
              @click.native.prevent="handleLogin"
          >登录</el-button>
          <el-checkbox label="记住登录状态" v-model="isChecked"></el-checkbox>
        </el-form>
        <img class="ball" src="../common/img/login/ball.png" alt="">
    </div>
</template>

<script>
import {encrypt, decrypt} from 'common/js/privacy.js'
export default {
    name: "Login",
    components: {},
    data() {
      return {
        loginForm: {
          username: "",
          password: ""
        },
        loginRules: {
          username: [
            {
              // required: true,
              // trigger: "blur",
              // validator: this.validateUsername
            }
          ],
          password: [
            {
              // required: true,
              // trigger: "blur",
              // validator: this.validatePassword
            }
          ]
        },
        passwordType: "",
        loading: false,
        showDialog: false,
        redirect: undefined,
        showWarn: false,
        isChecked: false,
        message: ''
      };
    },
    mounted() {
      this.setRap()
      window.onresize = ()=> {
        this.setRap()
      }

      let key = 'key'
      if (localStorage.getItem('isChecked') === 'true') {
        this.isChecked = true
        this.passwordType = 'password'
        this.loginForm = JSON.parse(localStorage.getItem('loginFormStorge'))
        this.loginForm.username = decrypt(this.loginForm.username, key)
        this.loginForm.password = decrypt(this.loginForm.password, key)
      } else {
        this.isChecked = false
        this.loginForm = {
          username: '',
          password: ''
        }
      }
    },
    destroyed(){
      window.onresize=null;
      // document.body.style.overflowY = 'auto';
    },

    methods: {
      setRap(){
        var wrapper = this.$refs.wrapper;
        var rap = document.body.clientWidth / 1903 || 1
        var raph = document.body.clientHeight / 1080 || 1
        wrapper.style.transformOrigin = '0 0'
        wrapper.style.transform = 'scale(' + rap + ',' + raph + ') translateZ(0)'
        wrapper.style.width = '1903px'
        wrapper.style.height = '1080px'
      },
      validateUsername(rule, value, callback) {
          // if (!isvalidUsername(value)) {
          //     callback(new Error("Please enter the correct user name"));
          // } else {
          //     callback();
          // }
      },
      validatePassword(rule, value, callback) {
          if (value.length < 6) {
              callback(
                  // new Error("The password can not be less than 6 digits")
              );
          } else {
              callback()
          }
      },
      focus() {
        this.passwordType = "password"
      },
      async handleLogin() {
        if (!this.loginForm.username) {
          this.showWarn = true
          this.message = '用户名不能为空'
          return
        }
        if (!this.loginForm.password) {
          this.showWarn = true
          this.message = '密码不能为空'
          return
        }
        const info = await this.$http.post('/dmp/api/Account/Login', this.loginForm).catch(res => res)
        if (info.access_token) {
          this.$http.setheader(info.access_token)
          this.$router.push('home')
          this.rememberPsd()
        } else {
          this.showWarn = true
          this.message = info.message
        }
      },
      rememberPsd() {
        let key = 'key'
        if (this.isChecked) {
          localStorage.setItem('isChecked', true)
          this.loginForm.username = encrypt(this.loginForm.username, key)    
          this.loginForm.password = encrypt(this.loginForm.password, key)    
          localStorage.setItem('loginFormStorge', JSON.stringify(this.loginForm))
        } else {
          localStorage.setItem('isChecked', false)
          localStorage.setItem('loginFormStorge', '')
        } 
      }
    }
};
</script>

<style lang="stylus">
  input:-webkit-autofill , textarea:-webkit-autofill, select:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px white inset;
    border: 1px solid #CCC!important;
  }

@keyframes rotate 
  from
    transform scale(0deg)
  to
    transform scale(360deg)

.ball 
  animation rotate 30s linear infinite

.login-container
  background url('../common/img/login/bg.png') no-repeat
  background-size cover
  >img 
    position relative
    top 100px
    left 100px
  .login-form 
    width 533px
    height 556px
    box-sizing border-box
    padding 100px 111px 50px 75px
    position absolute
    right 210px
    top 0
    bottom 120px
    margin auto
    background url('../common/img/login/form-bg.png') no-repeat
    .title 
      margin-bottom 50px
      span 
        display inline-block
        margin-left 15px
        letter-spacing 1px
        font-size 32px
        color #ECFDFF
    .warn
      font-size 16px
      margin-bottom 10px
      color #CD1B0F
    .group
      margin-bottom 40px
      img
        position absolute
        top 11px
        left 12px 
        z-index 9
    .botton
      font-size 20px
      background url('../common/img/login/button.png') 100% 100%  no-repeat
      font-weight bold
      background-size 100%
      letter-spacing 10px
      border none
</style>
