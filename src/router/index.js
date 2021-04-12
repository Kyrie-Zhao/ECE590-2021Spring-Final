import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '../components/HomePage.vue';
import LoginPage  from '../login/loginPage.vue';
import RegisterPage  from '../registration/registerPage.vue';
import ProfilePage from '../profile/profilePage.vue'
import TutorialPage from '../tutorial/tutorialPage.vue'
import PlayPage from '../tutorial/play.vue'
import PracticeReadyPage from '../practice/practiceReadyPage.vue'
import FeedbackPage from '../feedback/feedbackPage.vue'
import store from '../store';

Vue.use(Router);
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

const checkAuthenticated = (to, from, next) => {
  const { authorize } = to.meta;
  if (authorize.length > 0 && !authorize.includes(store.getters.role)) {
    next('/')
    return
  }
  if (to.path === '/login' || to.path === '/register' || to.path === '/business/register') {
    if (store.getters.islogin === 'undefined' || store.getters.islogin === undefined) {
      next()
    } else {
      next('/')
    }
    return
  }
  if (store.getters.islogin === 'undefined' || store.getters.islogin === undefined) {
    next('/login')
    return
  }
  next()
}

export const constantRoutes = [
  {
    path: '/',
    name: 'Home',
    components: {
      default: HomePage,
    },
    meta: { authorize: [] } 
  }, {
    path: '/login',
    name: 'Login',
    beforeEnter: checkAuthenticated,
    components: {
      default: LoginPage,
    },
    meta: { authorize: [] }
  }, {
    path: '/register',
    name: 'Register',
    beforeEnter: checkAuthenticated,
    components: {
      default: RegisterPage,
    },
    meta: { authorize: [] }
  }, {
    path: '/profile',
    beforeEnter: checkAuthenticated,
    component: ProfilePage,
    name: 'Profile',
    meta: { authorize: [] }
  },{
    path: '/tutorials',
    name: 'Tutorials',
    beforeEnter: checkAuthenticated,
    components: {
      default: TutorialPage,
    },
    meta: { authorize: [] }
  },{
    path: '/tutorials/play',
    name: 'Play',
    beforeEnter: checkAuthenticated,
    components: {
      default: PlayPage,
    },
    meta: { authorize: [] }
  },{
    path: '/practice',
    name: 'Prepare',
    beforeEnter: checkAuthenticated,
    components: {
      default: PracticeReadyPage,
    },
    meta: { authorize: [] }
  },{
    path: '/feedback',
    name: 'Peedback',
    beforeEnter: checkAuthenticated,
    components: {
      default: FeedbackPage,
    },
    meta: { authorize: [] }
  },{ path: '*', redirect: '/' }
]
export default new Router({
    mode: 'hash',
    routes: constantRoutes
});
