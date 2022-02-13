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
import Login from '@/pages/Service/Login'
import Register from '@/pages/Service/Register'
import NotFound from '@/components/NotFound'
import Service from '@/pages/Service'
import Scan from '@/pages/Service/Scan'

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
            path: '/service',
            component: Service,
            meta: { show: false },
            children: [
                {
                    path: 'login',
                    component: Login
                },
                {
                    path: 'register',
                    component: Register
                },
                {
                    path: 'scan',
                    component: Scan
                }
            ]
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
