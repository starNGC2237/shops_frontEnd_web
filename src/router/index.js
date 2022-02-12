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
        originPush.call(this, location, () => {
        }, () => {
        })
    }
}

import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import NotFound from '@/components/NotFound'

// 配置路由
export default new VueRouter({
    mode: 'history',
    // 配置路由
    routes: [
        {
            path: '/home',
            component: Home,
            meta: { show: true }
        },
        {
            name: 'search',
            path: '/search',
            component: Search,
            meta: { show: true }
        },
        {
            path: '/login',
            component: Login,
            meta: { show: false }
        },
        {
            path: '/register',
            component: Register,
            meta: { show: false }
        },
        {
            path: '/404',
            component: NotFound,
            meta: { show: false }
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
