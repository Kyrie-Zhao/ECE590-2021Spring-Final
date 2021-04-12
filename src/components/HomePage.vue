<template>
  <el-container class="HomePageContainer">
    <el-header>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1"><i class="el-icon-s-home"></i></el-menu-item>
      <el-menu-item index="2" v-if="!checkLogin()">Log In</el-menu-item>
      <el-menu-item index="3" v-if="!checkLogin()">Sign Up</el-menu-item>
      <el-menu-item index="4" v-if="checkLogin()"><i class="el-icon-user-solid"></i></el-menu-item>
      <el-menu-item index="6" v-if="checkLogin()" class="right-menu-2">Log Out</el-menu-item>
    </el-menu>
    </el-header>
    <el-main v-if="!checkLogin()">
        <h2 class="title">Presentationist</h2>
        <h3 class="title">Your Smart Presentation Audience and Advisor</h3>
    </el-main>
    <el-main v-else>
      <el-col class = "tutorial-bg">
        <div>
          <el-button type="text" class="innerbt-t" @click="onClickTutorial">Browse Our Tutorials</el-button>
        </div>
      </el-col>
      <el-col class = "practice-bg"> 
        <div>
          <el-button type="text" class="innerbt-p" @click="onClickPractice">Practice Presentation <br/> and Get Feedback</el-button>
        </div>
      </el-col>
    </el-main>
  </el-container>
</template>
<script>
export default {
  name: 'HomePage',
  data() {
    return {
      activeIndex: '1'
    }
  },
  methods: {
      handleSelect(key) {
        if (key === '2') {
          this.onClickLogin()
        } else if (key === '3') {
          this.onClickRegister()
        } else if (key === '4') {
          this.onClickPersonal()
        } else if (key === '6') {
          this.onClickLogout()
        }
      },
      checkLogin() {
        var islogin = this.$store.getters.islogin
        if (islogin === undefined) {
          return false 
        }
        if (islogin === 'undefined') {
          return false
        }
        return true
      },
      onClickLogin() {
        this.$router.push('/login');
      },
      onClickPersonal() {
        this.$router.push('/profile');
      },
      onClickRegister() {
        this.$router.push('/register');
      },
      onClickTutorial() {
        this.$router.push('/tutorials');
      },
      onClickPractice() {
        this.$router.push('/practice');
      },
      onClickLogout() {
        this.$store.dispatch('user/logout')
          .then(() => {
          })
          .catch(() => {
              console.log("logout failure")
          })
      },
    }
}
</script>
<style lang="scss">
.right-menu-2 {
  position:absolute;
  right: 10px;
}
.right-menu-1 {
  position:absolute;
  right: 80px;
}
.tutorial-bg {
  background: url("../assets/tutorials.jpeg");
  background-size: cover;
  border-right: 3px solid white;
  opacity: 0.67;
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.practice-bg {
  background: url("../assets/presentationbg.jpeg");
  background-size: cover;
  opacity: 0.67;
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.innerbt-t{
  color: white;
  //border: solid black;
  width: 100%;
  height: 100%;
  font-size: 2.5em;
  text-shadow: 5px 5px 5px black;
}
.innerbt-p{
  color: white;
  //border: solid black;
  width: 100%;
  height: 100%;
  font-size: 2.5em;
  text-shadow: 5px 5px 5px black;
}
.innerbt-p:hover{
  font-size: 2.8em;
}
.innerbt-t:hover{
  font-size: 2.8em;
}
.el-main {
  height: 100%;
}
</style>