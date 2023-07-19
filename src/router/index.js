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
import { Message, Notification } from 'element-ui'
import store from '../store'
// 引入进度条
import nprogress from 'nprogress'

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
            component: () => import(/* webpackChunkName: "Home" */'@/pages/Home'),
            meta: { show: true, needToken: false }
        },
        {
            name: 'search',
            path: '/search/:keyword?',
            component: () => import(/* webpackChunkName: "Search" */'@/pages/Search'),
            meta: { show: true, needToken: false }
        },
        {
            name: 'good',
            path: '/good/:goodId?',
            component: () => import(/* webpackChunkName: "Good" */'@/pages/Good'),
            meta: { show: true, needToken: false }
        },
        {
            name: 'order',
            path: '/order',
            component: () => import(/* webpackChunkName: "Order" */'@/pages/Order'),
            meta: { show: true, needToken: true }
        },
        {
            path: '/service',
            component: () => import(/* webpackChunkName: "Service" */'@/pages/Service'),
            meta: { show: false, needToken: false },
            children: [
                {
                    path: 'login',
                    component: () => import(/* webpackChunkName: "ServiceLogin" */'@/pages/Service/Login'),
                    meta: { show: false, needToken: false }
                },
                {
                    path: 'phoneLogin',
                    component: () => import(/* webpackChunkName: "ServicePhoneLogin" */'@/pages/Service/phoneLogin'),
                    meta: { show: false, needToken: false }
                },
                {
                    path: 'register',
                    component: () => import(/* webpackChunkName: "ServiceRegister" */'@/pages/Service/Register'),
                    meta: { show: false, needToken: false }
                },
                {
                    path: 'forget',
                    component: () => import(/* webpackChunkName: "ServiceForget" */'@/pages/Service/Forget'),
                    meta: { show: false, needToken: false }
                }
            ]
        },
        {
            path: '/userInfo',
            component: import(/* webpackChunkName: "userInfo" */'@/pages/userInfo'),
            meta: { show: true, needToken: true },
            children: [
                {
                    path: 'user',
                    component: import(/* webpackChunkName: "User" */'@/pages/userInfo/user'),
                    meta: { show: true, needToken: true }
                },
                {
                    path: 'rePassWord',
                    component: import(/* webpackChunkName: "RePassWord" */'@/pages/userInfo/rePassWord'),
                    meta: { show: true, needToken: true }
                },
                {
                    path: 'userAddress',
                    component: import(/* webpackChunkName: "UserAddress" */'@/pages/userInfo/userAddress'),
                    meta: { show: true, needToken: true }
                }
            ]
        },
        {
            path: '/service/feedback',
            component: import(/* webpackChunkName: "FeedBack" */'@/pages/Service/FeedBack'),
            meta: { show: true, needToken: true }
        },
        {
            path: '/message',
            component: import(/* webpackChunkName: "Message" */'@/pages/message'),
            meta: { show: true, needToken: true }
        },
        {
            path: '/shoppingcart',
            component: import(/* webpackChunkName: "ShoppingCart" */'@/pages/ShoppingCart'),
            meta: { show: true, needToken: true }
        },
        {
            path: '/404',
            component: import(/* webpackChunkName: "NotFound" */'@/components/NotFound'),
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

router.afterEach(() => {
    window.scrollTo(0, 0)
})
router.beforeEach(async(to, from, next) => {
    nprogress.start()
    const token = Cookie.getCookie('token')
    // console.log('token:' + token)
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
                    next()
                } catch (err) {
                    if (err === '权限错误') {
                        Notification.error({
                            title: '错误',
                            message: '权限错误，已退出！'
                        })
                    } else {
                        Notification.error({
                            title: '错误',
                            message: '获取用户信息失败，已退出，请重新登录！'
                        })
                    }
                    // remove token and go to login page to re-login
                    await store.commit('QUIT')
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
