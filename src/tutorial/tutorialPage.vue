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
        <el-menu-item index="4" >General Advices</el-menu-item>
        <el-menu-item index="5" >Emotion Managements</el-menu-item>
        <el-menu-item index="6" >Interacting with Audiences</el-menu-item>
        <el-menu-item index="7" >Creating Slides</el-menu-item>
        <el-menu-item index="8" >Others</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="15" class="context">
            <h3 class="title">Hi {{this.$store.getters.name}}, Find the Best Tutorials Here!</h3>
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
            selectedContent: 'None',
            search: '',
            tutorials: [[{name:'TEDs secret to great public speaking | Chris Anderson',duration:'7:56',link:'https://youtube.com/watch?v=-FOCpMAww28',img:'1.1.png'},{name:'How to give the BEST PowerPoint presentation!',duration:'8:56',link:'https://www.youtube.com/watch?v=eHhqWbI0y4M',img:'1.2.png'},{name:'How To Give a Killer Presentation - With No Notes',duration:'7:10',link:'https://www.youtube.com/watch?v=gaoxXFju6uo',img:'1.3.png'}],[{name:'The art of managing emotions | Daniel Goleman | WOBI',duration:'8:45',link:'https://www.youtube.com/watch?v=FKjj1tNcbtM',img:'2.1.jpeg'}],[{name:'How to Engage an Audience in a Presentation',duration:'5:37',link:'https://www.youtube.com/watch?v=4IG-8P7refs',img:'3.1.jpeg'}],[{name:'13 Presentation Design Tips to Create an Awesome Slide Deck',duration:'9:15',link:'https://www.youtube.com/watch?v=wlY65y5Dj2g',img:'4.1.jpeg'}],[{name:'Using App to Help Practice Your Presentation',duration:'3:18',link:'https://www.youtube.com/watch?v=XtrmUDXe6is',img:'presentation.jpeg'}]]
        }
    },
    created() {
    },
    computed: {
        availableTutorials() {
            return this.tutorials[this.selectedContent];
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
                    this.selectedContent = '0'
                } else if (key === '5') {
                    this.selectedContent = '1'
                } else if (key === '6') {
                    this.selectedContent = '2'
                } else if (key === '7') {
                    this.selectedContent = '3'
                } else {
                    this.selectedContent = '4'
                }
        },
        selectedTutorial() {
            return this.selectedContent !== 'None';
        },
        onClickPlay() {
            this.$router.push('/tutorials/play');
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
</style>