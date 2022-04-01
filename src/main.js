/*
 * @Author: zhilutianji
 * @Date: 2022-01-02 18:49:33
 * @LastEditors: zhilutianji
 * @LastEditTime: 2022-01-02 22:09:39
 * @Description: file content
 * @FilePath: \shops_frontend_web\src\main.js
 */
import Vue from 'vue'
import App from '@/App.vue'
// 引入路由
import router from '@/router'
// 引入vuex的store
import store from './store'
// 引入css重置
import 'normalize.css/normalize.css'
// 按需引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

Vue.use(ElementUI)
new Vue({
    render: h => h(App),
    beforeCreate() {
        Vue.prototype.$bus = this
        // 安装全局事件总线，$bus就是当前应用的vm
    },
    store,
    router
}).$mount('#app')
