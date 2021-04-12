//import {getPsw, setPsw} from '@/utils/authTool'
//import * as session from '@/utils/sessionData'

//import { resolve } from "core-js/fn/promise"

const state = {
    nil: '',
    users: [],
    name: '',
    email: '',
    isLogin: undefined,
    uploaded: false,
}
const mutations = {
    ADD_USER: (state,user) => {
        state.users.push(user)
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_EMAIL: (state, email) => {
        state.email = email
    },
    RESET_USER: (state) => {
        state.name = ''
        state.email = ''
    },
    SET_ISLOGIN: (state, isLogin) => {
        state.isLogin = isLogin
    },
    REMOVE_ISLOGIN: (state) => {
        state.isLogin = undefined
    },
    SET_UPLOADED: (state, uploaded) => {
        state.uploaded = uploaded
    }
}
const actions = {
    login({commit,state}, userPwd) {
        const { username, password } = userPwd
        return new Promise((resolve,reject) => {
            let existUser
            for (let i = 0; i < state.users.length; i++) {
                existUser = state.users[i]
                if (existUser.username === username && existUser.password === password) {
                    commit('SET_ISLOGIN', true)
                    commit('SET_NAME', username)
                    commit('SET_EMAIL', existUser.email)
                    resolve()
                }
            }
            reject('Wrong Username/Password!')
        })
    },
    register({commit,state}, userInfo) {
        const {username, email} = userInfo
        return new Promise((resolve,reject) => {
            let existUser
            for (let i = 0; i < state.users.length; i++) {
                existUser = state.users[i]
                if (existUser.username === username || existUser.email === email) {
                    reject('Username/Email Already Registered, Please Use a New One')
                    return
                }
            }
            commit('ADD_USER',userInfo)
            commit('SET_ISLOGIN',true)
            commit('SET_NAME', username)
            commit('SET_EMAIL', email)
            resolve()
            return
        })
    },
    logout({commit}) {
        return new Promise((resolve) => {
            commit('REMOVE_ISLOGIN')
            commit('RESET_USER')
            resolve()
        })
    },
    uploaded({commit}, uploaded) {
        return new Promise((resolve) => {
            commit('SET_UPLOADED',uploaded)
            resolve()
        })
    }
}
    /*
    login({commit}, userPwd) {
        const { username, password } = userPwd
        return new Promise((resolve,reject) => {
            var savedPsw = getPsw()
            if (password === savedPsw) {
                commit('SET_NAME', username)
                commit('SET_EMAIL', username+'@test.com')
                commit('SET_ISLOGIN', true)
                resolve()
            } else {
                reject('Wrong Username/Password!')
            }
        })
    },
    register({commit}, userInfo) {
        const { username, email, password} = userInfo
        return new Promise((resolve) => {
            commit('SET_NAME',username)
            commit('SET_EMAIL',email)
            commit('SET_ISLOGIN',true)
            setPsw(password)
            resolve()
        })
    },
    logout({commit}) {
        return new Promise((resolve) => {
            commit('REMOVE_ISLOGIN')
            commit('RESET_USER')
            resolve()
        })
    }
    */
export default {
    namespaced: true,
    state,
    mutations,
    actions
}