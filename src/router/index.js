/*
 * @Author: zhilutianji
 * @Date: 2022-01-02 20:17:15
 * @LastEditors: zhilutianji
 * @LastEditTime: 2022-01-12 14:49:17
 * @Description: file content
 * @FilePath: \shops_frontend_web\src\router\index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Cookie from '../../utils/cookie'
import { Message } from 'element-ui'
import store from '../store'
// 引入进度条
import nprogress from 'nprogress'

import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Service/Login'
import Register from '@/pages/Service/Register'
import NotFound from '@/components/NotFound'
import Service from '@/pages/Service'
import Forget from '@/pages/Service/Forget'
import FeedBack from '@/pages/Service/FeedBack'
import MessagePage from '@/pages/message'
import UserInfo from '@/pages/userInfo'
import User from '@/pages/userInfo/user'
import Address from '@/pages/userInfo/Address'
import PhoneLogin from '@/pages/Service/phoneLogin'
import ShoppingCart from '@/pages/ShoppingCart'
// 使用插件
Vue.use(VueRouter)

// 1、先把VueRouter原型对象的push，保存一份
const originPush = VueRouter.prototype.push
// 2、重写push|replace
// 第一个参数：告诉原来的push，跳转的目标位置和传递了哪些参数
VueRouter.prototype.push = function(location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => {}, () => {})
    }
}

// 配置路由
const router = new VueRouter({
    mode: 'history',
    // 配置路由
    routes: [
        {
            name: 'home',
            path: '/home',
            component: Home,
            meta: { show: true, needToken: false }
        },
        {
            name: 'search',
            path: '/search/:keyword?',
            component: Search,
            meta: { show: true, needToken: false }
        },
        {
            path: '/service',
            component: Service,
            meta: { show: false, needToken: false },
            children: [
                {
                    path: 'login',
                    component: Login,
                    meta: { show: false, needToken: false }
                },
                {
                    path: 'phoneLogin',
                    component: PhoneLogin,
                    meta: { show: false, needToken: false }
                },
                {
                    path: 'register',
                    component: Register,
                    meta: { show: false, needToken: false }
                },
                {
                    path: 'forget',
                    component: Forget,
                    meta: { show: false, needToken: false }
                }
            ]
        },
        {
            path: '/userInfo',
            component: UserInfo,
            meta: { show: true, needToken: true },
            children: [
                {
                    path: '/userInfo/user',
                    component: User,
                    meta: { show: true, needToken: true }
                },
                {
                    path: 'address',
                    component: Address,
                    meta: { show: true, needToken: true }
                }
            ]
        },
        {
            path: '/service/feedback',
            component: FeedBack,
            meta: { show: true, needToken: true }
        },
        {
            path: '/message',
            component: MessagePage,
            meta: { show: true, needToken: true }
        },
        {
            path: '/shoppingcart',
            component: ShoppingCart,
            meta: { show: true, needToken: true }
        },
        {
            path: '/404',
            component: NotFound,
            meta: { show: false, needToken: false }
        },
        // 重定向
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
router.beforeEach(async(to, from, next) => {
    nprogress.start()
    const token = Cookie.getCookie('token')
    console.log(token)
    if (token) { // 如果已经登录，那我不干涉你，让你随便访问
        if (to.path === '/login') {
            // if is logged in, redirect to the home page
            nprogress.done()
            next({ path: '/' })
        } else {
            const hasGetUserInfo = store.state.user.userName
            if (hasGetUserInfo) {
                nprogress.done()
                next()
            } else {
                try {
                    await store.dispatch('getInfo')
                    nprogress.done()
                } catch (err) {
                    // remove token and go to login page to re-login
                    await store.commit('QUIT')
                    Message.error('获取用户信息失败，请重新登录！')
                    nprogress.done()
                    next(`/service/login`)
                }
            }
        }
    } else {
        if (to.meta.needToken !== false) {
            // 如果没有登录，但你访问其他需要登录的页面，那我就让你跳到登录页面去
            Message.warning('未登录，请先登录')
            nprogress.done()
            next({ path: '/service/login' })
        } else {
            // 如果没有登录，但你访问的不需要登录的页面，那就不干涉你，让你访问
            nprogress.done()
            next()
        }
    }
})
export default router
