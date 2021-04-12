import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'
//import * as session from '@/utils/sessionData'

Vue.use(Vuex);

const modulesFiles = require.context('./modules', true, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

export default new Vuex.Store({
  plugins: [createPersistedState({ storage: window.sessionStorage })],
  getters: {
    islogin: (state) => {
      return state.user.isLogin
    },
    name: (state) => {
      return state.user.name
    },
    email: (state) => {
      return state.user.email
    },
    addRoutes: state => state.permission.addRoutes,
    routes: state => state.permission.routes,
    cart: state => state.cart.cart,
    order: state => state.cart.order,
    items: state => state.category.items,
    key: state => state.permission.vuepsw,
    uploaded: state => state.user.uploaded,
  },
  modules
});
