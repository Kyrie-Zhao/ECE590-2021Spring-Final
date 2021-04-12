<template>
  <el-row class="ProfilePageContainer">
    <el-row class="head">
      <el-menu :default-active="activeIndex" class="el-menu-h" mode="horizontal" @select="handleSelectH">
      <el-menu-item index="1"><i class="el-icon-s-home"></i></el-menu-item>
      <el-menu-item index="6" class="right-menu-2">Log Out</el-menu-item>
      </el-menu>
    </el-row>
    <el-row class = "body">
      <el-col :span="6" class="nav">
        <el-menu :default-active="this.activeIndexV" class="el-menu-v" @select="handleSelectV">
        <el-menu-item index="1" >Account Info</el-menu-item>
        <el-menu-item index="2" >Practice History</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="15">
        <h3 class="title">{{this.name}}, Welcome!</h3>
        <div class="Info" v-if="selectedInfo()">
          <el-row class="infoContainer">
          <el-row>
            <el-avatar :size="80" icon="el-icon-user-solid"></el-avatar>
          </el-row>
          <div class="line"></div>
          <el-row class="infoRow">
            <i class="el-icon-user"></i>    {{this.name}}
          </el-row>
          <el-row class="infoRow">
            <i class="el-icon-message"></i>    {{this.email}}
          </el-row>
          </el-row>
        </div>
        <div v-if="selectedHistory()">
          <i class="el-icon-star-on"></i>&nbsp;&nbsp;Practice on 04/11/21 15:30, 30s&nbsp;&nbsp;&nbsp;&nbsp;<el-button type="primary" icon="el-icon-zoom-in" @click="onClickHistory()">Check Feedback</el-button>
        </div>
      </el-col>
      </el-row>
  </el-row>
</template>
<script>
export default {
  name: 'ProfilePage',
  data() {
    return {
      name: '',
      email: '',
      avartar: '',
      activeIndex: '1',
      activeIndexV: '1',
      selectedContent: 'info'
    }
  },
  created() {
    this.getInfo()
  },
  computed: {
  },
  methods: {
      getInfo() {
        this.name = this.$store.getters.name
        this.email = this.$store.getters.email
      },
      handleSelectH(key) {
        if (key === '1') {
          this.onClickHome()
        } else {
          this.onClickLogout()
        }
      },
      handleSelectV(key) {
        if (key === '1') {
          this.selectedContent = 'info'
        } else {
          this.selectedContent = 'history'
        }
      },
      selectedInfo() { return this.selectedContent === 'info'},
      selectedHistory() { return this.selectedContent === 'history'},
      onClickHome() {
        this.$router.push('/');
      },
      onClickHistory() {
        this.$router.push('/feedback');
      },
      onClickLogout() {
        this.$store.dispatch('user/logout')
          .then(() => {
              this.$router.push('/')
          })
          .catch(() => {
              console.log("logout failure")
          })
      },
    }
} 
</script>
<style scoped>
  .ProfilePageContainer {
    position: fixed;
    width: 99%;
    height: 99%;
  }
  .infoContainer {
    margin: auto;
    width: 30%;
  }
  .blueContainer {
    margin: auto;
    width: 80%;
  }
  .infoRow {
    margin: 5%;
    padding-left: 26%;
    text-align: left;
  }
  .infoButton {
    width: 96%;
    padding: 2%;
  }
 .body {
    height: 100%;
  }
  .el-menu-v {
    height: 1000px;
  }
  td, th {
    padding: 5px;
  }
  table {
    margin-left: auto;
    margin-right: auto;
  }
  .robot-title {
    text-align: left;
    padding-right: 200px;
  }
  .cost {
    text-align: right;
  }
  .right-menu-2 {
    position:absolute;
    right: 10px;
  }
  .line {
    border-bottom: 1px solid grey;
  }
</style>