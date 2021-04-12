<template>
  <el-container class="ShopPageContainer">
      <el-header>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1"><i class="el-icon-s-home"></i></el-menu-item>
        <el-menu-item index="2"><i class="el-icon-user-solid"></i></el-menu-item>
        <el-menu-item index="3" class="right-menu-2">Log Out</el-menu-item>
      </el-menu>
      </el-header>
      <el-main>
      <el-col :span="6" class="nav">
        <el-menu :default-active="activeIndex" class="el-menu-v" @select="handleSelectV">
        <el-menu-item index="4" >Emotion and Heart Rate Timelines</el-menu-item>
        <el-menu-item index="5" >Summary of Feedback</el-menu-item>
        <el-menu-item index="6" >Recommended Tutorials</el-menu-item>
        <el-menu-item index="7" >Practice Playback</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="15" class="context">
            <h3 class="title">Hi {{this.$store.getters.name}}, Check Feedback Here!</h3>
            <table v-if="selectedTutorial()">
            <thead>
                <tr>
                <th class="img">
                </th>
                <th class="item-title">
                    Tutorial
                </th>
                <th class="cost">
                    Duration
                </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(tutorial, index) in availableTutorials" :key="index">
                <td class="img">
                    <img :src="require('../assets/'+tutorial.img)" height="50px" width="80px">
                </td>
                <td class="item-title">
                    <a v-bind:href="tutorial.link">{{tutorial.name}}</a>
                </td>
                <td class="cost">
                    {{tutorial.duration}}
                </td>
                </tr>
            </tbody>
        </table>

        <table style="width:100%;">
            <thead></thead>
            <tbody>
                <tr>
                    <div v-show="selectedTimeline()" id="myChart1" class="chart" :style="{width: '100%', height: '300px'}"></div>
                </tr>
                <tr>
                    <div v-show="selectedTimeline()" id="myChart2" class="chart" :style="{width: '100%', height: '300px'}"></div>
                </tr>
            </tbody>
        </table>

        <el-collapse large v-if="selectedFeedback()" v-model="activeNames">
            <el-collapse-item name="1">
            <template slot="title">
            <i class="el-icon-mic"> Voice: Too High</i>
            </template>
                <div class="summary">
                <p>
                <i class="el-icon-location">0:03-0:10</i> &nbsp; &nbsp;
                <i v-if="hasUploaded()" class="el-icon-location">Slide 1</i>
                </p>
                <p><i class="el-icon-video-camera-solid"></i><el-button type="text" @click="onClickJumpVideo(3)"> Check this problem in playback video</el-button></p>
                <p><i class="el-icon-star-on">High volume typically means important contents or intense emotions for audience. Abuse of high volume will make your presentation lack of emphasis and make your audience feel tired quickly.</i></p>
                <p><i class="el-icon-star-on">Choose a good time to use high volume, for example, when you would like to put some emphasis on certain content.</i></p>
                <p><i class="el-icon-star-on">Properly adjust your microphone if you have one.</i></p>
                </div>
            </el-collapse-item>
            <el-collapse-item name="2">
                <template slot="title">
                <i class="el-icon-odometer"> Speed: Too Fast</i>
                </template>
                <div class="summary">
                <p>
                <i class="el-icon-location">0:15-0:20</i> &nbsp; &nbsp;
                <i v-if="hasUploaded()" class="el-icon-location">Slide 3</i>
                </p>
                <p><i class="el-icon-video-camera-solid"></i><el-button type="text" @click="onClickJumpVideo(15)"> Check this problem in playback video</el-button></p>
                <p><i class="el-icon-star-on">A fast speed of speaking can be difficult for the listener to absorb the material.  Speaking too fast will make your presentation sounds pale.</i></p>
                <p><i class="el-icon-star-on">A good rate of speech ranges between 140 -160 words per minute (wpm).</i></p>
                </div>
            </el-collapse-item>
        </el-collapse>

        <div v-if="selectedPlayback()" class='player'>
            <video-player class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true" :options="playerOptions"
            @ready="playerReadied($event)"
            @timeupdate="onPlayerTimeupdate($event)">
            </video-player>
            <br>
            <el-button v-if="hasUploaded()" type="primary" @click="onClickChangeUrl()">View {{this.playing}}</el-button>
        </div>
      </el-col>
      </el-main>
  </el-container>
