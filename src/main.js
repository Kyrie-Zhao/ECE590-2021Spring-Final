import Vue from 'vue';
import ElementUI from 'element-ui';
import VueCryptojs from 'vue-cryptojs'
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router'
import store from './store'
import VideoPlayer from 'vue-video-player'
import 'vue-video-player/src/custom-theme.css'
import 'video.js/dist/video-js.css'
import './fonts/elm-icon.css'
import echarts from 'echarts'


  
Vue.use(ElementUI);
Vue.use(VueCryptojs)
Vue.use(VideoPlayer)
Vue.prototype.$echarts = echarts


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});