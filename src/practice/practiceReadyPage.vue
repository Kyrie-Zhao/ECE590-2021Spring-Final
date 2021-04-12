<template>
  <el-container class="contain">
    <el-header>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1"><i class="el-icon-s-home"></i></el-menu-item>
        <el-menu-item index="2"><i class="el-icon-user-solid"></i></el-menu-item>
        <el-menu-item v-if="haveAsked()&&!haveStarted()" index="3">Upload Slides</el-menu-item>
        <el-menu-item index="6" class="right-menu-2">Log Out</el-menu-item>
    </el-menu>
    </el-header>
    <el-main>
        <el-dialog
            title="Upload Slides"
            :visible.sync="askDialogVisible"
            :show-close=false
            width="30%"
            center>
            <span style="text-align:center;display:block;">Would You Like to Upload Your Slides?</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="askDialogVisible = false; askedNotUpload=true">No</el-button>
                <el-button type="primary" @click="askDialogVisible = false; onClickUpload()">Yes</el-button>
            </span>
        </el-dialog>
        <el-dialog title="Upload Slides" :visible.sync="dialogUpVisible" :show-close=false>
            <el-upload
                class="upload-slides"
                ref="upload"
                drag
                action=""
                :auto-upload = "false"
                :on-change="handleChange"
                :file-list="fileList"
                :on-remove="handleRemove">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">Drag Files to Here, or<em> Select Files</em></div>
                <div class="el-upload__tip" slot="tip">Only Accept One File. Selecting a New File will Replace the Last Selected File.</div>
            </el-upload>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogUpVisible = false; askedNotUpload = true">Cancel</el-button>
                <el-button type="primary" @click="submitUpload">Upload</el-button>
            </div>
        </el-dialog>
    <el-row class="l1">
            <el-col :span="12">
            <i v-if="haveStarted()&&!havePaused()" class="el-icon-camera-solid"> Recording</i>
            <i v-if="haveStarted()&&havePaused()" class="el-icon-camera-solid"> Paused</i>
            </el-col>
            <el-col :span="12" class="timer">
            <div v-if="haveStarted()" class="timerin"><i class="el-icon-timer"></i></div>
            &nbsp;&nbsp;
            <div v-if="haveStarted()" class="timerin" ref="startTimer"> 00:00:00 </div>
            </el-col>
    </el-row>
    <el-row class="l2">
        <el-alert
            style="position: absolute; z-index: 10;"
            v-if="haveStarted()&&havePaused()"
            title="Practice Paused"
            type="info"
            center
            show-icon>
        </el-alert>
        <div v-if="haveUploaded()" class="block" style="height: 100%">
            <el-carousel trigger="click" :autoplay="false" height="540px">
            <el-carousel-item v-for="item in imgList" :key="item.id">
                <el-row>
                    <el-col :span="24"><img ref="imgHeight" :src="item.idView" class="banner_img"/></el-col>
                </el-row>
            </el-carousel-item>
            </el-carousel>
        </div>
        <div v-if="haveAsked()" class="mock" style="height: 100%"></div>
    </el-row>
    <el-row class="l3">
        <el-button v-if="!haveStarted()" class="btl" type="danger" @click="onClickCancel">Cancel</el-button>
        <el-button v-if="!haveStarted()" type="success" @click="onClickStartAsk">Start</el-button>

        <el-button v-if="haveStarted()" type="danger" @click="onClickQuit">Quit</el-button>
        <el-button v-if="haveStarted()&&!havePaused()" type="primary" @click="onClickPause">Pause</el-button>
        <el-button v-if="haveStarted()&&havePaused()" type="primary" @click="onClickResume">Resume</el-button>
        <el-button v-if="haveStarted()" type="success" @click="onClickFinish()">Finish</el-button>
    </el-row>
    </el-main>
  </el-container>
</template>
<script>