</template>
<script>
export default {
    name: 'TutorialPage',
    data() {
        return {
            activeIndex: '1',
            selectedContent: 'Timeline',
            search: '',
            playPresenter: true,
            playTime: null,
            startTime: 0,
            nowTime: 0,
            playing: 'Slides',
            uploaded: false,
            activeNames: ['1', '2'],
            tutorials: [{name:'The art of managing emotions | Daniel Goleman | WOBI',duration:'8:45',link:'https://www.youtube.com/watch?v=FKjj1tNcbtM',img:'2.1.jpeg'},{name:'TEDs secret to great public speaking | Chris Anderson',duration:'7:56',link:'https://youtube.com/watch?v=-FOCpMAww28',img:'1.1.png'},{name:'How To Give a Killer Presentation - With No Notes',duration:'7:10',link:'https://www.youtube.com/watch?v=gaoxXFju6uo',img:'1.3.png'}],
            playerOptions: {
              playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
              autoplay: false, // 如果为true,浏览器准备好时开始回放。
              muted: false, // 默认情况下将会消除任何音频。
              loop: false, // 是否视频一结束就重新开始。
              preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
              aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
              fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
              sources: [{
                  type: "video/mp4", // 类型
                  src: require('../assets/presenter.mp4') // url地址
              }],
              notSupportedMessage: 'Can\'t Play Video', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
              controlBar: {
                  timeDivider: true, // 当前时间和持续时间的分隔符
                  durationDisplay: true, // 显示持续时间
                  remainingTimeDisplay: false, // 是否显示剩余时间功能
                  fullscreenToggle: true // 是否显示全屏按钮
              }
        }
        }
    },
    created() {
        this.uploaded = this.$store.getters.uploaded
    },
    mounted () { 
        this.loadLine()
    },
    computed: {
        availableTutorials() {
            return this.tutorials;
        }
    },
    methods: {
        handleSelect(key) {
            if (key === '1') {
                this.onClickHome()
            } else if (key === '2') {
                this.onClickProfile('info','1')
            } else {
                this.onClickLogout()
            }
        },
        handleSelectV(key) {
                if (key === '4') {
                    this.selectedContent = 'Timeline'
                } else if (key === '5') {
                    this.selectedContent = 'Feedback'
                } else if (key === '6') {
                    this.selectedContent = 'Tutorial'
                } else {
                    this.selectedContent = 'Playback'
                }
        },
        hasUploaded() {
            return this.uploaded;
        },
        selectedTimeline() {
            return this.selectedContent === 'Timeline';
        },
        selectedTutorial() {
            return this.selectedContent === 'Tutorial';
        },
        selectedFeedback() {
            return this.selectedContent === 'Feedback';
        },
        selectedPlayback() {
            return this.selectedContent === 'Playback';
        },
        onClickHome() {
            this.$router.push('/');
        },
        onClickProfile() {
            this.$router.push('profile')
        },
        onClickCheck(name) {
            this.$router.push({ name: 'Buy', params: { name: name } })
        },
        onClickSearch() {
            console.log('search')
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
        onClickChangeUrl() {
            this.startTime = this.nowTime;
            if (this.playPresenter) {
                this.playerOptions['sources'][0]['src'] = require('../assets/slides.mp4');
                this.playPresenter = false;
                this.playing = 'Presenter'
            } else {
                this.playerOptions['sources'][0]['src'] = require('../assets/presenter.mp4');
                this.playPresenter = true;
                this.playing = 'Slides'
            }
        },
        onPlayerTimeupdate(player) {
            this.nowTime = player.currentTime()
        },
        playerReadied(player) {
            player.currentTime(this.startTime);
            this.startTime = 0;
        },
        onClickJumpVideo(time) {
            this.startTime = time;
            this.activeIndex = '7';
            this.selectedContent = 'Playback';
            this.playerOptions['sources'][0]['src'] = require('../assets/presenter.mp4');
        },
        loadLine() {
            this.$nextTick(()=>{
                let echarts = require('echarts');
            const option = {
                title: {
					text: 'Emotion Timeline',
					left:'center'
				},
                xAxis: {
                type: 'category',
                data: ['0:00','0:01','0:02','0:03','0:04','0:05','0:06','0:07','0:08','0:09','0:10','0:11','0:12','0:13','0:14','0:15','0:16','0:17','0:18','0:19','0:20','0:21','0:22','0:23','0:24','0:25','0:26','0:27','0:28','0:29','0:30'],
                boundaryGap: false,
                },
                yAxis: {
                type: 'category',
                data: ['Angry','Sad','Neutral','Happy','Suprised'],
                },
                series: [{
                data: ['Happy', 'Happy', 'Happy', 'Neutral', 'Neutral', 'Neutral', 'Neutral', 'Happy', 'Happy', 'Neutral', 'Neutral', 'Happy', 'Neutral', 'Happy', 'Happy', 'Neutral', 'Neutral', 'Happy', 'Neutral', 'Happy', 'Neutral', 'Happy', 'Neutral', 'Neutral', 'Happy', 'Happy', 'Happy', 'Neutral', 'Happy', 'Happy', 'Neutral'],
                name: 'click to jump to this point in playback',
                type: 'line',
                smooth: 0.3,
                }],
                tooltip: {
                trigger: 'item',
                }
            }
            this.myChartOne = echarts.init(document.getElementById('myChart1'))
            this.myChartOne.setOption(option)
            this.myChartOne.on('click', param => {
                let time = Number(param.name.substring(2));
                this.startTime = time;
                this.activeIndex = '7';
                this.selectedContent = 'Playback';
                this.playerOptions['sources'][0]['src'] = require('../assets/presenter.mp4');
            });
            })

            let echarts = require('echarts');
            const option = {
                title: {
					text: 'Heart Rate Timeline',
					left:'center'
				},
                xAxis: {
                type: 'category',
                data: ['0:00', '0:05', '0:10', '0:15', '0:20', '0:25', '0:30'],
                boundaryGap: false,
                },
                yAxis: {
                type: 'value',
                scale:true
                },
                series: [{
                data: [85, 75, 80, 76, 85, 80, 82],
                name: 'click to jump to this point in playback',
                type: 'line',
                smooth: 0.3,
                itemStyle : { 
                    normal: {
                        label : {show: true},
                        color: "#000000",//折线点的颜色
                        lineStyle:{ 
                            color:'#FF0000' //改变折线颜色
                        }
                    }, 
                    }
                }],
                tooltip: {
                    trigger: 'item',
                },
            }
            this.myChartTwo = echarts.init(document.getElementById('myChart2'))
            this.myChartTwo.setOption(option)
            this.myChartTwo.on('click', param => {
                let time = Number(param.name.substring(2));
                this.onClickJumpVideo(time);
            });
        }
    }
} 
</script>
<style scoped>
    .el-main {
        height: 100%;
    }
    .el-col {
        height: 100%;
    }
    .el-menu-v {
        height: 100%;
    }
    .context {
        padding-left: 10%;
    }
    .search {
        width: 50%;
        margin-left: auto;
        margin-right: auto;
        margin-top: 5%;
        margin-bottom: 5%;
    }
    table {
        margin-left: auto;
        margin-right: auto;
    }
    td, th {
        padding: 5px;
    }
    .item-title {
        text-align: left;
        width: 80%;
    }
    .cost {
        text-align: center;
        width: 10%;
    }
    .player {
        height: 100%;
        width: 100%;
        margin: auto;
        padding-top: 5%;
    }
    .summary {
        text-align: left;
        display: inline-block;
        font-size: 12pt;
    }
</style>