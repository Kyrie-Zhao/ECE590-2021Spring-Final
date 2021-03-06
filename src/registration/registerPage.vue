<template>

  <div class="login-container">
    <div class="HomePageContainer">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1"><i class="el-icon-s-home"></i></el-menu-item>
      </el-menu>
    </div>
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">

        <div class="title-container">
            <h3 class="title">Sign Up</h3>
        </div>

        <el-form-item prop="username">
            <span>
            <i class="el-icon-user"></i>
            </span>
            <el-input
            ref="username"
            v-model="loginForm.username"
            placeholder="Username"
            name="username"
            type="text"
            tabindex="1"
            autocomplete="on"
            />
        </el-form-item>

        <el-form-item prop="email">
            <span>
            <i class="el-icon-message"></i>
            </span>
            <el-input
            ref="email"
            v-model="loginForm.email"
            placeholder="Email"
            name="email"
            type="text"
            tabindex="2"
            autocomplete="on"
            />
        </el-form-item>

        <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
            <el-form-item prop="password">
            <span>
                <i class="el-icon-key"></i>
            </span>
            <el-input
                :key="passwordType"
                ref="password"
                v-model="loginForm.password"
                :type="passwordType"
                placeholder="Password"
                name="password"
                tabindex="3"
                autocomplete="on"
                @keyup.native="checkCapslock"
                @blur="capsTooltip = false"
                @keyup.enter.native="handleLogin"
            />
            <span class="show-pwd" @click="showPwd">
                <i class="el-icon-view"></i>
            </span>
            </el-form-item>
        </el-tooltip>

        <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:20px;" @click.native.prevent="handleLogin">Submit</el-button>

    </el-form>
    <el-button type="text" style="width:50%;margin-bottom:30px;" @click="onClickLogin">Already Have an Account? Login!</el-button>
  </div>
</template>

<script>
import { validEmail, validUsername} from '../utils/validate'
export default {
  name: 'RegisterPage',
  components: {},
  data() {
    const validateUsername = (rule, value, callback) => {
        if (validUsername(value)) {
            callback()
        } else {
            callback(new Error('Please enter the correct usersname with A-Z, a-z, 0-9'))
        }
    }
    const validateEmail = (rule, value, callback) => {
        if (validEmail(value)) {
            callback()
        } else {
            callback(new Error('Please enter the correct email address with format \'example@example.com\''))
        }
    }
    const validatePassword = (rule, value, callback) => {
        if (value.length < 6) {
            callback(new Error('The password can not be less than 6 characters'))
        } else {
            callback()
        }
    }
    return {
      loginForm: {
        username: '',
        password: '',
        email:    ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        email: [{ required: true, trigger: 'blur', validator: validateEmail }],
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      activeIndex: '1',
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.email === '') {
      this.$refs.email.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    onClickLogin() {
        this.$router.push('/login');
    },
    onClickBReg() {
        this.$router.push('/business/register');
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/register', this.loginForm, this.isBusiness)
            .then(() => {
              this.$notify({
                title: 'Success',
                message: 'Sign up and Log in as User: '+this.loginForm.username,
                type: 'success'
              })
              this.$router.push('/')
              this.loading = false
            })
            .catch((error) => {
              this.$notify.error({
                    title: 'Sign Up Error',
                    message: error,
                });
              this.loading = false
            })
        } else {
          this.$notify.error({
                    title: 'Please Fill all Sections Properly before Submit',
                });
          return false
        }
      })
    },
    handleSelect(key) {
        if (key === '1') {
          this.$router.push('/')
        }
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>

<style lang="scss">
$bg:white;
$text: black;
$cursor: black;
@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}
/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $text;
      height: 47px;
      caret-color: $cursor;
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:white;
$text:black;
.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }
  .tips {
    font-size: 14px;
    color: $text;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $text;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: $text;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $text;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }
  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>