export default {
    name: 'PracticeReadyPage',
    props:{
      time:{
        type:Number
      }
    },  
    data() {
      return {
          fileList: [],
          askDialogVisible: true,
          dialogUpVisible: false,
          activeIndex: '1',
          started: false,
          uploaded: false,
          askedNotUpload:false,
          paused: false,
          timer: "",
          hour: 0,
          minutes: 0,
          seconds: 0,
          cr: '',
          imgList: [
            {id: 0, name:'0', idView: require('../assets/slide1.jpeg')},
            {id: 1, name: '1', idView: require('../assets/slide2.jpeg')},
            {id: 2, name: '2', idView: require('../assets/slide3.jpeg')},
            {id: 3, name: '3', idView: require('../assets/slide4.jpeg')},
            {id: 4, name: '4', idView: require('../assets/slide5.jpeg')}
          ]
        }
    },
    created() {
        this.$store.dispatch('user/uploaded',false)
                    .then(() => {})
                    .catch(() => {})
    },
    methods: {
        handleSelect(key) {
            if (key === '1') {
                this.onClickHome()
            } else if (key === '2') {
                this.onClickProfile('info','1')
            } else if (key === '3') {
                this.onClickUpload()
            } else {
                this.onClickLogout()
            }
        },
        submitUpload() {
            if (this.fileList.length == 0) {
                this.$message({
                type: 'warning',
                message: 'Please Select a File to Upload!'
                });
            } else {
                this.$message({
                type: 'success',
                message: 'Upload Success'
                });
                this.dialogUpVisible = false
                this.uploaded = true
                this.$store.dispatch('user/uploaded',true)
                    .then(() => {})
                    .catch(() => {})
            }
        },
        handleRemove() {
            if (this.fileList.length > 0) {
                this.fileList = []
            }
        },
        handleChange(file, fileList) {
            if (fileList.length > 0) {
                this.fileList = [fileList[fileList.length - 1]]  //展示最后一次选择de文件
            }
        },
        onClickStartAsk() {
            this.$confirm('1. We would record your presentation for playback.<br>2. Your facial expression would be analyzed for emotion recognition.<br>3. Your heart rate will be collected and analyzed for emotion recognition.', 'Note', {
                confirmButtonText: 'Confirm',
                cancelButtonText: 'Cancel',
                showClose:false,
                dangerouslyUseHTMLString:true,
                type: 'warning',
                center: true
                }).then(() => {
                this.connectBlue()
                }).catch(() => {
                this.onClickCancel()
                });
        },
        connectBlue() {
            this.$confirm('<br><p><i class="el-icon-watch-1"></i>Wanli\'s Apple Watch</p><br><p><i>*Your device is required for starting practice and will be used for heart rate collection. By cancel, you will quit this practice.</i> </p>', 'Please Connect Your Watch', {
            confirmButtonText: 'Connect',
            cancelButtonText: 'Cancel',
            showClose:false,
            dangerouslyUseHTMLString: true,
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: 'Practice Started'
                });
                this.started = true;
                this.start()
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: 'Quit Current Practice'
                });          
            });
        },
        haveUploaded() {
            return this.uploaded === true;
        },
        haveAsked() {
            return this.askedNotUpload === true;
        },
        haveStarted() {
            return this.started === true;
        },
        havePaused() {
            return this.paused === true;
        },
        onClickCancel() {
            this.$confirm('Uploaded slides won\'t be kept? Still cancel?', 'Warning', {
                confirmButtonText: 'Yes, Cancel',
                cancelButtonText: 'No',
                showClose:false,
                dangerouslyUseHTMLString:true,
                type: 'warning',
                center: true
                }).then(() => {
                this.$message({
                    type: 'info',
                    message: 'Practice Canceled'
                });
                this.$router.push('/');
                }).catch(() => {
                });
        },
        onClickQuit() {
            this.stop()
            this.$confirm('On quit, no record will be left. Still quit?', 'Warning', {
                confirmButtonText: 'Yes, Quit',
                cancelButtonText: 'No',
                showClose:false,
                dangerouslyUseHTMLString:true,
                type: 'warning',
                center: true
                }).then(() => {
                this.$message({
                    type: 'info',
                    message: 'Quit Current Practice'
                });
                this.started = false;
                }).catch(() => {
                    this.paused = true;
                });
        },
        onClickFinish() {
            this.stop()
            this.$confirm('Finish this practice and get feedback?', 'Warning', {
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
                showClose:false,
                dangerouslyUseHTMLString:true,
                type: 'warning',
                center: true
                }).then(() => {
                    this.openLoading()
                }).catch(() => {
                    this.paused = true;
                });
        },
        openLoading() {
            const loading = this.$loading({
            lock: true,
            text: 'Analyzing Performance and Generating Feedback...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
            });
            setTimeout(() => {
            loading.close();
            this.$message({
                    type: 'success',
                    message: 'Practice Finished'
            });
            this.$router.push('/feedback')
            }, 2500);
        },
        onClickPause() {
            this.paused = true;
            this.stop();
        },
        onClickResume() {
            this.paused = false;
            this.start();
        },
        onClickUpload() {
            this.dialogUpVisible = true;
        },
        onClickHome() {
            this.$confirm('Uploaded slides won\'t be kept. Still cancel this practice?', 'Warning', {
                confirmButtonText: 'Yes, Cancel',
                cancelButtonText: 'No',
                showClose:false,
                dangerouslyUseHTMLString:true,
                type: 'warning',
                center: true
                }).then(() => {
                this.$message({
                    type: 'info',
                    message: 'Practice Canceled'
                });
                this.$router.push('/');
                }).catch(() => {
                });
        },
        onClickProfile() {
            this.$router.push('profile')
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
        startTimer() {
            this.seconds += 1;
            if (this.seconds >= 60) {
                this.seconds = 0;
                this.minutes = this.minutes + 1;
            }

            if (this.minutes >= 60) {
                this.minutes = 0;
                this.hour = this.hour + 1;
            }
            this.$refs.startTimer.innerHTML = (this.hour < 10 ? '0' + this.hour: this.hour) + ':' + (this.minutes < 10 ? '0' + this.minutes: this.minutes) + ':' + (this.seconds < 10 ? '0' + this.seconds: this.seconds);
            this.cr =  this.seconds
        },
        stop () {
            clearInterval(this.timer)
        },
        start () {
            this.timer = setInterval(this.startTimer, 1000)
        }
    }

} 
</script>
<style scoped>
    .l1, .l3 {
        background-color: #B3C0D1;
        color: #333;
        height: 15%;
        padding-top: 3%;
    }
    .timer {
        text-align: center;
    }
    .timerin {
        display: inline;
    }
    .btl {
        margin-right: 20%;
    }
    .l2 {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        height: 70%;
    }
    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 150px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }
  
    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }

    .mock {
        margin: auto;
        width: 70%;
        background: url(../assets/classroom.jpeg);
        background-size: cover;
    }

    .pause {
        margin: auto;
        background: url(../assets/pause.png);
    }
    /*<div class="Info" v-if="selectedBlue()">
          <el-row class="blueContainer">
         <table>
            <thead>
                <tr>
                <th class="img">
                </th>
                <th class="item-title">
                </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>
                  Wanli's iPhone
                </td>
                <td >
                  <el-button v-if="!hasConnected1()" type="primary" round @click="onClickConnect1()">Connect</el-button> <el-button v-if="hasConnected1()" type="danger" round @click="onClickDisconnect1()">Disconnect</el-button> 
                </td>
                </tr>
                <tr>
                <td>
                  Zhihe's Apple Watch
                </td>
                <td >
                  <el-button v-if="!hasConnected2()" type="primary" round @click="onClickConnect2()">Connect</el-button> <el-button v-if="hasConnected2()" type="danger" round @click="onClickDisconnect2()">Disconnect</el-button>
                </td>
                </tr>
                 <tr>
                <td>
                  Tesla Model X
                </td>
                <td >
                  <el-button type="primary" round @click="onClickConnect3()">Connect</el-button>
                </td>
                </tr>
            </tbody>
        </table>
          </el-row>
        </div>
        */

</style>
